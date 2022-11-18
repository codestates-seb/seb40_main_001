package com.ilchinjo.around.domain.member.service;

import com.ilchinjo.around.domain.member.dto.MemberPostDto;
import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.member.mapper.MemberMapper;
import com.ilchinjo.around.domain.member.repository.MemberRepository;
import com.ilchinjo.around.global.exception.BusinessLogicException;
import com.ilchinjo.around.global.exception.ExceptionCode;
import com.ilchinjo.around.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.around.domain.member.dto.MemberPatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    public MemberResponseDto saveMember(MemberPostDto postDto) {

        Member member = memberMapper.postDtoToEntity(postDto);
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        memberRepository.save(member);

        return memberMapper.entityToResponseDto(member);
    }

    @Override
    public MemberResponseDto updateMember(Long memberId, MemberPatchDto patchDto) {

        Member findmember = findVerifiedMember(memberId);
        verifyExistsNickname(patchDto.getNickname());

        findmember.update(patchDto);

        return memberMapper.entityToResponseDto(findmember);
    }

    @Override
    public MemberDetailResponseDto findMember(Long memberId) {

        Member findMember = findVerifiedMember(memberId);

        return memberMapper.entityToDetailResponseDto(findMember);
    }

    @Override
    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    private void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private void verifyExistsNickname(String nickname) {

        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
