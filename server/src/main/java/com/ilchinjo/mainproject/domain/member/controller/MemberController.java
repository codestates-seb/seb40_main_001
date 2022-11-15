package com.ilchinjo.mainproject.domain.member.controller;

import com.ilchinjo.mainproject.domain.member.dto.MemberDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.domain.member.mapper.MemberMapper;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post postDto) {

        Member member = mapper.postDtoToEntity(postDto);
        Member createMember = memberService.saveMember(member);
        MemberDto.Response response = mapper.entityToResponseDto(createMember);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
