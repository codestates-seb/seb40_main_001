package com.ilchinjo.around.domain.exercise.service;

import com.ilchinjo.around.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.around.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.around.domain.exercise.entity.Exercise;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    Exercise findVerifiedExercise(Long exerciseId);

    void deleteExercise(Long exerciseId, Long memberId);
}
