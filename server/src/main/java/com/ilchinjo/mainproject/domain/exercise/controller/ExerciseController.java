package com.ilchinjo.mainproject.domain.exercise.controller;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
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
    getExercises(@RequestHeader(name = "Authorization") String token,
                 @RequestParam(name = "address-id") Long addressId,
                 @RequestParam String category,
                 @RequestParam(name = "gender-type") String genderType,
                 @RequestParam(required = false, defaultValue = "9223372036854775807") Long cursorId,
                 @RequestParam(required = false, defaultValue = "10") Integer size) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return exerciseService.findExercises(memberId, addressId, genderType, category, size, cursorId);
    }

    @DeleteMapping("/{exercise-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable(name = "exercise-id") Long exerciseId,
                               @RequestHeader(name = "Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        exerciseService.deleteExercise(exerciseId, memberId);
    }
}
