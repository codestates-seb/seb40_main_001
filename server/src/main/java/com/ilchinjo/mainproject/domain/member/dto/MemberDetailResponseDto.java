package com.ilchinjo.mainproject.domain.member.dto;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberDetailResponseDto {

    private Long memberId;
    private Long email;
    private String nickname;
    private int publicEvaluation;
    // TODO 운동 친구 기록
    private AddressResponseDto address;
}
