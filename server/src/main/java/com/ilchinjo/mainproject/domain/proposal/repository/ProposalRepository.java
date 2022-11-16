package com.ilchinjo.mainproject.domain.proposal.repository;

import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
}
