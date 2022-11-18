package com.ilchinjo.mainproject.domain.reply.mapper;

import com.ilchinjo.mainproject.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.mainproject.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.mainproject.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReplyMapper {

    Reply postDtoToEntity(ReplyPostDto postDto);

    ReplyResponseDto entityToResponseDto(Reply reply);
}
