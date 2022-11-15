package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.repository.ExerciseRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Override
    public Exercise saveExercise(Exercise exercise) {

        Exercise createdExercise = Exercise.createExercise(exercise);

        return exerciseRepository.save(createdExercise);
    }
}