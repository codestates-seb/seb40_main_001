package com.ilchinjo.mainproject.global.security.utils;

import com.google.gson.Gson;
import com.ilchinjo.mainproject.global.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {

        ErrorResponse errorResponse = ErrorResponse.of(status);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(new Gson().toJson(errorResponse, ErrorResponse.class));
    }
}
