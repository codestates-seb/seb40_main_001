package com.ilchinjo.around.domain.comment.repository;

import com.ilchinjo.around.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
