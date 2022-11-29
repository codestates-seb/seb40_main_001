package com.ilchinjo.mainproject.domain.member.dto;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.member.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberSimpleDto {

    private Long memberId;
    private String nickname;
    private AddressResponseDto address;
    private Gender gender;
}
