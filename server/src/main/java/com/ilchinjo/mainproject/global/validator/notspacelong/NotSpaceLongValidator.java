package com.ilchinjo.mainproject.global.validator.notspacelong;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotSpaceLongValidator implements ConstraintValidator<NotSpaceLong, Long> {
    @Override
    public void initialize(NotSpaceLong constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value > 0 || value == null) return true;

        return false;
    }
}
