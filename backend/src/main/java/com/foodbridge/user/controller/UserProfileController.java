package com.foodbridge.user.controller;

import com.foodbridge.common.response.ApiResponse;
import com.foodbridge.user.dto.request.UpdateProfileRequest;
import com.foodbridge.user.dto.response.UserProfileResponse;
import com.foodbridge.user.service.UserProfileService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;


    // =========================================================
    // GET CURRENT USER PROFILE
    // GET /api/users/me
    // =========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> getCurrentUser(
            Authentication authentication
    ) {

        String email = authentication.getName();

        UserProfileResponse profile =
                userProfileService.getCurrentUser(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User profile retrieved successfully",
                        profile
                )
        );
    }


    // =========================================================
    // UPDATE CURRENT USER PROFILE
    // PUT /api/users/me
    // =========================================================

    @PutMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateCurrentUser(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {

        String email = authentication.getName();

        UserProfileResponse profile =
                userProfileService.updateCurrentUser(
                        email,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User profile updated successfully",
                        profile
                )
        );
    }
}