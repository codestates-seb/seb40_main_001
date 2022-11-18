package com.ilchinjo.around.domain.review.entity;

import com.ilchinjo.around.global.audit.AuditingEntity;
import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.member.entity.Member;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Review extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Range(min = -2, max = 2)
    private int publicEvaluation;

    @Range(min = -2, max = 2)
    private int privateEvaluation;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "src_member_id")
    private Member srcMember;

    @ManyToOne
    @JoinColumn(name = "dest_member_id")
    private Member destMember;
}
