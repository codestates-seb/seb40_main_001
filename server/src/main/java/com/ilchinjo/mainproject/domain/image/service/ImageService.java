package com.ilchinjo.mainproject.domain.image.service;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {

    ImageResponseDto uploadImage(MultipartFile multipartFile, Long memberId) throws IOException;
    List<ImageResponseDto> uploadImages(List<MultipartFile> multipartFiles, Long memberId) throws IOException;
}
