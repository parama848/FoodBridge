package com.foodbridge.foundation.controller;

import com.foodbridge.common.response.ApiResponse;
import com.foodbridge.foundation.dto.request.CreateFoundationRequest;
import com.foodbridge.foundation.dto.request.UpdateFoundationRequest;
import com.foodbridge.foundation.dto.response.FoundationResponse;
import com.foodbridge.foundation.service.FoundationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/foundations")
@RequiredArgsConstructor
public class FoundationController {

    private final FoundationService foundationService;


    // =========================================================
    // CREATE FOUNDATION PROFILE
    // POST /api/foundations
    // =========================================================

    @PostMapping
    public ResponseEntity<ApiResponse<FoundationResponse>> createFoundation(
            Authentication authentication,
            @Valid @RequestBody CreateFoundationRequest request
    ) {

        String email = authentication.getName();

        FoundationResponse foundation =
                foundationService.createFoundation(
                        email,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Foundation profile submitted for verification",
                                foundation
                        )
                );
    }


    // =========================================================
    // GET MY FOUNDATION PROFILE
    // GET /api/foundations/me
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<FoundationResponse>> getMyFoundation(
            Authentication authentication
    ) {

        String email = authentication.getName();

        FoundationResponse foundation =
                foundationService.getMyFoundation(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation profile retrieved successfully",
                        foundation
                )
        );
    }


    // =========================================================
    // UPDATE MY FOUNDATION PROFILE
    // PUT /api/foundations/me
    // =========================================================

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<FoundationResponse>> updateMyFoundation(
            Authentication authentication,
            @Valid @RequestBody UpdateFoundationRequest request
    ) {

        String email = authentication.getName();

        FoundationResponse foundation =
                foundationService.updateMyFoundation(
                        email,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation profile updated successfully",
                        foundation
                )
        );
    }
}