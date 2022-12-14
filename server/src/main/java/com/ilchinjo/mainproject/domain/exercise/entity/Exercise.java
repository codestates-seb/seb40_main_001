package com.ilchinjo.mainproject.domain.exercise.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Exercise extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;

    private String title;

    private String content;

    private LocalDateTime exerciseAt;

    private LocalDateTime endAt;

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ExerciseStatus exerciseStatus = ExerciseStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private Member host;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id")
    private Member participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Proposal> proposals = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Image> images = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    public static Exercise createExercise(Exercise exercise, Member host) {

        return Exercise.builder()
                .title(exercise.title)
                .content(exercise.content)
                .exerciseAt(exercise.exerciseAt)
                .endAt(exercise.endAt)
                .genderType(exercise.genderType)
                .category(exercise.category)
                .host(host)
                .address(host.getAddress())
                .build();
    }

    public void update(Exercise exercise, Address address) {
        Optional.ofNullable(exercise.getTitle())
                .ifPresent(title -> this.title = title);
        Optional.ofNullable(exercise.getContent())
                .ifPresent(content -> this.content = content);
        Optional.ofNullable(exercise.getExerciseAt())
                .ifPresent(exerciseAt -> this.exerciseAt = exerciseAt);
        Optional.ofNullable(exercise.getEndAt())
                .ifPresent(endAt -> this.endAt = endAt);
        Optional.ofNullable(exercise.getGenderType())
                .ifPresent(genderType -> this.genderType = genderType);
        Optional.ofNullable(exercise.getCategory())
                .ifPresent(category -> this.category = category);
        this.address = address;
        this.updatedAt = LocalDateTime.now();
    }

    public void choiceProposal(Proposal proposal) {
        this.participant = proposal.getParticipant();
        this.exerciseStatus = ExerciseStatus.CLOSED;
        proposal.approve();
    }

    public void addImages(List<Image> images) {
        this.images.addAll(images);
    }

    public void removeImages() {
        this.images.clear();
    }
}
