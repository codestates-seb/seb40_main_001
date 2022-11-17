package com.ilchinjo.mainproject.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
public class ReviewPostDto {

    @NotNull
    private int destMemberId;

    @NotNull
    private int publicEvaluation;

    @NotNull
    private int privateEvaluation;
}
