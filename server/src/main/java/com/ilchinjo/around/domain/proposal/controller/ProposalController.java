package com.ilchinjo.around.domain.proposal.controller;

import com.ilchinjo.around.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.around.global.dto.MultiResponseDto;
import com.ilchinjo.around.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.around.domain.proposal.service.ProposalService;
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

    @PostMapping("/proposals/{proposal-id}/approval")
    @ResponseStatus(HttpStatus.OK)
    public ProposalResponseDto approvalProposal(@PathVariable("proposal-id") Long proposalId,
                                                @RequestHeader("Authorization") Long hostId) {
        return proposalService.approvalProposal(proposalId, hostId);
    }
}
