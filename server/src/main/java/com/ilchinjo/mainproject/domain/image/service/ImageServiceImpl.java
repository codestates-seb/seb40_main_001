package com.ilchinjo.mainproject.domain.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ilchinjo.mainproject.domain.image.dto.ImageResponseDto;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.image.mapper.ImageMapper;
import com.ilchinjo.mainproject.domain.image.repository.ImageRepository;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService{

    private final AmazonS3Client amazonS3Client;
    private final MemberService memberService;
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<ImageResponseDto> saveImages(List<MultipartFile> multipartFiles, Long memberId) throws IOException {
        Member findMember = memberService.findVerifiedMember(memberId);
        List<Image> images = new ArrayList<>();

        if (multipartFiles.size() > 3) {
            throw new BusinessLogicException(ExceptionCode.NUMBER_OF_FILE_EXCEEDED);
        }

        for (MultipartFile multipartFile : multipartFiles) {
            Image image = uploadImage(multipartFile, findMember);
            images.add(image);
        }

        return imageMapper.entitiesToResponseDtos(images);
    }

    private Image uploadImage(MultipartFile multipartFile, Member findMember) throws IOException {
        verifiedImage(multipartFile);
        String originalName = multipartFile.getOriginalFilename();
        String storeFileName = getStoreFileName(originalName);

        Long filesize = multipartFile.getSize();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(filesize);

        amazonS3Client.putObject(
                new PutObjectRequest(bucket, storeFileName, multipartFile.getInputStream(), objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        Image image = Image.createImage(originalName, storeFileName, filesize, amazonS3Client.getUrl(bucket, storeFileName).toString(), findMember);
        imageRepository.save(image);

        return image;
    }

    private void verifiedImage(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.FILE_EMPTY);
        }

        verifiedImageName(multipartFile.getOriginalFilename());

    }

    private void verifiedImageName(String originalFileName) {
        if (originalFileName == null) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }

        boolean matches = originalFileName.matches("^[a-zA-Zㄱ-ㅎ가-힣-_]+\\.(jpg|JPG|png|jpeg|JPEG|heif|heic)$");
        if (!matches) {
            throw new BusinessLogicException(ExceptionCode.FILE_NAME_NOT_VALID);
        }
    }

    private String getExtension(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos + 1);
    }

    private String getStoreFileName(String originalFileName) {
        UUID uuid = UUID.randomUUID();
        String extension = getExtension(originalFileName);
        return uuid + "." + extension;
    }
}
