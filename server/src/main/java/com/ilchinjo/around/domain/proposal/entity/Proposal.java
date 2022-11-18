package com.ilchinjo.around.domain.proposal.entity;

import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Proposal extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proposalId;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Member participant;

    public static Proposal createProposal(Exercise exercise, Member participant) {
        return Proposal.builder()
                .exercise(exercise)
                .participant(participant)
                .build();
    }
}
