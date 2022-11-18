package com.ilchinjo.around.global.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private final List<T> data;
    private final PageInfo pageInfo;

    private <P> MultiResponseDto(List<T> data, Page<P> page) {
        this.data = data;
        this.pageInfo = PageInfo.of(page);
    }

    private MultiResponseDto(List<T> data) {
        this.data = data;
        this.pageInfo = new PageInfo(1, data.size(), data.size(), 1);
    }

    public static <T, P> MultiResponseDto<T> of(List<T> data, Page<P> page) {
        return new MultiResponseDto<>(data, page);
    }

    public static <T> MultiResponseDto<T> of(List<T> data) {
        return new MultiResponseDto<>(data);
    }
}
