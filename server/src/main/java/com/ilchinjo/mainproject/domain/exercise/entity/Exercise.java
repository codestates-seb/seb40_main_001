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

    public static Exercise createExercise(Exercise exercise) {
        Exercise createdExercise = Exercise.builder()
                .title(exercise.title)
                .content(exercise.content)
                .exerciseAt(exercise.exerciseAt)
                .endAt(exercise.endAt)
                .genderType(exercise.genderType)
                .category(exercise.category)
                .build();

        return createdExercise;
    }

    public void update(ExercisePatchDto patchDto) {
        this.title = patchDto.getTitle();
        this.content = patchDto.getContent();
        this.exerciseAt = patchDto.getExerciseAt();
        this.endAt = patchDto.getEndAt();
        this.genderType = patchDto.getGenderType();
        this.category = patchDto.getCategory();
    }
}
