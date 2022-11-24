package com.ilchinjo.mainproject.domain.exercise.dto;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.ExerciseStatus;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseRecordDto {
    private Long exerciseId;
    private MemberResponseDto host;
    private MemberResponseDto participant;
    private String title;
    private String content;
    private LocalDateTime exerciseAt;
    private LocalDateTime endAt;
    private GenderType genderType;
    private Category category;
    private ExerciseStatus exerciseStatus;
    private Address address;
    private Boolean isReviewed;
}
