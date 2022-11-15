package com.ilchinjo.mainproject.domain.exercise.dto;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ExerciseDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목은 공백이 아니어야 합니다.")
        private String title;

        @NotBlank(message = "본문은 공백이 아니어야 합니다.")
        private String content;

        @NotNull(message = "운동 시작시점는 공백이 아니어야 합니다.")
        private LocalDateTime exerciseAt;

        @NotNull(message = "운동 종료시점은 공백이 아니어야 합니다.")
        private LocalDateTime endAt;

        @NotNull(message = "성별 타입은 공백이 아니어야 합니다.")
        private GenderType genderType;

        @NotNull(message = "카테고리는 공백이 아니어야 합니다.")
        private Category category;
    }
}
