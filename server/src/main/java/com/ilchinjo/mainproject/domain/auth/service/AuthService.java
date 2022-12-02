package com.ilchinjo.mainproject.domain.auth.service;

public interface AuthService {

    String refreshToken(String refreshToken);

    void deleteToken(Long memberId);
}
