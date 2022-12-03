package com.ilchinjo.mainproject.domain.review.entity;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "CantSendReviewTwice", columnNames = {"exercise_id", "src_member_id"}),
                @UniqueConstraint(name = "CantReceiveReviewTwice", columnNames = {"exercise_id", "dest_member_id"})
        }
)
public class Review extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Range(min = -2, max = 2)
    private int publicEvaluation;

    @Range(min = -2, max = 2)
    private int privateEvaluation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "src_member_id")
    private Member srcMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dest_member_id")
    private Member destMember;

    public static Review createReview(Review review, Member srcMember, Member destMember, Exercise exercise) {
        Review createReview = Review.builder()
                .publicEvaluation(review.getPublicEvaluation())
                .privateEvaluation(review.getPrivateEvaluation())
                .exercise(exercise)
                .srcMember(srcMember)
                .destMember(destMember)
                .build();
        destMember.getReceivedReviews().add(createReview);

        return createReview;
    }
}
