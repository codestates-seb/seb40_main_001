package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    Exercise findVerifiedExercise(Long exerciseId);

    void deleteExercise(Long exerciseId, Long memberId);
}
