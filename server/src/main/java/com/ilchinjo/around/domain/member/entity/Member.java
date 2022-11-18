package com.ilchinjo.around.domain.member.entity;

import com.ilchinjo.around.domain.address.entity.Address;
import com.ilchinjo.around.domain.reply.entity.Reply;
import com.ilchinjo.around.domain.review.entity.Review;
import com.ilchinjo.around.global.audit.AuditingEntity;
import com.ilchinjo.around.domain.comment.entity.Comment;
import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.member.dto.MemberPatchDto;
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

    public void update(MemberPatchDto patchDto) {

        this.nickname = patchDto.getNickname();
    }
}
