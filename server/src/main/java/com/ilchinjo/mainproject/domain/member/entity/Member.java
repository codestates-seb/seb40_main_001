package com.ilchinjo.mainproject.domain.member.entity;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String password;

    private String nickname;

    private String gender;

    private LocalDateTime birthday;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;
}
