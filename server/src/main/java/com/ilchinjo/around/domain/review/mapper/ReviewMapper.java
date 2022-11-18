package com.ilchinjo.around.domain.review.mapper;

import com.ilchinjo.around.domain.review.dto.ReviewPostDto;
import com.ilchinjo.around.domain.review.dto.ReviewResponseDto;
import com.ilchinjo.around.domain.review.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToEntity(ReviewPostDto postDto);

    ReviewResponseDto entityToResponseDto(Review review);
}
