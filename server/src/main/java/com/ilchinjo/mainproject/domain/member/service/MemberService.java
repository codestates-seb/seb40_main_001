package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberPatchDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberPostDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;

public interface MemberService {

    MemberResponseDto saveMember(MemberPostDto postDto);

    MemberResponseDto updateMember(Long memberId, MemberPatchDto patchDto);

    MemberDetailResponseDto findDetailedMember(Long memberId);

    Member findVerifiedMember(Long memberId);
}
