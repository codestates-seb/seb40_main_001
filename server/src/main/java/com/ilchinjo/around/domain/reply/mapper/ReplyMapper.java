package com.ilchinjo.around.domain.reply.mapper;

import com.ilchinjo.around.domain.reply.dto.ReplyPostDto;
import com.ilchinjo.around.domain.reply.dto.ReplyResponseDto;
import com.ilchinjo.around.domain.reply.entity.Reply;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReplyMapper {

    Reply postDtoToEntity(ReplyPostDto postDto);

    ReplyResponseDto entityToResponseDto(Reply reply);
}
