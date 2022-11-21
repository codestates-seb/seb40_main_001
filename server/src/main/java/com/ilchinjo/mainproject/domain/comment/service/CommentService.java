package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    CommentResponseDto saveComment(Long exerciseId, Long memberId, CommentPostDto postDto);

    MultiResponseDto<CommentResponseDto> findComment(Long exerciseId, Long cursorId, Pageable page);

    void deleteComment(Long commentId, Long memberId);

    Comment findVerifiedComment(Long commentId);
}
