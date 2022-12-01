package com.ilchinjo.mainproject.domain.auth.controller;

import com.ilchinjo.mainproject.domain.auth.service.AuthService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @PostMapping("/refresh")
    public void refresh(@CookieValue("Refresh") String refreshToken,
                        HttpServletResponse response) {

        String newAccessToken = authService.refreshToken(refreshToken);
        response.setHeader("Authorization", "Bearer " + newAccessToken);
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        authService.deleteToken(memberId);
    }
}
