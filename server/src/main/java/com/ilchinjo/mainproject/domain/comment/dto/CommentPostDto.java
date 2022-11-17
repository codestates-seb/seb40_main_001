package com.ilchinjo.mainproject.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentPostDto {

    @NotBlank(message = "메시지를 입력하세요.")
    private String content;
}
