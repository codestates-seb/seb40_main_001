package com.ilchinjo.mainproject.domain.auth.controller;

import com.ilchinjo.mainproject.domain.auth.service.AuthService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import com.ilchinjo.mainproject.global.security.utils.ErrorResponder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @PostMapping("/refresh")
    public void refresh(@CookieValue("Refresh") String refreshToken,
                        HttpServletResponse response) throws IOException {

        String newAccessToken = authService.refreshToken(refreshToken);

        if (newAccessToken != null) {
            response.setHeader("Authorization", "Bearer " + newAccessToken);
        } else {
            ErrorResponder.sendExpiredJwtExceptionError(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public void logout(@CookieValue("Refresh") String refreshToken) {

        authService.deleteToken(refreshToken);
    }
}
