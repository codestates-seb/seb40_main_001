package com.ilchinjo.mainproject.domain.exercise.controller;

import com.ilchinjo.mainproject.domain.exercise.dto.*;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
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

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto<ExerciseResponseDto> getExercises(@RequestHeader(name = "Authorization") Long memberId,
                                                              @RequestParam String address,
                                                              @RequestParam String category,
                                                              @RequestParam(name = "gender-type") String genderType) {

        return MultiResponseDto.of(exerciseService.findExercises(address, genderType, category, memberId));
    }

    @DeleteMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                               @RequestHeader(name = "Member-Id") Long memberId) {

        exerciseService.deleteExercise(exerciseId, memberId);
    }
}
