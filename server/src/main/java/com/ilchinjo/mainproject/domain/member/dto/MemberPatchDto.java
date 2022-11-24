package com.ilchinjo.mainproject.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberPatchDto {

    private String nickname;

    private Long addressId;

    private Long imageId;
}
