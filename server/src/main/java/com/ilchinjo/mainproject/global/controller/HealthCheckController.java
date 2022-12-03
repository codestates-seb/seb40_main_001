package com.ilchinjo.mainproject.global.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/healthcheck")
    @ResponseStatus(HttpStatus.OK)
    public void healthCheck() {
        
    }
}
