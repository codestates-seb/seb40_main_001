package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ilchinjo.mainproject.domain.exercise.entity.QExercise.exercise;

public class ExerciseRepositoryImpl implements ExerciseRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ExerciseRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Exercise> findExercises(Long addressId, String category, String genderType, Member findMember, int size, Long cursorId) {
        JPAQuery<Exercise> query = queryFactory
                .selectFrom(exercise)
                .where(addressIdEq(addressId),
                        genderTypeEq(genderType, findMember),
                        categoryEq(category),
                        startPoint(cursorId))
                .orderBy(exercise.exerciseId.desc())
                .limit(size + 1);

        return query.fetch();
    }

    private BooleanExpression addressIdEq(Long addressId) {
        if (addressId == null) {
            throw new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND);
        }

        return exercise.address.addressId.eq(addressId);
    }

}
