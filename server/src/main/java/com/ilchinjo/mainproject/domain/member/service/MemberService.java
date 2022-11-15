package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.member.dto.MemberPostDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;

public interface MemberService {

    MemberResponseDto saveMember(MemberPostDto postDto);
}
