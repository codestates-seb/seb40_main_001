package com.ilchinjo.mainproject.global.security.handler;

import com.google.gson.Gson;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        log.info("# Authenticated successfully!");

        Member member = memberRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        loginSuccessMemberInfo loginSuccessMemberInfo = new loginSuccessMemberInfo(HttpStatus.ACCEPTED.value(), member.getMemberId(), member.getEmail(), member.getNickname());
        String responseInfo = new Gson().toJson(loginSuccessMemberInfo);

        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.ACCEPTED.value());
        response.getWriter().write(responseInfo);
    }
}
