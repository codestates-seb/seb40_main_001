package com.ilchinjo.mainproject.domain.proposal.entity;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "CantProposeTwice", columnNames = {"exercise_id", "participant_id"})
        }
)
public class Proposal extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proposalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id")
    private Member participant;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ProposalStatus status = ProposalStatus.UNAPPROVED;

    public static Proposal createProposal(Exercise exercise, Member participant) {
        return Proposal.builder()
                .exercise(exercise)
                .participant(participant)
                .build();
    }

    public void approve() {
        this.status = ProposalStatus.APPROVED;
    }
}
