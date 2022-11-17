package com.ilchinjo.mainproject.domain.review.dto;

import com.ilchinjo.mainproject.domain.member.dto.MemberSimpleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
public class ReviewPostDto {

    @NotNull
    private MemberSimpleDto destMember;

    @NotNull
    private int publicEvaluation;

    @NotNull
    private int privateEvaluation;
}
