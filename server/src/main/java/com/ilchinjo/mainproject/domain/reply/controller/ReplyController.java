package com.ilchinjo.mainproject.domain.reply.controller;

import com.ilchinjo.mainproject.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.mainproject.domain.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    @PostMapping("/comments/{comment-id}/replies")
    @ResponseStatus(HttpStatus.CREATED)
    public ReplyResponseDto postReply(@PathVariable("comment-id") Long commentId,
                                      @RequestHeader("Authorization") Long memberId,
                                      @RequestBody @Valid ReplyPostDto postDto) {

        return replyService.saveReply(commentId, memberId, postDto);
    }

    @DeleteMapping("/replies/{reply-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReply(@PathVariable("reply-id") Long replyId,
                            @RequestHeader("Authorization") Long memberId) {

        replyService.deleteReply(replyId, memberId);
    }
}
