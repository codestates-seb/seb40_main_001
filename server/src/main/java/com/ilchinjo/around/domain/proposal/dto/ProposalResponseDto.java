package com.ilchinjo.around.domain.proposal.dto;

import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
import com.ilchinjo.around.domain.exercise.dto.ExerciseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProposalResponseDto {
    private Long proposalId;
    private ExerciseResponseDto exercise;
    private MemberResponseDto participant;
}
