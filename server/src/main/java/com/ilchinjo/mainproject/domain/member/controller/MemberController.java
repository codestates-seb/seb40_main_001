package com.ilchinjo.mainproject.domain.member.controller;

import com.ilchinjo.mainproject.domain.member.dto.MemberPostDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponseDto postMember(@RequestBody @Valid MemberPostDto postDto) {

        return memberService.saveMember(postDto);
    }
}
