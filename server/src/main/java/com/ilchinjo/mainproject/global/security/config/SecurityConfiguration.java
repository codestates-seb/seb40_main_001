package com.ilchinjo.mainproject.global.security.config;

import com.ilchinjo.mainproject.domain.member.repository.MemberRepository;
import com.ilchinjo.mainproject.global.security.filter.JwtAuthenticationFilter;
import com.ilchinjo.mainproject.global.security.filter.JwtVerificationFilter;
import com.ilchinjo.mainproject.global.security.handler.MemberAccessDeniedHandler;
import com.ilchinjo.mainproject.global.security.handler.MemberAuthenticationEntryPoint;
import com.ilchinjo.mainproject.global.security.handler.MemberAuthenticationFailureHandler;
import com.ilchinjo.mainproject.global.security.handler.MemberAuthenticationSuccessHandler;
import com.ilchinjo.mainproject.global.security.jwt.JwtTokenizer;
import com.ilchinjo.mainproject.global.security.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize

//                        .antMatchers(HttpMethod.POST, "/members").permitAll() // 회원 가입
//                        .antMatchers(HttpMethod.PATCH, "/members/**").hasAnyRole("USER") // 회원 정보 수정
//                        .antMatchers(HttpMethod.GET, "/members/profile").hasAnyRole("USER") // 마이페이지 조회
//
//                        .antMatchers(HttpMethod.POST, "/exercises").hasAnyRole("USER") // 운동 친구 모집 글 작성
//                        .antMatchers(HttpMethod.PATCH, "/exercises/**").hasAnyRole("USER") // 운동 친구 모집 글 수정
//                        .antMatchers(HttpMethod.GET, "/exercises/**").permitAll() // 운동 친구 모집 글 조회
//                        .antMatchers(HttpMethod.DELETE, "/exercises/**").hasAnyRole("USER", "ADMIN") // 운동 친구 모집 글 삭제
//
//                        .antMatchers(HttpMethod.POST, "/*/review").hasAnyRole("USER") // 리뷰 작성
//
//                        .antMatchers(HttpMethod.POST, "/exercises/**/comment").hasAnyRole("USER", "ADMIN") // 댓글 생성
//                        .antMatchers(HttpMethod.GET, "/exercises/**/comments").permitAll() // 댓글 조회
//                        .antMatchers(HttpMethod.DELETE, "/comments/**").hasAnyRole("USER", "ADMIN") // 댓글 삭제
//
//                        .antMatchers(HttpMethod.POST, "/comments/**/replies").hasAnyRole("USER", "ADMIN") // 대댓글 생성
//                        .antMatchers(HttpMethod.DELETE, "/replies/**").hasAnyRole("USER", "ADMIN") // 대댓글 삭제
//
//                        .antMatchers(HttpMethod.GET, "/addresses").hasAnyRole("USER", "ADMIN") // 주소 목록 조회
//
//                        .antMatchers(HttpMethod.POST, "/exercises/**/proposals").hasAnyRole("USER") // 운동 모집 신청
//                        .antMatchers(HttpMethod.GET, "/exercises/**/proposals").permitAll() // 운동 모집 신청자 목록 조회
//                        .antMatchers(HttpMethod.POST, "/proposals/**/approval").hasAnyRole("USER") // 운동 모집 수락

                                .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(memberRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
