package com.ilchinjo.around.domain.exercise.mapper;

import com.ilchinjo.around.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.exercise.dto.ExerciseResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExerciseMapper {

    Exercise postDtoToEntity(ExercisePostDto postDto);

    ExerciseResponseDto entityToResponseDto(Exercise exercise);

    ExerciseDetailResponseDto entityToDetailResponseDto(Exercise exercise);
}
