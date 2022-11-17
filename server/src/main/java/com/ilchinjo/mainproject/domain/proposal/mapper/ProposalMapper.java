package com.ilchinjo.mainproject.domain.proposal.mapper;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProposalMapper {
    ProposalResponseDto entityToResponseDto(Proposal proposal);

    List<ProposalSimpleResponseDto> entitiesToSimpleResponseDtoList(List<Proposal> proposals);
}
