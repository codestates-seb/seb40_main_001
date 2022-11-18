package com.ilchinjo.around.domain.proposal.service;

import com.ilchinjo.around.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.around.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.around.domain.proposal.entity.Proposal;

import java.util.List;

public interface ProposalService {
    ProposalResponseDto saveProposal(Long exerciseId, Long participantId);

    List<ProposalSimpleResponseDto> findProposals(Long exerciseId);

    ProposalResponseDto approvalProposal(Long proposalId, Long hostId);

    Proposal findVerifiedProposal(Long proposalId);
}
