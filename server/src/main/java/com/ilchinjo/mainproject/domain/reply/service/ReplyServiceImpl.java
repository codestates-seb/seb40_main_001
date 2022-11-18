package com.ilchinjo.mainproject.domain.reply.service;

import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.comment.service.CommentService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.mainproject.domain.reply.entity.Reply;
import com.ilchinjo.mainproject.domain.reply.mapper.ReplyMapper;
import com.ilchinjo.mainproject.domain.reply.repository.ReplyRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final CommentService commentService;
    private final ReplyMapper replyMapper;

    @Override
    public ReplyResponseDto saveReply(Long commentId, Long memberId, ReplyPostDto postDto) {

        Member findMember = memberService.findVerifiedMember(memberId);
        Comment findComment = commentService.findVerifiedComment(commentId);
        Reply reply = replyMapper.postDtoToEntity(postDto);

        Reply createdReply = Reply.createReply(reply, findMember, findComment);

        replyRepository.save(createdReply);

        return replyMapper.entityToResponseDto(createdReply);
    }

    @Override
    public void deleteReply(Long replyId, Long memberId) {

        Reply findReply = findVerifiedReply(replyId);
        checkAuthorization(findReply, memberId);

        replyRepository.delete(findReply);
    }

    @Override
    @Transactional(readOnly = true)
    public Reply findVerifiedReply(Long replyId) {

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply findReply = optionalReply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));

        return findReply;
    }

    private void checkAuthorization(Reply reply, Long memberId) {
        if (!reply.getAuthor().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
