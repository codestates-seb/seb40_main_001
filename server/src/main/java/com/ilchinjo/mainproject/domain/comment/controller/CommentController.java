package com.ilchinjo.mainproject.domain.comment.controller;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.service.CommentService;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private static final int DEFAULT_SIZE = 10;

    private final CommentService commentService;

    @PostMapping("/exercises/{exercise-id}/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto postComment(@PathVariable("exercise-id") Long exerciseId,
                                          @RequestHeader("Authorization") Long memberId,
                                          @RequestBody @Valid CommentPostDto postDto) {

        return commentService.saveComment(exerciseId, memberId, postDto);
    }

    @GetMapping("/exercises/{exercise-id}/comments")
    public MultiResponseDto<CommentResponseDto> getComment(@PathVariable("exercise-id") Long exerciseId,
                                                           @RequestParam Long cursorId,
                                                           @RequestParam(required = false) Integer size) {

        if (size == null) {
            size = DEFAULT_SIZE;
        }

        return commentService.findComment(exerciseId, cursorId, PageRequest.of(0, size));
    }

    @DeleteMapping("/comments/{comment-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable("comment-id") Long commentId,
                              @RequestHeader("Authorization") Long memberId) {

        commentService.deleteComment(commentId, memberId);
    }
}
