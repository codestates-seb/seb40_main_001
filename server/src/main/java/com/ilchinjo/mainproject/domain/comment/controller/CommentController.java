package com.ilchinjo.mainproject.domain.comment.controller;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/exercises")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{exercise-id}/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto postComment(@PathVariable("exercise-id") Long exerciseId,
                                          @RequestHeader("Authorization") Long memberId,
                                          @RequestBody @Valid CommentPostDto postDto) {

        return commentService.saveComment(exerciseId, memberId, postDto);
    }
}
