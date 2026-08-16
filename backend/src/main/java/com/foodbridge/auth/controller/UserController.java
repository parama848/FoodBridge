package com.foodbridge.auth.controller;

import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.UserResponse;
import com.foodbridge.auth.service.UserService;
import com.foodbridge.common.response.ApiResponse;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    // =========================================================
    // REGISTER USER
    // POST /api/users
    // =========================================================

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody RegisterRequest request
    ) {

        UserResponse user =
                userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "User registered successfully",
                                user
                        )
                );
    }


    // =========================================================
    // GET USER BY ID
    // GET /api/users/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id
    ) {

        UserResponse user =
                userService.getUserById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User retrieved successfully",
                        user
                )
        );
    }


    // =========================================================
    // GET ALL USERS
    // GET /api/users
    // =========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        List<UserResponse> users =
                userService.getAllUsers();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Users retrieved successfully",
                        users
                )
        );
    }


    // =========================================================
    // UPDATE USER
    // PUT /api/users/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody RegisterRequest request
    ) {

        UserResponse user =
                userService.updateUser(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User updated successfully",
                        user
                )
        );
    }


    // =========================================================
    // DEACTIVATE USER
    // DELETE /api/users/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id
    ) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "User deactivated successfully"
                )
        );
    }
}