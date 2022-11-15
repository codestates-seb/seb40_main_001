package com.ilchinjo.mainproject.domain.exercise.controller;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.mapper.ExerciseMapper;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String postExercise(@RequestBody @Valid ExerciseDto.Post postDto) {
        Exercise exercise = exerciseMapper.postDtoToEntity(postDto);
        Exercise savedExercise = exerciseService.saveExercise(exercise);

        return "운동 모집글이 성공적으로 생성되었습니다. exerciseId: " + savedExercise.getExerciseId();
    }
}
