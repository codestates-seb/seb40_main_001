package com.ilchinjo.mainproject.domain.comment.mapper;

import com.ilchinjo.mainproject.domain.comment.dto.CommentPostDto;
import com.ilchinjo.mainproject.domain.comment.dto.CommentResponseDto;
import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment postDtoToEntity(CommentPostDto postDto);

    CommentResponseDto entityToResponseDto(Comment comment);

    List<CommentResponseDto> entitiesToResponseDtoList(List<Comment> comment);
}
