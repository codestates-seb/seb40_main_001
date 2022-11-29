package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.*;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;

import java.util.List;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    CursorResponseDto<ExerciseResponseDto> findExercises(Long addressId, String genderType, String category,
                                                         Long memberId, Long cursorId, int size);

    List<ExerciseResponseDto> findExercisesDynamicQuery(String address, String genderType, String category, Long memberId);

    Exercise findVerifiedExercise(Long exerciseId);

    void deleteExercise(Long exerciseId, Long memberId);
}
