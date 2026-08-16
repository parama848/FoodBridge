package com.foodbridge.auth.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.foodbridge.auth.security.JwtAuthenticationFilter;
import com.foodbridge.common.security.RestAccessDeniedHandler;
import com.foodbridge.common.security.RestAuthenticationEntryPoint;

import lombok.RequiredArgsConstructor;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final RestAuthenticationEntryPoint
            restAuthenticationEntryPoint;

    private final RestAccessDeniedHandler
            restAccessDeniedHandler;


    // =========================================================
    // FRONTEND ORIGIN
    // =========================================================

    @Value("${app.websocket.allowed-origins}")
    private String allowedOrigin;


    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =================================================
                // CORS
                // =================================================

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )


                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf ->
                        csrf.disable()
                )


                // =================================================
                // STATELESS JWT
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =================================================
                // EXCEPTION HANDLING
                // =================================================

                .exceptionHandling(exception -> exception

                        .authenticationEntryPoint(
                                restAuthenticationEntryPoint
                        )

                        .accessDeniedHandler(
                                restAccessDeniedHandler
                        )
                )


                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth


                        // -----------------------------------------
                        // CORS PREFLIGHT
                        // -----------------------------------------

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()


                        // -----------------------------------------
                        // WEBSOCKET / SOCKJS
                        // -----------------------------------------

                        .requestMatchers(
                                "/ws/**"
                        ).permitAll()


                        // -----------------------------------------
                        // AUTHENTICATION
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()


                        // -----------------------------------------
                        // USER REGISTRATION
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/users"
                        ).permitAll()


                        // -----------------------------------------
                        // ADMIN APIs
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")


                        // -----------------------------------------
                        // FOUNDATION APIs
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/foundations/**"
                        ).hasRole("FOUNDATION")


                        // -----------------------------------------
                        // EVERYTHING ELSE
                        // -----------------------------------------

                        .anyRequest().authenticated()
                )


                // =================================================
                // JWT FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =========================================================
    // CORS CONFIGURATION
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // =====================================================
        // ALLOWED FRONTEND
        // =====================================================

        configuration.setAllowedOrigins(
                List.of(
                        allowedOrigin
                )
        );


        // =====================================================
        // ALLOWED METHODS
        // =====================================================

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        // =====================================================
        // ALLOWED HEADERS
        // =====================================================

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept",
                        "Origin"
                )
        );


        // =====================================================
        // EXPOSED HEADERS
        // =====================================================

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );


        // =====================================================
        // CREDENTIALS
        // =====================================================

        configuration.setAllowCredentials(true);


        // =====================================================
        // REGISTER CORS CONFIGURATION
        // =====================================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}
// package com.foodbridge.auth.config;

// import com.foodbridge.auth.security.JwtAuthenticationFilter;
// import com.foodbridge.common.security.RestAccessDeniedHandler;
// import com.foodbridge.common.security.RestAuthenticationEntryPoint;

// import lombok.RequiredArgsConstructor;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.http.HttpMethod;

// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.List;


// @Configuration
// @RequiredArgsConstructor
// public class SecurityConfig {


//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     private final RestAuthenticationEntryPoint
//             restAuthenticationEntryPoint;

//     private final RestAccessDeniedHandler
//             restAccessDeniedHandler;


//     // =========================================================
//     // PASSWORD ENCODER
//     // =========================================================

//     @Bean
//     public PasswordEncoder passwordEncoder() {

//         return new BCryptPasswordEncoder();
//     }


//     // =========================================================
//     // SECURITY FILTER CHAIN
//     // =========================================================

//     @Bean
//     public SecurityFilterChain securityFilterChain(
//             HttpSecurity http
//     ) throws Exception {

//         http

//                 // =================================================
//                 // CORS
//                 // =================================================

//                 .cors(cors ->
//                         cors.configurationSource(
//                                 corsConfigurationSource()
//                         )
//                 )


//                 // =================================================
//                 // CSRF
//                 // =================================================

//                 .csrf(csrf ->
//                         csrf.disable()
//                 )


//                 // =================================================
//                 // STATELESS JWT
//                 // =================================================

//                 .sessionManagement(session ->
//                         session.sessionCreationPolicy(
//                                 SessionCreationPolicy.STATELESS
//                         )
//                 )


//                 // =================================================
//                 // EXCEPTION HANDLING
//                 // =================================================

//                 .exceptionHandling(exception -> exception

//                         .authenticationEntryPoint(
//                                 restAuthenticationEntryPoint
//                         )

//                         .accessDeniedHandler(
//                                 restAccessDeniedHandler
//                         )
//                 )


//                 // =================================================
//                 // AUTHORIZATION
//                 // =================================================

//                 .authorizeHttpRequests(auth -> auth


//                         // -----------------------------------------
//                         // CORS PREFLIGHT
//                         // -----------------------------------------

//                         .requestMatchers(
//                                 HttpMethod.OPTIONS,
//                                 "/**"
//                         ).permitAll()


//                         // -----------------------------------------
//                         // WEBSOCKET / SOCKJS
//                         // -----------------------------------------
//                         //
//                         // SockJS creates additional endpoints under
//                         // /ws, so /ws/** must be permitted.
//                         //

//                         .requestMatchers(
//                                 "/ws/**"
//                         ).permitAll()


//                         // -----------------------------------------
//                         // AUTHENTICATION
//                         // -----------------------------------------

//                         .requestMatchers(
//                                 "/api/auth/**"
//                         ).permitAll()


//                         // -----------------------------------------
//                         // USER REGISTRATION
//                         // -----------------------------------------

//                         .requestMatchers(
//                                 "/api/users"
//                         ).permitAll()


//                         // -----------------------------------------
//                         // ADMIN APIs
//                         // -----------------------------------------

//                         .requestMatchers(
//                                 "/api/admin/**"
//                         ).hasRole("ADMIN")


//                         // -----------------------------------------
//                         // FOUNDATION APIs
//                         // -----------------------------------------

//                         .requestMatchers(
//                                 "/api/foundations/**"
//                         ).hasRole("FOUNDATION")


//                         // -----------------------------------------
//                         // EVERYTHING ELSE
//                         // -----------------------------------------

//                         .anyRequest().authenticated()
//                 )


//                 // =================================================
//                 // JWT FILTER
//                 // =================================================
//                 //
//                 // IMPORTANT:
//                 // JwtAuthenticationFilter must skip /ws requests.
//                 //
//                 // The authorization rule above permits /ws/**,
//                 // but the custom JWT filter still executes before
//                 // Spring Security authorization.
//                 //

//                 .addFilterBefore(
//                         jwtAuthenticationFilter,
//                         UsernamePasswordAuthenticationFilter.class
//                 );


//         return http.build();
//     }


//     // =========================================================
//     // CORS CONFIGURATION
//     // =========================================================

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration configuration =
//                 new CorsConfiguration();


//         // =====================================================
//         // ALLOWED FRONTEND
//         // =====================================================

//         configuration.setAllowedOrigins(
//                 List.of(
//                         "http://localhost:5173"
//                 )
//         );


//         // =====================================================
//         // ALLOWED METHODS
//         // =====================================================

//         configuration.setAllowedMethods(
//                 List.of(
//                         "GET",
//                         "POST",
//                         "PUT",
//                         "DELETE",
//                         "PATCH",
//                         "OPTIONS"
//                 )
//         );


//         // =====================================================
//         // ALLOWED HEADERS
//         // =====================================================

//         configuration.setAllowedHeaders(
//                 List.of(
//                         "Authorization",
//                         "Content-Type",
//                         "Accept",
//                         "Origin"
//                 )
//         );


//         // =====================================================
//         // EXPOSED HEADERS
//         // =====================================================

//         configuration.setExposedHeaders(
//                 List.of(
//                         "Authorization"
//                 )
//         );


//         // =====================================================
//         // CREDENTIALS
//         // =====================================================

//         configuration.setAllowCredentials(true);


//         // =====================================================
//         // REGISTER CORS CONFIGURATION
//         // =====================================================

//         UrlBasedCorsConfigurationSource source =
//                 new UrlBasedCorsConfigurationSource();


//         source.registerCorsConfiguration(
//                 "/**",
//                 configuration
//         );


//         return source;
//     }
// }