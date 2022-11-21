package com.ilchinjo.mainproject.global.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CursorResponseDto<T> {

    private final List<T> data;
    private final Boolean hasNext;

    public CursorResponseDto(List<T> data, Boolean hasNext) {
        this.data = data;
        this.hasNext = hasNext;
    }

    public static <T> CursorResponseDto<T> of(List<T> data, Boolean hasNext) {
        return new CursorResponseDto<>(data, hasNext);
    }
}
