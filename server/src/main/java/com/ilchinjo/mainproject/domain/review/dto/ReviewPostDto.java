package com.ilchinjo.mainproject.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
public class ReviewPostDto {

    @NotNull
    private Long destMemberId;

    @NotNull
    @Range(min = -2, max = 2)
    private Integer publicEvaluation;

    @NotNull
    @Range(min = -2, max = 2)
    private Integer privateEvaluation;
}
