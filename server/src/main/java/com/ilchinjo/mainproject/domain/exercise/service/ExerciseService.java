package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId);

    ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId);

    ExerciseDetailResponseDto findExercise(Long exerciseId);

    CursorResponseDto<ExerciseResponseDto> findExercises(Long memberId, Long addressId, String genderType, String category, int size, Long cursorId);

    Exercise findVerifiedExercise(Long exerciseId);

    void deleteExercise(Long exerciseId, Long memberId);

    CursorResponseDto<ExerciseResponseDto> findExercisesOld(Long addressId, String genderType, String category,
                                                            Long memberId, Long cursorId, int size);

    //    List<ExerciseResponseDto> findExercisesDynamicQuery(String address, String genderType, String category, Long memberId);
}
