package com.ilchinjo.mainproject.domain.member.dto;

import com.ilchinjo.mainproject.domain.member.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Builder
@AllArgsConstructor
public class MemberPostDto {

    @Email(message = "올바른 이메일을 입력해 주세요.")
    @NotBlank(message = "이메일을 입력해 주세요.")
    private String email;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+~])[A-Za-z\\d!@#$%^&*()\\-_=+~]{8,}$",
            message = "비밀번호는 영문 대문자와 소문자, 숫자 및 특수문자를 포함하여 8자리 이상이어야 합니다.")
    @NotBlank(message = "비밀번호를 입력해 주세요.")
    private String password;

    @NotBlank(message = "닉네임을 입력해 주세요.")
    private String nickname;

    @NotNull
    private Gender gender;

    @NotNull
    private Long addressId;

}
