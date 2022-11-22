package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseDetailResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePostDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseResponseDto;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.mapper.ExerciseMapper;
import com.ilchinjo.mainproject.domain.exercise.repository.ExerciseRepository;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.image.repository.ImageRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final MemberRepository memberRepository;
    private final ImageRepository imageRepository;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ExerciseResponseDto saveExercise(ExercisePostDto postDto, Long memberId) {
        Exercise exercise = exerciseMapper.postDtoToEntity(postDto);
        Member findMember = findVerifiedMember(memberId);

        Exercise createdExercise = Exercise.createExercise(exercise, findMember);

        if (postDto.getImageIdList() != null) {
            List<Image> images = findVerifiedImages(postDto.getImageIdList());
            createdExercise.addImages(images);
        }

        exerciseRepository.save(createdExercise);

        return exerciseMapper.entityToResponseDto(createdExercise);
    }

    @Override
    public ExerciseResponseDto updateExercise(Long exerciseId, ExercisePatchDto patchDto, Long memberId) {
        Exercise findExercise = findVerifiedExercise(exerciseId);
        checkAuthorization(findExercise, memberId);
        Member findMember = findVerifiedMember(memberId);
        Exercise patchExercise = exerciseMapper.patchDtoToEntity(patchDto);

        findExercise.update(patchExercise, findMember.getAddress());

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

    private List<Image> findVerifiedImages(List<Long> imageIdList) {

        List<Image> images = new ArrayList<>();
        for (Long imageId : imageIdList) {
            Image image = imageRepository.findById(imageId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));
            images.add(image);
        }

        return images;
    }

}