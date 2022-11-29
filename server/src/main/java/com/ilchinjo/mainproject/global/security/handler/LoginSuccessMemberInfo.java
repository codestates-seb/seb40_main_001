package com.ilchinjo.mainproject.global.security.handler;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LoginSuccessMemberInfo {

    private int httpStatus;
    private long memberId;
    private String email;
    private String nickname;
}
