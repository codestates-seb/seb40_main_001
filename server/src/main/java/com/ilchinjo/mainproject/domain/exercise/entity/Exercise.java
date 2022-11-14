package com.ilchinjo.mainproject.domain.exercise.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exercise_id;

    private String title;

    private String content;

    private LocalDateTime exerciseAt;

    private LocalDateTime endAt;

    private GenderType genderType;

    private Category category;

    private ExerciseStatus exerciseStatus;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Member host;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Member participant;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;
}
