package com.ilchinjo.mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_UNAUTHORIZED(403, "Member unauthorized"),
    EXERCISE_NOT_FOUND(404, "Exercise not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    CANT_PROPOSE_MYSELF(422, "Cant propose myself"),
    START_TIME_IS_PASSED(422, "Start time is passed"),
    END_TIME_IS_NOT_PASSED(422, "End time is not passed"),
    REVIEW_EXISTS(409, "Review exists"),
    PROPOSAL_NOT_FOUND(404, "Proposal not found"),
    EXERCISE_IS_CLOSED(422, "Exercise is closed"),
    ;

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
