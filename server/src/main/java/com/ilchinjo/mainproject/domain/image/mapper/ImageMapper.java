package com.ilchinjo.mainproject.domain.image.mapper;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageResponseDto entityToResponseDto(Image image);
}
