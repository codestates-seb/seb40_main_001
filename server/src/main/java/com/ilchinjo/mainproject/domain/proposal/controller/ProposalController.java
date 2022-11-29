package com.ilchinjo.mainproject.domain.proposal.controller;

import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.service.ProposalService;
import com.ilchinjo.mainproject.global.dto.MultiResponseDto;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/exercises/{exercise-id}/proposals")
    @ResponseStatus(HttpStatus.CREATED)
    public ProposalResponseDto postProposal(@PathVariable("exercise-id") Long exerciseId,
                                            @RequestHeader("Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return proposalService.saveProposal(exerciseId, memberId);
    }

    @GetMapping("/exercises/{exercise-id}/proposals")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto<ProposalSimpleResponseDto> getProposals(@PathVariable("exercise-id") Long exerciseId) {
        return MultiResponseDto.of(proposalService.findProposals(exerciseId));
    }

    @PostMapping("/proposals/{proposal-id}/approvals")
    @ResponseStatus(HttpStatus.OK)
    public ProposalResponseDto approvalProposal(@PathVariable("proposal-id") Long proposalId,
                                                @RequestHeader("Authorization") String token) {

        Long hostId = jwtTokenizer.parseMemberId(token);
        return proposalService.approvalProposal(proposalId, hostId);
    }
}
