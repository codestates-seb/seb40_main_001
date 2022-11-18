package com.ilchinjo.around.domain.exercise.dto;

import com.ilchinjo.around.domain.exercise.entity.Category;
import com.ilchinjo.around.domain.exercise.entity.GenderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ExercisePatchDto {

    private String title;

    private String content;

    private LocalDateTime exerciseAt;

    private LocalDateTime endAt;

    private GenderType genderType;

    private Category category;
}
