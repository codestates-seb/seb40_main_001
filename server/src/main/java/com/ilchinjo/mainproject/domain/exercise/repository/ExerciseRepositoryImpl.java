package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import com.ilchinjo.mainproject.domain.member.entity.Gender;
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

    private BooleanExpression genderTypeEq(String genderType, Member findMember) {
        if (genderType == null) {
            throw new BusinessLogicException(ExceptionCode.GENDER_TYPE_NOT_FOUND);
        }
        Gender memberGender = findMember.getGender();
        switch (genderType) {
            case "ALL":
                return exercise.genderType.eq(GenderType.ALL).or(exercise.host.gender.eq(findMember.getGender()));
            case "SAME":
                return exercise.host.gender.eq(findMember.getGender());
            default:
                throw new BusinessLogicException(ExceptionCode.GENDER_TYPE_NOT_FOUND);
        }
    }

    private BooleanExpression categoryEq(String category) {
        if (category == null) {
            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
        }

        switch (category) {
            case "FITNESS":
                return exercise.category.eq(Category.FITNESS);
            case "YOGA":
                return exercise.category.eq(Category.YOGA);
            case "BASKETBALL":
                return exercise.category.eq(Category.BASKETBALL);
            case "RUNNING":
                return exercise.category.eq(Category.RUNNING);
            case "SWIMMING":
                return exercise.category.eq(Category.SWIMMING);
            case "BADMINTON":
                return exercise.category.eq(Category.BADMINTON);
            case "ALL":
                return null;
            default:
                throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
        }
    }

    private BooleanExpression startPoint(Long cursorId) {
        if (cursorId == null) {
            return null;
        }
        return exercise.exerciseId.lt(cursorId);
    }
}
