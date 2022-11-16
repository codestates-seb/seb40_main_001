package com.ilchinjo.mainproject.domain.exercise.controller;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponseDto postExercise(@RequestBody @Valid ExercisePostDto postDto) {

        return exerciseService.saveExercise(postDto);
    }

    @PatchMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponseDto patchExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                                             @RequestBody @Valid ExercisePatchDto patchDto) {

        return exerciseService.updateExercise(exerciseId, patchDto);
    }

    @GetMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseDetailResponseDto getExercise(@PathVariable(name = "exercise-id") Long exerciseId) {

        return exerciseService.findExercise(exerciseId);
    }

    @DeleteMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable(name = "exercise-id") Long exerciseId) {

        exerciseService.deleteExercise(exerciseId);
    }
}
