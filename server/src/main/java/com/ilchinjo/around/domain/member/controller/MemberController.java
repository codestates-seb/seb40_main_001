package com.ilchinjo.around.domain.member.controller;

import com.ilchinjo.around.domain.member.dto.MemberPatchDto;
import com.ilchinjo.around.domain.member.dto.MemberPostDto;
import com.ilchinjo.around.domain.member.service.MemberService;
import com.ilchinjo.around.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
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

    @PatchMapping("/{member-id}")
    @ResponseStatus(HttpStatus.OK)
    public MemberResponseDto patchMember(@PathVariable("member-id") Long memberId,
                                         @RequestBody MemberPatchDto patchDto) {

        return memberService.updateMember(memberId, patchDto);
    }

    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public MemberDetailResponseDto getMember(@RequestHeader(name = "Member-Id") Long memberId) {

        return memberService.findMember(memberId);
    }
}
