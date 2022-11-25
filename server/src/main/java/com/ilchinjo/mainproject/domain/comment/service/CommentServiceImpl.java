package com.ilchinjo.mainproject.domain.comment.service;

import com.ilchinjo.mainproject.domain.comment.dto.CommentDetailResponseDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.comment.mapper.CommentMapper;
import com.ilchinjo.mainproject.domain.comment.repository.CommentRepository;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    public CursorResponseDto<CommentDetailResponseDto> findComments(Long exerciseId, Long cursorId, Integer size) {

        Exercise findExercise = exerciseService.findVerifiedExercise(exerciseId);
        List<Comment> comments = commentRepository.findAllByExerciseAndCommentIdGreaterThan(findExercise, cursorId, PageRequest.of(0, size + 1));

        boolean hasNext = false;
        if (comments.size() > size) {
            hasNext = true;
            comments = comments.subList(0, size);
        }

        List<CommentDetailResponseDto> commentResponseDtoList = commentMapper.entitiesToResponseDtoList(comments);

        Long nextCursorId = comments.isEmpty()
                ? 0L
                : comments.get(comments.size() - 1).getCommentId();

        return CursorResponseDto.of(commentResponseDtoList, hasNext, nextCursorId);
    }

    // 조회할 데이터가 더 남아 있는지 검사
    private Boolean hasNext(Exercise exercise, List<Comment> comments) {

        Long lastIdOfList = comments.isEmpty()
                ? null
                : comments.get(comments.size() - 1).getCommentId();

        if (lastIdOfList == null) {
            return false;
        }

        return commentRepository.existsByExerciseAndCommentIdGreaterThan(exercise, lastIdOfList);
    }

    @Override
    public void deleteComment(Long commentId, Long memberId) {

        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isPresent()) {
            Comment findComment = optionalComment.get();
            checkAuthorization(findComment, memberId);

            commentRepository.delete(findComment);
        }
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
