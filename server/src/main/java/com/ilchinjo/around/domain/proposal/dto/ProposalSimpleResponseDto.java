package com.ilchinjo.around.domain.proposal.dto;

import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProposalSimpleResponseDto {
    private Long proposalId;
    private MemberResponseDto participant;
}
