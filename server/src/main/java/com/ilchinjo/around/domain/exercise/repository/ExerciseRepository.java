package com.ilchinjo.around.domain.exercise.repository;

import com.ilchinjo.around.domain.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
