package com.ilchinjo.mainproject.domain.proposal.service;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalSimpleResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import com.ilchinjo.mainproject.domain.proposal.mapper.ProposalMapper;
import com.ilchinjo.mainproject.domain.proposal.repository.ProposalRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProposalServiceImpl implements ProposalService {

    private final ProposalRepository proposalRepository;
    private final ExerciseService exerciseService;
    private final MemberService memberService;
    private final ProposalMapper mapper;

    @Override
    public ProposalResponseDto saveProposal(Long exerciseId, Long participantId) {
        Exercise findExercise = exerciseService.findVerifiedExercise(exerciseId);
        checkExerciseValid(findExercise);
        checkSelfPropose(findExercise, participantId);
        Member findParticipant = memberService.findVerifiedMember(participantId);
        return mapper.entityToResponseDto(
                proposalRepository.save(Proposal.createProposal(findExercise, findParticipant))
        );
    }

    @Override
    public List<ProposalSimpleResponseDto> findProposals(Long exerciseId) {
        Exercise findExercise = exerciseService.findVerifiedExercise(exerciseId);

        return mapper.entitiesToSimpleResponseDtoList(findExercise.getProposals());
    }

    @Override
    public ProposalResponseDto approvalProposal(Long proposalId, Long hostId) {
        Proposal findProposal = findVerifiedProposal(proposalId);
        checkHostAuthorized(findProposal, hostId);
        findProposal.getExercise().choiceProposal(findProposal);
        return mapper.entityToResponseDto(findProposal);
    }

    @Override
    public Proposal findVerifiedProposal(Long proposalId) {
        Optional<Proposal> optionalProposal = proposalRepository.findById(proposalId);
        return optionalProposal.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROPOSAL_NOT_FOUND));
    }

    public void checkSelfPropose(Exercise exercise, Long memberId) {
        if (Objects.equals(exercise.getHost().getMemberId(), memberId)) {
            throw new BusinessLogicException(ExceptionCode.CANT_PROPOSE_MYSELF);
        }
    }

    public void checkExerciseValid(Exercise exercise) {
        if (LocalDateTime.now().isAfter(exercise.getExerciseAt())) {
            throw new BusinessLogicException(ExceptionCode.START_TIME_IS_PASSED);
        }
    }

    public void checkHostAuthorized(Proposal proposal, Long hostId) {
        if (!Objects.equals(proposal.getExercise().getHost().getMemberId(), hostId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
