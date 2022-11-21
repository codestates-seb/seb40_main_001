package com.ilchinjo.mainproject.global.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CursorResponseDto<T> {

    private final List<T> data;
    private final Boolean hasNext;
    private final Long nextCursorId;

    public CursorResponseDto(List<T> data, Boolean hasNext, Long nextCursorId) {
        this.data = data;
        this.hasNext = hasNext;
        this.nextCursorId = nextCursorId;
    }

    public static <T> CursorResponseDto<T> of(List<T> data, Boolean hasNext, Long nextCursorId) {
        return new CursorResponseDto<>(data, hasNext, nextCursorId);
    }
}
