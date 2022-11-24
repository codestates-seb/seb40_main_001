package com.ilchinjo.mainproject.domain.exercise.controller;

import com.ilchinjo.mainproject.domain.exercise.dto.*;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponseDto postExercise(@RequestBody @Valid ExercisePostDto postDto,
                                            @RequestHeader(name = "Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return exerciseService.saveExercise(postDto, memberId);
    }

    @PatchMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponseDto patchExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                                             @RequestBody @Valid ExercisePatchDto patchDto,
                                             @RequestHeader(name = "Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return exerciseService.updateExercise(exerciseId, patchDto, memberId);
    }

    @GetMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseDetailResponseDto getExercise(@PathVariable(name = "exercise-id") Long exerciseId) {

        return exerciseService.findExercise(exerciseId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public CursorResponseDto<ExerciseResponseDto>
    getExercises(@RequestHeader(name = "Authorization") Long memberId,
                 @RequestParam(name = "address-id") Long addressId,
                 @RequestParam String category,
                 @RequestParam(name = "gender-type") String genderType,
                 @RequestParam(required = false, defaultValue = "9223372036854775807") Long cursorId,
                 @RequestParam(required = false, defaultValue = "10") Integer size) {

        return exerciseService.findExercises(addressId, genderType, category, memberId, cursorId, size);
    }

    @DeleteMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                               @RequestHeader(name = "Authorization") Long memberId) {

        exerciseService.deleteExercise(exerciseId, memberId);
    }
}
