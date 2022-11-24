package com.ilchinjo.mainproject.domain.reply.controller;

import com.ilchinjo.mainproject.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.mainproject.domain.reply.service.ReplyService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/comments/{comment-id}/replies")
    @ResponseStatus(HttpStatus.CREATED)
    public ReplyResponseDto postReply(@PathVariable("comment-id") Long commentId,
                                      @RequestHeader(name = "Authorization") String token,
                                      @RequestBody @Valid ReplyPostDto postDto) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return replyService.saveReply(commentId, memberId, postDto);
    }

    @DeleteMapping("/replies/{reply-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReply(@PathVariable("reply-id") Long replyId,
                            @RequestHeader("Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        replyService.deleteReply(replyId, memberId);
    }
}
