package com.ilchinjo.mainproject.domain.proposal.mapper;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProposalMapper {
    ProposalResponseDto entityToResponseDto(Proposal proposal);
}
