package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.member.dto.*;
import com.ilchinjo.mainproject.domain.member.entity.Member;

public interface MemberService {

    MemberResponseDto saveMember(MemberPostDto postDto);

    MemberResponseDto updateMember(Long pathMemberId, Long memberId, MemberPatchDto patchDto);

    MemberDetailResponseDto findDetailedMember(Long memberId);

    MemberSimpleDto findSimpleMember(Long memberId);

    Member findVerifiedMember(Long memberId);
}
