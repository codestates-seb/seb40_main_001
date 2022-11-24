package com.ilchinjo.mainproject.domain.exercise.service;

import com.ilchinjo.mainproject.domain.exercise.dto.*;
import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import com.ilchinjo.mainproject.domain.exercise.mapper.ExerciseMapper;
import com.ilchinjo.mainproject.domain.exercise.repository.ExerciseRepository;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.image.repository.ImageRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.dto.CursorResponseDto;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

        Optional.ofNullable(postDto.getImageIdList())
                .ifPresent(imageIdList -> {
                    List<Image> images = findVerifiedImages(imageIdList);
                    createdExercise.addImages(images);
                    for (Image image : images) {
                        image.addExercise(createdExercise);
                    }
                });

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
    public CursorResponseDto<ExerciseResponseDto> findExercises(Long addressId, String genderType, String category,
                                                                Long memberId, Long cursorId, int size) {

        List<Exercise> exerciseList = exerciseRepository.findAllByExerciseIdLessThanOrderByExerciseIdDesc(0L);
        Stream<Exercise> stream = exerciseList.stream()
                .filter(exercise -> exercise.getAddress().getAddressId().equals(addressId));
        Member findMember = findVerifiedMember(memberId);
        if (genderType.equals("ALL")) {
            stream = stream.filter(exercise -> exercise.getHost().getGender().equals(findMember.getGender()) ||
                            exercise.getGenderType().equals(GenderType.ALL));
        } else if (genderType.equals("SAME")){
            stream = stream.filter(exercise -> exercise.getHost().getGender().equals(findMember.getGender()));
        }
        if (!category.equals("ALL")) {
            stream = stream.filter(exercise -> exercise.getCategory().equals(Category.valueOf(category)));
        }

        List<Exercise> resultList = stream.collect(Collectors.toList()).subList(0, size);


        return CursorResponseDto.of(exerciseMapper.entitiesToResponseDtoList(resultList),
                hasNext(resultList),
                !resultList.isEmpty() ? resultList.get(resultList.size() - 1).getExerciseId() : 0L);
    }

    public boolean hasNext(List<Exercise> exerciseList) {
        if (exerciseList.isEmpty()) {
            return false;
        }

        return exerciseRepository.existsByExerciseIdLessThan(exerciseList.get(exerciseList.size() - 1).getExerciseId());
    }

    @Override
    public List<ExerciseResponseDto> findExercisesDynamicQuery(String address, String genderType, String category, Long memberId) {

        Member findMember = findVerifiedMember(memberId);
        List<Exercise> exerciseList = exerciseRepository.findExercises(address, genderType, category, findMember);

        return exerciseMapper.entitiesToResponseDtoList(exerciseList);
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