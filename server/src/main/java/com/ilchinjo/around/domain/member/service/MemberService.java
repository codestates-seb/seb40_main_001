package com.ilchinjo.around.domain.member.service;

import com.ilchinjo.around.domain.member.dto.MemberPatchDto;
import com.ilchinjo.around.domain.member.dto.MemberPostDto;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.around.domain.member.dto.MemberResponseDto;

public interface MemberService {

    MemberResponseDto saveMember(MemberPostDto postDto);

    MemberResponseDto updateMember(Long memberId, MemberPatchDto patchDto);

    MemberDetailResponseDto findMember(Long memberId);

    Member findVerifiedMember(Long memberId);
}
