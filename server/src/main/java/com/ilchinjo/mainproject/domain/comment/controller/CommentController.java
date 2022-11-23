package com.ilchinjo.mainproject.domain.comment.controller;

import com.ilchinjo.mainproject.domain.comment.dto.CommentDetailResponseDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.service.CommentService;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/exercises/{exercise-id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto postComment(@PathVariable("exercise-id") Long exerciseId,
                                          @RequestHeader("Authorization") Long memberId,
                                          @RequestBody @Valid CommentPostDto postDto) {

        return commentService.saveComment(exerciseId, memberId, postDto);
    }

    @GetMapping("/exercises/{exercise-id}/comments")
    public CursorResponseDto<CommentDetailResponseDto> getComments(@PathVariable("exercise-id") Long exerciseId,
                                                                   @RequestParam Long cursorId,
                                                                   @RequestParam(required = false, defaultValue = "10") Integer size) {

        return commentService.findComments(exerciseId, cursorId, size);
    }

    @DeleteMapping("/comments/{comment-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable("comment-id") Long commentId,
                              @RequestHeader("Authorization") Long memberId) {

        commentService.deleteComment(commentId, memberId);
    }
}
