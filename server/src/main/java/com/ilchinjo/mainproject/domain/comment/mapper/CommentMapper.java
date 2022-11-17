package com.ilchinjo.mainproject.domain.comment.mapper;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment postDtoToEntity(CommentPostDto postDto);

    CommentResponseDto entityToResponseDto(Comment comment);
}
