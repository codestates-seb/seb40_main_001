package com.ilchinjo.mainproject.domain.image.mapper;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    List<ImageResponseDto> entitiesToResponseDtos(List<Image> images);
}
