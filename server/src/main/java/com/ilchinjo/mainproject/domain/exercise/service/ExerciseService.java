package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.*;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;

import java.util.List;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    List<ExerciseResponseDto> findExercises(Long address, String genderType, String category, Long memberId);

    List<ExerciseResponseDto> findExercisesDynamicQuery(String address, String genderType, String category, Long memberId);

    Exercise findVerifiedExercise(Long exerciseId);

    void deleteExercise(Long exerciseId, Long memberId);
}
