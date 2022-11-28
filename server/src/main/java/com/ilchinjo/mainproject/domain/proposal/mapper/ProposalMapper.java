package com.ilchinjo.mainproject.domain.proposal.mapper;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProposalMapper {
    @Mapping(target = "proposalStatus", source = "proposal.status")
    ProposalResponseDto entityToResponseDto(Proposal proposal);

    @Mapping(target = "proposalStatus", source = "proposal.status")
    ProposalSimpleResponseDto entityToSimpleResponseDto(Proposal proposal);

    List<ProposalSimpleResponseDto> entitiesToSimpleResponseDtoList(List<Proposal> proposals);
}
