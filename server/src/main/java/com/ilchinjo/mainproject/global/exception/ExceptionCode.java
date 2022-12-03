package com.ilchinjo.mainproject.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NICKNAME_EXISTS(409, "Nickname exists"),
    MEMBER_UNAUTHORIZED(403, "Member unauthorized"),
    EXERCISE_NOT_FOUND(404, "Exercise not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    CANT_PROPOSE_MYSELF(422, "Cant propose myself"),
    CANT_DUPLICATED_PROPOSAL(422, "Cant duplicated proposal"),
    GENDER_TYPE_NOT_MATCHED(422, "Gender type is not matched"),
    START_TIME_IS_PASSED(422, "Start time is passed"),
    END_TIME_IS_NOT_PASSED(422, "End time is not passed"),
    START_TIME_IS_LATER_THAN_END_TIME(422, "Start time is later than end time"),
    START_TIME_IS_EARLIER_THAN_CURRENT_TIME(422, "Start time is earlier than current time"),
    REVIEW_EXISTS(409, "Review exists"),
    PROPOSAL_NOT_FOUND(404, "Proposal not found"),
    EXERCISE_IS_CLOSED(422, "Exercise is closed"),
    ADDRESS_NOT_FOUND(404, "Address not found"),
    FILE_EMPTY(400, "File is empty"),
    FILE_NAME_NOT_VALID(400, "File name is not valid"),
    NUMBER_OF_FILE_EXCEEDED(400, "The number of files is exceeded"),
    FILE_NOT_FOUND(404, "File not found"),
    GENDER_TYPE_NOT_FOUND(404, "Gender type not found"),
    CATEGORY_NOT_FOUND(404, "Category not found");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
