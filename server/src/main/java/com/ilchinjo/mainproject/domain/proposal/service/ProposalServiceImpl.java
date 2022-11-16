package com.ilchinjo.mainproject.domain.proposal.service;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.entity.ExerciseStatus;
import com.ilchinjo.mainproject.domain.exercise.service.ExerciseService;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.domain.proposal.dto.ProposalResponseDto;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import com.ilchinjo.mainproject.domain.proposal.mapper.ProposalMapper;
import com.ilchinjo.mainproject.domain.proposal.repository.ProposalRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;

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
}
