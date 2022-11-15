package com.ilchinjo.mainproject.domain.member.mapper;

import com.ilchinjo.mainproject.domain.member.dto.MemberPostDto;
import com.ilchinjo.mainproject.domain.member.dto.MemberResponseDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    MemberResponseDto entityToResponseDto(Member member);
}
