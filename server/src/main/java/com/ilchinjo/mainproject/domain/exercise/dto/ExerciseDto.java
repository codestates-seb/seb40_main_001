package com.ilchinjo.mainproject.domain.exercise.dto;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
public class ExerciseDto {

    public static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        @NotBlank
        private LocalDateTime exerciseAt;

        @NotBlank
        private LocalDateTime endAt;

        @NotBlank
        private GenderType genderType;

        @NotBlank
        private Address address;

        @NotBlank
        private Category category;
    }
}
