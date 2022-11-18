package com.ilchinjo.around.domain.reply.dto;

import com.ilchinjo.around.domain.comment.dto.CommentSimpleResponseDto;
import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReplyResponseDto {

    private CommentSimpleResponseDto comment;
    private Long replyId;
    private String content;
    private MemberResponseDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
