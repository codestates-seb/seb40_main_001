package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member saveMember(Member member) {

        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
    }

    private void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }
}
