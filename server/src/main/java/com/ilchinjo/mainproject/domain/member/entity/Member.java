package com.ilchinjo.mainproject.domain.member.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.reply.entity.Reply;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

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

    @OneToOne(mappedBy = "profiledMember", cascade = CascadeType.REMOVE)
    private Image image;

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

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

    public static Member createMember(Member member, Address address) {
        return Member.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .address(address)
                .build();
    }

    public void addImage(Image image) {
        this.image = image;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateAddress(Address address) {
        this.address = address;
    }

}
