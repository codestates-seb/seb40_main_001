package com.ilchinjo.around.domain.proposal.repository;

import com.ilchinjo.around.domain.proposal.entity.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
}
