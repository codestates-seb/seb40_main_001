package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long>, ExerciseRepositoryCustom {
    List<Exercise> findAllByHostOrParticipantOrderByExerciseIdDesc(Member host, Member participant);

    List<Exercise> findAllByExerciseIdLessThanOrderByExerciseIdDesc(Long cursorId);
}
