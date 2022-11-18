package com.ilchinjo.mainproject.domain.reply.service;

import com.ilchinjo.mainproject.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;

public interface ReplyService {

    ReplyResponseDto saveReply(Long commentId, Long memberId, ReplyPostDto postDto);

    void deleteReply(Long replyId, Long memberId);
}
