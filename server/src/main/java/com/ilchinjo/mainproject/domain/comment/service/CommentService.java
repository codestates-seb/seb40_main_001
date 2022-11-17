package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;

public interface CommentService {

    CommentResponseDto saveComment(Long exerciseId, Long memberId, CommentPostDto postDto);
}
