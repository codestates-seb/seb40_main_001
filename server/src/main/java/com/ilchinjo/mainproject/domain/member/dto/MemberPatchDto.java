package com.ilchinjo.mainproject.domain.member.dto;

import com.ilchinjo.mainproject.global.validator.notspacelong.NotSpaceLong;
import com.ilchinjo.mainproject.global.validator.notspacestring.NotSpaceString;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NotBlank
public class MemberPatchDto {

    @NotSpaceString
    private String nickname;

    @NotSpaceLong
    private Long addressId;

    @NotSpaceLong
    private Long imageId;
}
