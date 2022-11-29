package com.ilchinjo.mainproject.domain.member.controller;

import com.ilchinjo.mainproject.domain.member.dto.*;
import com.ilchinjo.mainproject.domain.member.service.MemberService;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponseDto postMember(@RequestBody @Valid MemberPostDto postDto) {

        return memberService.saveMember(postDto);
    }

    @PatchMapping("/{member-id}")
    @ResponseStatus(HttpStatus.OK)
    public MemberResponseDto patchMember(@PathVariable("member-id") Long pathMemberId,
                                         @RequestHeader(name = "Authorization") String token,
                                         @RequestBody MemberPatchDto patchDto) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return memberService.updateMember(pathMemberId, memberId, patchDto);
    }

    @GetMapping("/profiles")
    @ResponseStatus(HttpStatus.OK)
    public MemberDetailResponseDto getMember(@RequestHeader(name = "Authorization") String token) {

        Long memberId = jwtTokenizer.parseMemberId(token);
        return memberService.findDetailedMember(memberId);
    }

    @GetMapping("/info")
    @ResponseStatus(HttpStatus.OK)
    public MemberSimpleDto getMemberInfo(@RequestHeader(name = "Authorization") String token) {

        return memberService.findSimpleMember(jwtTokenizer.parseMemberId(token));
    }
}
