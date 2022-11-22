package com.ilchinjo.mainproject.domain.image.repository;

import com.ilchinjo.mainproject.domain.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
