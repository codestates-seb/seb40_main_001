package com.ilchinjo.mainproject.domain.exercise.mapper;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExerciseMapper {

    Exercise postDtoToEntity(ExerciseDto.Post postDto);
}
