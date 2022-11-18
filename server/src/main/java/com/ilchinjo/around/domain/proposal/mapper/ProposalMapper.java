package com.ilchinjo.around.domain.proposal.mapper;

import com.ilchinjo.around.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.around.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.around.domain.proposal.entity.Proposal;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProposalMapper {
    ProposalResponseDto entityToResponseDto(Proposal proposal);

    List<ProposalSimpleResponseDto> entitiesToSimpleResponseDtoList(List<Proposal> proposals);
}
