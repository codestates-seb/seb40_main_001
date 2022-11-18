package com.ilchinjo.around.domain.comment.controller;

import com.ilchinjo.around.domain.comment.dto.CommentPostDto;
import com.ilchinjo.around.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.around.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/exercises/{exercise-id}/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto postComment(@PathVariable("exercise-id") Long exerciseId,
                                          @RequestHeader("Authorization") Long memberId,
                                          @RequestBody @Valid CommentPostDto postDto) {

        return commentService.saveComment(exerciseId, memberId, postDto);
    }

    @DeleteMapping("/comments/{comment-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable("comment-id") Long commentId,
                              @RequestHeader("Authorization") Long memberId) {

        commentService.deleteComment(commentId, memberId);
    }
}
