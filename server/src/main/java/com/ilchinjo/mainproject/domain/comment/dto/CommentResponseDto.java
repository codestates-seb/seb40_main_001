package com.ilchinjo.mainproject.domain.comment.dto;

import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponseDto {

    private Long commentId;
    private String content;
    private MemberResponseDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
