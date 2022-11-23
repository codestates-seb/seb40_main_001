package com.ilchinjo.mainproject.domain.member.service;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.address.service.AddressService;
import com.ilchinjo.mainproject.domain.image.entity.Image;
import com.ilchinjo.mainproject.domain.image.repository.ImageRepository;
import com.ilchinjo.mainproject.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberPatchDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberPostDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.mapper.MemberMapper;
import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final AddressService addressService;
    private final ImageRepository imageRepository;

    @Override
    public MemberResponseDto saveMember(MemberPostDto postDto) {

        Member member = memberMapper.postDtoToEntity(postDto);
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());
        Address findAddress = addressService.findVerifiedAddress(postDto.getAddressId());

        Member createdMember = Member.createMember(member, findAddress);

        Optional.ofNullable(postDto.getImageId())
                .ifPresent(imageId -> {
                    Image image = findVerifiedImage(imageId);
                    createdMember.addImage(image);
                    image.addProfiledMember(createdMember);
                });

        return memberMapper.entityToResponseDto(memberRepository.save(createdMember));
    }

    @Override
    public MemberResponseDto updateMember(Long memberId, MemberPatchDto patchDto) {

        Member findMember = findVerifiedMember(memberId);
        verifyExistsNickname(patchDto.getNickname());
        Member patchMember = memberMapper.patchDtoToEntity(patchDto);
        Address findAddress = addressService.findVerifiedAddress(patchDto.getAddressId());

        findMember.update(patchMember, findAddress);

        return memberMapper.entityToResponseDto(findMember);
    }

    @Override
    public MemberDetailResponseDto findMember(Long memberId) {

        Member findMember = findVerifiedMember(memberId);

        return memberMapper.entityToDetailResponseDto(findMember);
    }

    @Override
    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
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
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private Image findVerifiedImage(Long imageId) {

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));

        return image;
    }
}
