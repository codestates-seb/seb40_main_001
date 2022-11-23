package com.ilchinjo.mainproject.domain.image.controller;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/images")
    @ResponseStatus(HttpStatus.OK)
    public List<ImageResponseDto> postImages(@RequestPart("image") List<MultipartFile> images,
                                             @RequestHeader(name = "Authorization") Long memberId) throws IOException {

        return imageService.saveImages(images, memberId);
    }
}