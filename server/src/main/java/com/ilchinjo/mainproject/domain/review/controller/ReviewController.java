package com.ilchinjo.mainproject.domain.review.controller;

import com.ilchinjo.mainproject.domain.review.dto.ReviewPostDto;
import com.ilchinjo.mainproject.domain.review.dto.ReviewResponseDto;
import com.ilchinjo.mainproject.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/exercises/{exercise-id}/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewResponseDto postReview(@PathVariable(name = "exercise-id") Long exerciseId,
                                        @RequestBody @Valid ReviewPostDto postDto,
                                        @RequestHeader(name = "Authorization") Long memberId) {

        return reviewService.saveReview(postDto, memberId, exerciseId);
    }
}
