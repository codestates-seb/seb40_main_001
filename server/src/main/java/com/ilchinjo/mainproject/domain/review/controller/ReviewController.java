package com.ilchinjo.mainproject.domain.review.controller;

import com.ilchinjo.mainproject.domain.review.dto.ReviewPostDto;
import com.ilchinjo.mainproject.domain.review.dto.ReviewResponseDto;
import com.ilchinjo.mainproject.domain.review.service.ReviewService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/exercises/{exercise-id}/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewResponseDto postReview(@PathVariable(name = "exercise-id") Long exerciseId,
                                        @RequestBody @Valid ReviewPostDto postDto,
                                        @RequestHeader(name = "Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return reviewService.saveReview(postDto, memberId, exerciseId);
    }
}
