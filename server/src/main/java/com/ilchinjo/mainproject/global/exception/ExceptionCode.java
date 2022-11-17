package com.ilchinjo.mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_UNAUTHORIZED(403, "Member unauthorized"),
    EXERCISE_NOT_FOUND(404, "Exercise not found"),
    CANT_PROPOSE_MYSELF(422, "Cant propose myself"),
    START_TIME_IS_PASSED(422, "Start time is passed"),
    REVIEW_EXISTS(409, "Review exists"),
    ;

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
