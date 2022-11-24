package com.ilchinjo.mainproject.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods(
                        HttpMethod.GET.name(), HttpMethod.HEAD.name(), HttpMethod.POST.name(),
                        HttpMethod.PATCH.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()
                )
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Refresh")
                .allowCredentials(true).maxAge(3600);
    }
}
