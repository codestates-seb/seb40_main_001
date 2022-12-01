package com.ilchinjo.mainproject.domain.auth.controller;

import com.ilchinjo.mainproject.domain.auth.service.AuthService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @PostMapping("/auth/logout")
    public void logout(@RequestHeader("Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        authService.deleteToken(memberId);
    }
}
