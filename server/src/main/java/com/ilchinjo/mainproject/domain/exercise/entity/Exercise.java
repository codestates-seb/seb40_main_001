package com.ilchinjo.mainproject.domain.exercise.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.exercise.dto.ExercisePatchDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.proposal.entity.Proposal;
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

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ExerciseStatus exerciseStatus = ExerciseStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Member host;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Member participant;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE)
    private List<Proposal> proposals = new ArrayList<>();

    public static Exercise createExercise(Exercise exercise, Member host) {
        Exercise createdExercise = Exercise.builder()
                .title(exercise.title)
                .content(exercise.content)
                .exerciseAt(exercise.exerciseAt)
                .endAt(exercise.endAt)
                .genderType(exercise.genderType)
                .category(exercise.category)
                .host(host)
                .build();

        return createdExercise;
    }

    public void update(ExercisePatchDto patchDto) {
        Optional.ofNullable(patchDto.getTitle())
                .ifPresent(title -> this.title = title);
        Optional.ofNullable(patchDto.getContent())
                .ifPresent(content -> this.content = content);
        Optional.ofNullable(patchDto.getExerciseAt())
                .ifPresent(exerciseAt -> this.exerciseAt = exerciseAt);
        Optional.ofNullable(patchDto.getEndAt())
                .ifPresent(endAt -> this.endAt = endAt);
        Optional.ofNullable(patchDto.getGenderType())
                .ifPresent(genderType -> this.genderType = genderType);
        Optional.ofNullable(patchDto.getCategory())
                .ifPresent(category -> this.category = category);

    }

    public void choiceProposal(Proposal proposal) {
        this.participant = proposal.getParticipant();
        this.exerciseStatus = ExerciseStatus.CLOSED;
    }
}
