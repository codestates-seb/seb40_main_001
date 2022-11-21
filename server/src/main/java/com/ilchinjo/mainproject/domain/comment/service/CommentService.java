package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;

public interface CommentService {

    CommentResponseDto saveComment(Long exerciseId, Long memberId, CommentPostDto postDto);

    CursorResponseDto<CommentResponseDto> findComments(Long exerciseId, Long cursorId, Integer size);

    void deleteComment(Long commentId, Long memberId);

    Comment findVerifiedComment(Long commentId);
}
