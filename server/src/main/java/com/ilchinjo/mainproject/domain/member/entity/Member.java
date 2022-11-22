package com.ilchinjo.mainproject.domain.member.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.reply.entity.Reply;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "host")
    private List<Exercise> hostedExercises = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "participant")
    private List<Exercise> participatedExercises = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "author")
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "author")
    private List<Reply> replies = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "destMember")
    private List<Review> receivedReviews = new ArrayList<>();

    @Builder.Default
    private int publicEvaluation = 20;

    public void update(Member member, Address address) {

        this.nickname = member.getNickname();
        this.address = address;
    }

    public void updatePublicEvaluation() {
        int initialValue = 20;
        List<Review> reviewList = this.getReceivedReviews();

        int sum = reviewList.stream()
                .mapToInt(Review::getPublicEvaluation)
                .sum();

        this.publicEvaluation = initialValue + sum;

    }

    public static Member createMember(Member member, String encryptedPassword, Address address, List<String> roles) {
        return Member.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .password(encryptedPassword)
                .gender(member.getGender())
                .address(address)
                .roles(roles)
                .build();
    }
}
