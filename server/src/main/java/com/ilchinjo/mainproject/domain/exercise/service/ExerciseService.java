package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    void deleteExercise(Long exerciseId);
}
