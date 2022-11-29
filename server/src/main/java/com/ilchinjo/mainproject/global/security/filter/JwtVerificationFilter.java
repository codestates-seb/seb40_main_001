package com.ilchinjo.mainproject.global.security.filter;

import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import com.ilchinjo.mainproject.global.security.utils.ErrorResponder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader("Authorization").replace("Bearer ", "");
        Long memberId = jwtTokenizer.parseMemberIdFromPayload(jwt);

        if (jwtTokenizer.validateToken(jwt) == JwtTokenizer.JwtStatus.ACCESS) {

            Authentication authentication = jwtTokenizer.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info("set Authentication to security context for '{}', uri: {}", authentication.getName(), request.getRequestURI());

        } else if (jwtTokenizer.validateToken(jwt) == JwtTokenizer.JwtStatus.EXPIRED) {

            String refresh = request.getHeader("Refresh");

            if (jwtTokenizer.validateToken(refresh) == JwtTokenizer.JwtStatus.ACCESS) {
                issueToken(response, memberId, refresh);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private void issueToken(HttpServletResponse response, Long memberId, String refresh) throws IOException {

        Authentication authentication = jwtTokenizer.getAuthentication(refresh);

        String newAccessToken = jwtTokenizer.reIssueAccessToken(memberId, authentication);
        String newRefresh = jwtTokenizer.reIssueRefreshToken(refresh);

        if (newRefresh != null) {
            response.setHeader("Authorization", "Bearer " + newAccessToken);
            response.setHeader("Refresh", newRefresh);

            log.info("Reissue Refresh Token & Access Token");
        } else {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
