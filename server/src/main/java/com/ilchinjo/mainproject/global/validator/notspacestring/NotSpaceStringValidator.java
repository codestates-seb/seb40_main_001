package com.ilchinjo.mainproject.global.validator.notspacestring;

import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotSpaceStringValidator implements ConstraintValidator<NotSpaceString, String> {
    @Override
    public void initialize(NotSpaceString constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || StringUtils.hasText(value);
    }
}
