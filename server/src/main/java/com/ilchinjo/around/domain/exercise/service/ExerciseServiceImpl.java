package com.ilchinjo.around.domain.exercise.service;

import com.ilchinjo.around.domain.exercise.mapper.ExerciseMapper;
import com.ilchinjo.around.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.around.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.around.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.exercise.repository.ExerciseRepository;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.member.repository.MemberRepository;
import com.ilchinjo.around.global.exception.BusinessLogicException;
import com.ilchinjo.around.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final MemberRepository memberRepository;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId) {
        Exercise exercise = exerciseMapper.postDtoToEntity(postDto);
        Member findMember = findVerifiedMember(memberId);

        Exercise createdExercise = Exercise.createExercise(exercise, findMember);
        exerciseRepository.save(createdExercise);

        return exerciseMapper.entityToResponseDto(createdExercise);
    }

    @Override
    public ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId) {
        Exercise findExercise = findVerifiedExercise(exerciseId);
        checkAuthorization(findExercise, memberId);

        findExercise.update(patchDto);

        return exerciseMapper.entityToResponseDto(findExercise);
    }

    @Override
    public ExerciseDetailResponseDto findExercise(Long exerciseId) {
        Exercise findExercise = findVerifiedExercise(exerciseId);

        return exerciseMapper.entityToDetailResponseDto(findExercise);
    }

    @Override
    public void deleteExercise(Long exerciseId, Long memberId) {
        Exercise findExercise = findVerifiedExercise(exerciseId);
        checkAuthorization(findExercise, memberId);

        exerciseRepository.delete(findExercise);
    }

    @Override
    public Exercise findVerifiedExercise(Long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXERCISE_NOT_FOUND));

        return exercise;
    }

    private Member findVerifiedMember(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    private void checkAuthorization(Exercise exercise, Long memberId) {
        if (!exercise.getHost().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }


}