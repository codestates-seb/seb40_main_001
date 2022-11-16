package com.ilchinjo.mainproject.domain.exercise.dto;

import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ExerciseSimpleResponseDto {

    private String title;

    private String content;

    private MemberResponseDto host;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
