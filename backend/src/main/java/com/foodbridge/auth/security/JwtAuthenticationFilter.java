package com.foodbridge.auth.security;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    private final JwtService jwtService;

    private final UserRepository userRepository;


    // =========================================================
    // JWT FILTER
    // =========================================================

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        // =====================================================
        // WEBSOCKET / SOCKJS
        // =====================================================
        //
        // WebSocket handshake does not use the normal REST
        // Authorization header flow.
        //
        // SecurityConfig already permits /ws/**.
        //
        // Therefore simply continue the request when there
        // is no JWT.
        // =====================================================

        String authHeader =
                request.getHeader("Authorization");


        // =====================================================
        // NO JWT
        // =====================================================

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =====================================================
        // EXTRACT JWT
        // =====================================================

        String token =
                authHeader.substring(7);


        try {


            // =================================================
            // EXTRACT EMAIL
            // =================================================

            String email =
                    jwtService.extractEmail(token);


            // =================================================
            // PREVENT DUPLICATE AUTHENTICATION
            // =================================================

            if (email == null
                    || SecurityContextHolder
                    .getContext()
                    .getAuthentication() != null) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =================================================
            // FIND USER
            // =================================================

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);


            // =================================================
            // VALIDATE USER
            // =================================================

            if (user == null) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =================================================
            // ACCOUNT STATUS
            // =================================================

            if (user.getStatus()
                    != AccountStatus.ACTIVE) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =================================================
            // VALIDATE TOKEN
            // =================================================

            boolean validToken =
                    jwtService.isTokenValid(
                            token,
                            user.getEmail()
                    );


            if (!validToken) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =================================================
            // USER ROLE
            // =================================================

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority(
                            "ROLE_" +
                                    user.getRole().name()
                    );


            // =================================================
            // CREATE AUTHENTICATION
            // =================================================

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            List.of(authority)
                    );


            // =================================================
            // REQUEST DETAILS
            // =================================================

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );


            // =================================================
            // SET SECURITY CONTEXT
            // =================================================

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(
                            authentication
                    );


        } catch (Exception exception) {

            // =================================================
            // INVALID JWT
            // =================================================
            //
            // Do not break the request here.
            //
            // Spring Security will decide whether the endpoint
            // requires authentication.
            // =================================================

            SecurityContextHolder
                    .clearContext();
        }


        // =====================================================
        // CONTINUE REQUEST
        // =====================================================

        filterChain.doFilter(
                request,
                response
        );
    }
}