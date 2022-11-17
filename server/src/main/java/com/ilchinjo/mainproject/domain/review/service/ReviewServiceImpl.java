package com.ilchinjo.mainproject.domain.review.service;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.domain.review.dto.ReviewPostDto;
import com.ilchinjo.mainproject.domain.review.dto.ReviewResponseDto;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import com.ilchinjo.mainproject.domain.review.mapper.ReviewMapper;
import com.ilchinjo.mainproject.domain.review.repository.ReviewRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;
    private final ExerciseService exerciseService;

    @Override
    public ReviewResponseDto saveReview(ReviewPostDto postDto, Long memberId, Long exerciseId) {

        Member findSrcMember = memberService.findVerifiedMember(memberId);
        Member findDestMember = memberService.findVerifiedMember(postDto.getDestMemberId());
        Exercise findExercise = exerciseService.findVerifiedExercise(exerciseId);
        // 리뷰 작성 가능 시간 확인
        checkValidWritingTime(findExercise);
        // 권한 확인
        checkAuthorization(findExercise, findSrcMember, findDestMember);
        // 리뷰 중복 체크
        checkDuplicatedReview(findExercise, findSrcMember);

        Review review = reviewMapper.postDtoToEntity(postDto);
        Review createdReview = Review.createReview(review, findSrcMember, findDestMember, findExercise);
        reviewRepository.save(createdReview);

        return reviewMapper.entityToResponseDto(createdReview);
    }

    private void checkValidWritingTime(Exercise exercise) {
        if (LocalDateTime.now().isBefore(exercise.getEndAt())) {
            throw new BusinessLogicException(ExceptionCode.END_TIME_IS_NOT_PASSED);
        }
    }

    private void checkAuthorization(Exercise exercise, Member srcMember, Member destMember) {
        if ((srcMember.equals(exercise.getHost()) && destMember.equals(exercise.getParticipant()))
                || (srcMember.equals(exercise.getParticipant()) && destMember.equals(exercise.getHost())))
            return;

        throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
    }

    private void checkDuplicatedReview(Exercise exercise, Member srcMember) {

        List<Review> reviewList = reviewRepository.findByExercise(exercise);
        if (reviewList.isEmpty()) return;
        if (reviewList.size() == 1) {
            ArrayList<Review> reviewArrayList = (ArrayList<Review>) reviewList;
            Member findSrcMember = reviewArrayList.get(0).getSrcMember();
            if (!srcMember.equals(findSrcMember)) return;
        }

        throw new BusinessLogicException(ExceptionCode.REVIEW_EXISTS);
    }
}
