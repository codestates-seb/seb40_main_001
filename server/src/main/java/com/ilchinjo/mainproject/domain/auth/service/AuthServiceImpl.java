package com.ilchinjo.mainproject.domain.auth.service;

import com.ilchinjo.mainproject.domain.auth.entity.RefreshToken;
import com.ilchinjo.mainproject.domain.auth.repository.RefreshTokenRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberService memberService;

    @Override
    public void deleteToken(Long memberId) {

        Member findMember = memberService.findVerifiedMember(memberId);
        RefreshToken refreshToken = findVerifiedRefreshToken(findMember.getEmail());

        refreshTokenRepository.delete(refreshToken);
    }

    private RefreshToken findVerifiedRefreshToken(String email) {

        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByEmail(email);

        return refreshToken.get();
    }
}
