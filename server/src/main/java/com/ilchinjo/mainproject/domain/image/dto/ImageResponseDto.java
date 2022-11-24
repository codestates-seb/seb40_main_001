package com.ilchinjo.mainproject.domain.image.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ImageResponseDto {
    private Long imageId;
    private String filename;
    private String originalFilename;
    private String remotePath;
    private int filesize;
    private LocalDateTime createdAt;
}
