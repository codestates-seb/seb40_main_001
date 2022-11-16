package com.ilchinjo.mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    EXERCISE_NOT_FOUND(404, "Exercise not found"),
    ;

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
