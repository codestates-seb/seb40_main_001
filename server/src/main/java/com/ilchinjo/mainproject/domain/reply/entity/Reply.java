package com.ilchinjo.mainproject.domain.reply.entity;

import com.ilchinjo.mainproject.domain.comment.entity.Comment;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Member author;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
}
