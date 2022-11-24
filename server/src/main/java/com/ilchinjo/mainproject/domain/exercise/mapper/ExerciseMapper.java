package com.ilchinjo.mainproject.domain.exercise.mapper;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExerciseMapper {

    Exercise postDtoToEntity(ExercisePostDto postDto);

    Exercise patchDtoToEntity(ExercisePatchDto patchDto);

    ExerciseResponseDto entityToResponseDto(Exercise exercise);

    ExerciseDetailResponseDto entityToDetailResponseDto(Exercise exercise);

    List<ExerciseResponseDto> entitiesToResponseDtoList(List<Exercise> exercises);
}
