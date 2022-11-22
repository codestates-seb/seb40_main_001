package com.ilchinjo.mainproject.domain.proposal.dto;

import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.ProposalStatus;
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
    private ProposalStatus proposalStatus;
}
