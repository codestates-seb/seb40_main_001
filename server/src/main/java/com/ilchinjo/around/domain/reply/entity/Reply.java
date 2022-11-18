package com.ilchinjo.around.domain.reply.entity;

import com.ilchinjo.around.domain.comment.entity.Comment;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Reply extends AuditingEntity {
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

    public static Reply createReply(Reply reply, Member author, Comment comment) {

        Reply createdReply = Reply.builder()
                .content(reply.content)
                .author(author)
                .comment(comment)
                .build();

        return createdReply;
    }
}
