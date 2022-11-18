package com.ilchinjo.around.domain.reply.service;

import com.ilchinjo.around.domain.comment.entity.Comment;
import com.ilchinjo.around.domain.comment.service.CommentService;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.member.service.MemberService;
import com.ilchinjo.around.domain.reply.mapper.ReplyMapper;
import com.ilchinjo.around.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.around.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.around.domain.reply.entity.Reply;
import com.ilchinjo.around.domain.reply.repository.ReplyRepository;
import com.ilchinjo.around.global.exception.BusinessLogicException;
import com.ilchinjo.around.global.exception.ExceptionCode;
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

        Optional<Reply> optionalReply = replyRepository.findById(replyId);

        if (optionalReply.isPresent()) {
            Reply findReply = optionalReply.get();
            checkAuthorization(findReply, memberId);

            replyRepository.delete(findReply);
        }
    }

    private void checkAuthorization(Reply reply, Long memberId) {
        if (!reply.getAuthor().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
