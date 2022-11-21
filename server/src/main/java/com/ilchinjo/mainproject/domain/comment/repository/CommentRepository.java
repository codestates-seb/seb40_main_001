package com.ilchinjo.mainproject.domain.comment.repository;

import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByExercise(Exercise exercise, Pageable page);

    Boolean existsByExerciseAndCommentIdGreaterThan(Exercise exercise, Long id);
}
