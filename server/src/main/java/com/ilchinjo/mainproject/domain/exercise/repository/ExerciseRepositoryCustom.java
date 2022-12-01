package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;

import java.util.List;

public interface ExerciseRepositoryCustom {

    List<Exercise> findExercisesScroll(Long addressId, String category, String genderType, Member findMember, int size, Long cursorId);
}
