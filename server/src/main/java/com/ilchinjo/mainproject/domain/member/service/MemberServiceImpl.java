package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.address.service.AddressService;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.repository.ExerciseRepository;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.image.repository.ImageRepository;
import com.ilchinjo.mainproject.domain.member.dto.*;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.mapper.MemberMapper;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.domain.review.entity.Review;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import com.ilchinjo.mainproject.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final AddressService addressService;
    private final ImageRepository imageRepository;
    private final ExerciseRepository exerciseRepository;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public MemberResponseDto saveMember(MemberPostDto postDto) {

        Member member = memberMapper.postDtoToEntity(postDto);
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(postDto.getPassword());
        Address findAddress = addressService.findVerifiedAddress(postDto.getAddressId());
        List<String> roles = authorityUtils.createRoles(postDto.getEmail());

        Member createdMember = Member.createMember(member, encryptedPassword, findAddress, roles);

        return memberMapper.entityToResponseDto(memberRepository.save(createdMember));
    }

    @Override
    public MemberResponseDto updateMember(Long pathMemberId, Long memberId, MemberPatchDto patchDto) {

        Member findMember = findVerifiedMember(pathMemberId);

        checkAuthorization(findMember, memberId);

        Optional.ofNullable(patchDto.getNickname())
                .ifPresent(nickname -> {
                    verifyExistsNickname(nickname);
                    findMember.updateNickname(nickname);
                });

        Optional.ofNullable((patchDto.getAddressId()))
                .ifPresent(addressId -> {
                    Address address = addressService.findVerifiedAddress(addressId);
                    findMember.updateAddress(address);
                });

        Optional.ofNullable(patchDto.getImageId())
                .ifPresent(imageId -> {
                    Image image = findVerifiedImage(imageId);
                    findMember.addImage(image);
                    image.addProfiledMember(findMember);
                });

        return memberMapper.entityToResponseDto(findMember);
    }

    @Override
    public MemberDetailResponseDto findDetailedMember(Long memberId) {

        Member findMember = findVerifiedMember(memberId);
        List<Exercise> exercises = exerciseRepository.findAllByHostOrParticipantOrderByExerciseIdDesc(findMember, findMember);
        MemberDetailResponseDto responseDto = memberMapper.entityToDetailResponseDto(findMember);
        responseDto.setExerciseRecord(memberMapper.exercisesToExerciseRecordDtoList(exercises));

        for (int i = 0; i < exercises.size(); i++) {
            responseDto.getExerciseRecord().get(i)
                    .setIsReviewed(exercises.get(i).getReviews().stream()
                            .map(Review::getSrcMember).collect(Collectors.toList())
                            .contains(findMember));
        }

        return responseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public MemberSimpleDto findSimpleMember(Long memberId) {
        return memberMapper.entityToSimpleResponseDto(findVerifiedMember(memberId));
    }

    @Override
    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    @Override
    public Member findVerifiedMember(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    private void verifyExistsEmail(String email) {

        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private void verifyExistsNickname(String nickname) {

        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

    private Image findVerifiedImage(Long imageId) {

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));

        return image;
    }

    private void checkAuthorization(Member member, Long memberId) {
        if (!member.getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }
}
