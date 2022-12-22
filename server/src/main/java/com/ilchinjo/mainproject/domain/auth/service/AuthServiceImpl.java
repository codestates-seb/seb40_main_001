package com.ilchinjo.mainproject.domain.auth.service;

import com.ilchinjo.mainproject.domain.auth.entity.RefreshToken;
import com.ilchinjo.mainproject.domain.auth.repository.RefreshTokenRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.global.security.jwt.JwtStatus;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @Override
    public String refreshToken(String refreshToken) {

        JwtStatus jwtStatus = jwtTokenizer.validateToken(refreshToken);

        if (jwtStatus == JwtStatus.EXPIRED || refreshTokenRepository.findByToken(refreshToken).isEmpty()) {

            log.info("Refresh token has expired");

            return null;
        }

        log.info("Reissue Access Token");

        String memberEmail = jwtTokenizer.parseEmailFromPayload(refreshToken);
        Member member = memberService.findVerifiedMember(memberEmail);

        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    @Override
    public void deleteToken(String refreshToken) {

        Authentication authentication = jwtTokenizer.getAuthentication(refreshToken);
        Member member = memberService.findVerifiedMember(authentication.getName());

        RefreshToken findRefreshToken = findVerifiedRefreshToken(member.getEmail());

        refreshTokenRepository.delete(findRefreshToken);
    }

    private RefreshToken findVerifiedRefreshToken(String email) {

        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByEmail(email);

        return refreshToken.get();
    }
}
