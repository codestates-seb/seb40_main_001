package com.ilchinjo.around.domain.review.service;

import com.ilchinjo.around.domain.review.dto.ReviewPostDto;
import com.ilchinjo.around.domain.review.dto.ReviewResponseDto;

public interface ReviewService {

    ReviewResponseDto saveReview(ReviewPostDto postDto, Long memberId, Long exerciseId);
}
