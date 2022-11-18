package com.ilchinjo.around.domain.exercise.controller;

import com.ilchinjo.around.domain.exercise.service.ExerciseService;
import com.ilchinjo.around.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.around.domain.exercise.dto.ExerciseResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponseDto postExercise(@RequestBody @Valid ExercisePostDto postDto,
                                            @RequestHeader(name = "Member-Id") Long memberId) {

        return exerciseService.saveExercise(postDto, memberId);
    }

    @PatchMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponseDto patchExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                                             @RequestBody @Valid ExercisePatchDto patchDto,
                                             @RequestHeader(name = "Member-Id") Long memberId) {

        return exerciseService.updateExercise(exerciseId, patchDto, memberId);
    }

    @GetMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseDetailResponseDto getExercise(@PathVariable(name = "exercise-id") Long exerciseId) {

        return exerciseService.findExercise(exerciseId);
    }

    @DeleteMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                               @RequestHeader(name = "Member-Id") Long memberId) {

        exerciseService.deleteExercise(exerciseId, memberId);
    }
}
