package com.ilchinjo.mainproject.domain.review.repository;

import com.ilchinjo.mainproject.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
