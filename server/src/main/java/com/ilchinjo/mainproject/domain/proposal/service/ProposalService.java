package com.ilchinjo.mainproject.domain.proposal.service;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;

import java.util.List;

public interface ProposalService {
    ProposalResponseDto saveProposal(Long exerciseId, Long participantId);

    List<ProposalSimpleResponseDto> findProposals(Long exerciseId);

    ProposalResponseDto approvalProposal(Long proposalId, Long hostId);

    Proposal findVerifiedProposal(Long proposalId);
}
