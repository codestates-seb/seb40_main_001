package com.ilchinjo.mainproject.domain.exercise.dto;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ExerciseDetailResponseDto {

    private Long exerciseId;

    private String title;

    private String content;

    private LocalDateTime exerciseAt;

    private LocalDateTime endAt;

    private GenderType genderType;

    private AddressResponseDto address;

    private Category category;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
