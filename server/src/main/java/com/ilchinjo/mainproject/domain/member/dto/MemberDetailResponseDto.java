package com.ilchinjo.mainproject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberDetailResponseDto {

    private String nickname;
    private int publicEvaluation;
    // TODO 운동 친구 기록
}
