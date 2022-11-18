package com.ilchinjo.around.domain.reply.service;

import com.ilchinjo.around.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.around.domain.reply.dto.ReplyResponseDto;

public interface ReplyService {

    ReplyResponseDto saveReply(Long commentId, Long memberId, ReplyPostDto postDto);

    void deleteReply(Long replyId, Long memberId);
}
