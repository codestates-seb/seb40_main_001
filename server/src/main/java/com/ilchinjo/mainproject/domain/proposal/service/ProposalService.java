package com.ilchinjo.mainproject.domain.proposal.service;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;

public interface ProposalService {
    ProposalResponseDto saveProposal(Long exerciseId, Long participantId);
}
