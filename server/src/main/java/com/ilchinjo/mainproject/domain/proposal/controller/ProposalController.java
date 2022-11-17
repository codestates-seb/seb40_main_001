package com.ilchinjo.mainproject.domain.proposal.controller;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.service.ProposalService;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @PostMapping("/exercises/{exercise-id}/proposals")
    @ResponseStatus(HttpStatus.CREATED)
    public ProposalResponseDto postProposal(@PathVariable("exercise-id") Long exerciseId,
                                            @RequestHeader("Authorization") Long memberId) {
        return proposalService.saveProposal(exerciseId, memberId);
    }

    @GetMapping("/exercises/{exercise-id}/proposals")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto<ProposalSimpleResponseDto> getProposals(@PathVariable("exercise-id") Long exerciseId) {
        return MultiResponseDto.of(proposalService.findProposals(exerciseId));
    }
}
