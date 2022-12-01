package com.ilchinjo.mainproject.domain.auth.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String token;

    private RefreshToken(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public static RefreshToken createToken(String email, String token) {
        return new RefreshToken(email, token);
    }

    public void changeToken(String token) {
        this.token = token;
    }
}
