package com.ilchinjo.mainproject.domain.exercise.repository;

import com.ilchinjo.mainproject.domain.exercise.entity.Category;
import com.ilchinjo.mainproject.domain.exercise.entity.Exercise;
import com.ilchinjo.mainproject.domain.exercise.entity.GenderType;
import com.ilchinjo.mainproject.domain.member.entity.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class ExerciseRepositoryCustomImpl implements ExerciseRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Exercise> findExercises(String address, String genderType, String category, Member member) {

        String jpql = "select e from Exercise e where ";

        if (genderType.equals("ALL")) {
            jpql += "(e.genderType = :all or e.host.gender = :gender) ";
        } else if (genderType.equals("SAME")) {
            jpql += "(e.host.gender = :gender) ";
        }
        if (!category.equals("ALL")) {
            jpql += "and e.category = :category ";
        }
        jpql += "order by e.exerciseId desc ";
        TypedQuery<Exercise> emQuery = em.createQuery(jpql, Exercise.class);

        if (genderType.equals("ALL")) {
            emQuery.setParameter("all", GenderType.ALL);
            emQuery.setParameter("gender", member.getGender());
        } else if (genderType.equals("SAME")) {
            emQuery.setParameter("gender", member.getGender());
        }
        if (!category.equals("ALL")) {
            emQuery.setParameter("category", Category.valueOf(category));
        }

        return emQuery.getResultList();
    }
}
