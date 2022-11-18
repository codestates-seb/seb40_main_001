package com.ilchinjo.around.domain.member.mapper;

import com.ilchinjo.around.domain.member.dto.MemberPostDto;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.member.dto.MemberDetailResponseDto;
import com.ilchinjo.around.domain.member.dto.MemberResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    MemberResponseDto entityToResponseDto(Member member);

    MemberDetailResponseDto entityToDetailResponseDto(Member member);
}
