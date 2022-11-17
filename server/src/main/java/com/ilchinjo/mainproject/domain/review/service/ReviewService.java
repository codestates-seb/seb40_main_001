package com.ilchinjo.mainproject.domain.review.service;

import com.ilchinjo.mainproject.domain.review.dto.ReviewPostDto;
import com.ilchinjo.mainproject.domain.review.dto.ReviewResponseDto;

public interface ReviewService {

    ReviewResponseDto saveReview(ReviewPostDto postDto, Long memberId, Long exerciseId);
}
