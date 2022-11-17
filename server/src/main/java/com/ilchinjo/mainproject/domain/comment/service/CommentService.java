package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;

public interface CommentService {

    CommentResponseDto saveComment(Long exerciseId, Long memberId, CommentPostDto postDto);

    void deleteComment(Long commentId, Long memberId);

    Comment findVerifiedComment(Long commentId);
}
