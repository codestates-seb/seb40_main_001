package com.ilchinjo.around.domain.comment.entity;

import com.ilchinjo.around.domain.exercise.entity.Exercise;
import com.ilchinjo.around.domain.member.entity.Member;
import com.ilchinjo.around.domain.reply.entity.Reply;
import com.ilchinjo.around.global.audit.AuditingEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Comment extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Member author;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Builder.Default
    @OneToMany(mappedBy = "comment")
    private List<Reply> replies = new ArrayList<>();

    public static Comment createComment(Comment comment, Member author, Exercise exercise) {

        Comment createdComment = Comment.builder()
                .content(comment.content)
                .author(author)
                .exercise(exercise)
                .build();

        return createdComment;
    }
}
