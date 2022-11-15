package com.ilchinjo.mainproject.domain.member.mapper;

import com.ilchinjo.mainproject.domain.member.dto.MemberDto;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberDto.Post postDto);
    MemberDto.Response entityToResponseDto(Member member);
}
