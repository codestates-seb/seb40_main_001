package com.ilchinjo.mainproject.domain.image.service;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    ImageResponseDto uploadImage(MultipartFile multipartFile, Long memberId) throws IOException;
}
