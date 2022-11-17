package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.comment.mapper.CommentMapper;
import com.ilchinjo.mainproject.domain.comment.repository.CommentRepository;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final ExerciseService exerciseService;
    private final CommentMapper commentMapper;

    @Override
    public CommentResponseDto saveComment(Long exerciseId, Long memberId, CommentPostDto postDto) {

        Member findMember = memberService.findVerifiedMember(memberId);
        Exercise findExercise = exerciseService.findVerifiedExercise(exerciseId);
        Comment comment = commentMapper.postDtoToEntity(postDto);

        Comment createdComment = Comment.createComment(comment, findMember, findExercise);

        commentRepository.save(createdComment);

        return commentMapper.entityToResponseDto(createdComment);
    }

    @Override
    public void deleteComment(Long commentId, Long memberId) {

        Comment findComment = findVerifiedComment(commentId);
        checkAuthorization(findComment, memberId);

        commentRepository.delete(findComment);
    }

    @Override
    public Comment findVerifiedComment(Long commentId) {

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    private void checkAuthorization(Comment comment, Long memberId) {
        if (!comment.getAuthor().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
