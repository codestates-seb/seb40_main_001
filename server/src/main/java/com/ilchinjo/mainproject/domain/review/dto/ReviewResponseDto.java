package com.ilchinjo.mainproject.domain.review.dto;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReviewResponseDto {

    private Long reviewId;

    private MemberResponseDto srcMember;

    private MemberResponseDto destMember;

    private ExerciseResponseDto exercise;

    private int publicEvaluation;

    private int privateEvaluation;

    private LocalDateTime createdAt;
}
