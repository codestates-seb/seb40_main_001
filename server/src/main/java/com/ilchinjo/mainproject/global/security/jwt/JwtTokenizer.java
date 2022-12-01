package com.ilchinjo.mainproject.global.security.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilchinjo.mainproject.domain.auth.entity.RefreshToken;
import com.ilchinjo.mainproject.domain.auth.repository.RefreshTokenRepository;
import com.ilchinjo.mainproject.global.security.userdetails.MemberDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenizer {

    private final MemberDetailsService memberDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {

        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateAccessToken(Long memberId, Authentication authentication) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        UserDetails userDetails = memberDetailsService.loadUserByUsername(authentication.getName());

        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);
        claims.put("email", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authentication.getName())
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(key)
                .setExpiration(getTokenExpiration(getAccessTokenExpirationMinutes()))
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String reIssueAccessToken(Long memberId, Authentication authentication) {

        String newAccessToken = generateAccessToken(memberId, authentication);
        SecurityContextHolder.getContext().setAuthentication(getAuthentication(newAccessToken));

        return newAccessToken;
    }

    public String reIssueRefreshToken(String refreshToken) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);

        Authentication authentication = getAuthentication(refreshToken);
        RefreshToken findRefreshToken = refreshTokenRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("email: " + authentication.getName() + " was not found"));

        if (findRefreshToken.getToken().equals(refreshToken)) {
            Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());
            String newRefreshToken = generateRefreshToken(authentication.getName(), expiration, base64EncodedSecretKey);
            findRefreshToken.changeToken(newRefreshToken);

            refreshTokenRepository.save(findRefreshToken);

            return newRefreshToken;
        } else {
            log.info("Invalid Token");

            return null;
        }
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public Date getTokenExpiration(int expirationMinutes) {

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);

        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public Long parseMemberId(String jwt) {

        String jws = jwt.replace("Bearer ", "");
        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);

        Claims claims = getClaims(jws, base64EncodedSecretKey)
                .getBody();

        return claims.get("memberId", Long.class);
    }

    public Long parseMemberIdFromPayload(String jwt) {

        HashMap<String, String> payloadMap;

        try {
            String[] splitJwt = jwt.split("\\.");
            String payload = new String(Base64.getDecoder().decode(splitJwt[1].getBytes()));

            payloadMap = new ObjectMapper().readValue(payload, HashMap.class);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            return null;
        }

        return Long.valueOf(String.valueOf(payloadMap.get("memberId")));
    }

    public JwtStatus validateToken(String token) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtStatus.ACCESS;
        } catch (ExpiredJwtException e) {
            return JwtStatus.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("jwtException: {}", e);
        }

        return JwtStatus.DENIED;
    }

    public Authentication getAuthentication(String token) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDetails userDetails = memberDetailsService.loadUserByUsername(claims.getSubject());

        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }
}
