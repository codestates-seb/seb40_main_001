package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;

public interface ExerciseService {

    ExerciseResponseDto saveExercise(ExercisePostDto postDto);
}
