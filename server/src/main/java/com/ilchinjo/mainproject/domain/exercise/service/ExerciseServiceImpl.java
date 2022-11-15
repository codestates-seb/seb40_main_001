package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.mapper.ExerciseMapper;
import com.ilchinjo.mainproject.domain.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ExerciseResponseDto saveExercise(ExercisePostDto postDto) {
        Exercise exercise = exerciseMapper.postDtoToEntity(postDto);

        Exercise createdExercise = Exercise.createExercise(exercise);
        exerciseRepository.save(createdExercise);

        return exerciseMapper.entityToResponseDto(createdExercise);
    }
}