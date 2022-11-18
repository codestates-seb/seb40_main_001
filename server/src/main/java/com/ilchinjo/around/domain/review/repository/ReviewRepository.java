package com.ilchinjo.around.domain.review.repository;

import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
     List<Review> findByExerciseAndSrcMember(Exercise exercise, Member srcMember);
}
