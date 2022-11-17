package com.ilchinjo.mainproject.domain.comment.repository;

import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
