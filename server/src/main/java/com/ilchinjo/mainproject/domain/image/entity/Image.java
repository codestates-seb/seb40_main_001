package com.ilchinjo.mainproject.domain.image.entity;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Image extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    private String filename;

    private String originalFilename;

    private String remotePath;

    private Long filesize;

    @OneToOne
    @JoinColumn(name = "owner_id")
    private Member owner;

    @OneToOne
    @Column(unique = true)
    @JoinColumn(name = "profiled_member_id")
    private Member profiledMember;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

}
