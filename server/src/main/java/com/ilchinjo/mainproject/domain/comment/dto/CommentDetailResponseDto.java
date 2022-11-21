package com.ilchinjo.mainproject.domain.comment.dto;

import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class CommentDetailResponseDto {

    private Long commentId;
    private String content;
    private MemberResponseDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReplyResponseDto> replies;
}
