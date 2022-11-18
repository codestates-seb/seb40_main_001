package com.ilchinjo.mainproject.domain.review.mapper;

import com.ilchinjo.mainproject.domain.review.dto.ReviewPostDto;
import com.ilchinjo.mainproject.domain.review.dto.ReviewResponseDto;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToEntity(ReviewPostDto postDto);

    ReviewResponseDto entityToResponseDto(Review review);
}
