package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.member.entity.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class ExerciseRepositoryCustomImpl implements ExerciseRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Exercise> findExercises(String address, String genderType, String category, Member member, int start, int size) {

        String jpql = "select e from Exercise e where ";
        if (genderType.equals("ALL")) {
            jpql += "(e.genderType = \"ALL\" or e.host.gender = :gender) ";
        } else if (genderType.equals("SAME")) {
            jpql += "(e.host.gender = :gender) ";
        }
        if (!category.equals("ALL")) {
            jpql += "and e.category = :category";
        }


        return  em.createQuery(jpql, Exercise.class).setParameter("gender", member.getGender().toString())
                .setParameter("category", category)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }
}
