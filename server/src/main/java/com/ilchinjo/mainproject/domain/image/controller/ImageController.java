package com.ilchinjo.mainproject.domain.image.controller;

import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.service.ImageService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
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
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/images")
    @ResponseStatus(HttpStatus.OK)
    public List<ImageResponseDto> postImages(@RequestPart("image") List<MultipartFile> images,
                                             @RequestHeader(name = "Authorization") String token) throws IOException {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return imageService.saveImages(images, memberId);
    }
}