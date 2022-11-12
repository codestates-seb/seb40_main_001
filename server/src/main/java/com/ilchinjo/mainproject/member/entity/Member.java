package com.ilchinjo.mainproject.member.entity;

import com.ilchinjo.mainproject.Address.entity.Address;
import com.ilchinjo.mainproject.audit.AuditingEntity;
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
