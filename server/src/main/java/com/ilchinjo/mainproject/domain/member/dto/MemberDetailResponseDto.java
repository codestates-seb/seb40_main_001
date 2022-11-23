package com.ilchinjo.mainproject.domain.member.dto;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.exercise.dto.ExerciseRecordDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MemberDetailResponseDto {

    private Long memberId;
    private String email;
    private String nickname;
    private int publicEvaluation;
    private AddressResponseDto address;
    private List<ExerciseRecordDto> exerciseRecord;
}
