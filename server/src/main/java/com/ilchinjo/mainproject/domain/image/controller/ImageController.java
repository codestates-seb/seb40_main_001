package com.ilchinjo.mainproject.domain.image.controller;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/images")
    @ResponseStatus(HttpStatus.OK)
    public ImageResponseDto postImage(@RequestPart("image") MultipartFile image,
                                      @RequestHeader(name = "Authorization") Long memberId) throws IOException {

        return imageService.uploadImage(image, memberId);
    }
}