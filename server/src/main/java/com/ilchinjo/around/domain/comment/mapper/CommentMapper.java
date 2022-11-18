package com.ilchinjo.around.domain.comment.mapper;

import com.ilchinjo.around.domain.comment.dto.CommentPostDto;
import com.ilchinjo.around.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.around.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment postDtoToEntity(CommentPostDto postDto);

    CommentResponseDto entityToResponseDto(Comment comment);
}
