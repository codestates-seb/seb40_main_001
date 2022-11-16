package com.ilchinjo.mainproject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberResponseDto {

    private Long memberId;
    private String email;
    private String nickname;
}
