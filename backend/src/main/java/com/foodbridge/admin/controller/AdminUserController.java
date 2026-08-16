package com.foodbridge.admin.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.admin.dto.request.UpdateUserStatusRequest;
import com.foodbridge.admin.dto.response.AdminUserResponse;
import com.foodbridge.admin.service.AdminUserService;
import com.foodbridge.common.response.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {


    private final AdminUserService adminUserService;


    // =========================================================
    // GET USERS
    //
    // GET /api/admin/users
    //
    // Optional:
    //
    // ?page=0
    // ?size=20
    // ?search=param
    // ?role=DONOR
    // ?status=ACTIVE
    //
    // =========================================================

    @GetMapping
    public ResponseEntity<
            ApiResponse<Page<AdminUserResponse>>
            >
    getUsers(

            @RequestParam(
                    required = false
            )
            String search,

            @RequestParam(
                    required = false
            )
            String role,

            @RequestParam(
                    required = false
            )
            String status,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "20"
            )
            int size

    ) {


        // =====================================================
        // PAGINATION SAFETY
        // =====================================================

        if (page < 0) {
            page = 0;
        }


        if (size < 1) {
            size = 20;
        }


        // Prevent excessively large requests.

        if (size > 100) {
            size = 100;
        }


        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        )
                );


        Page<AdminUserResponse> users =
                adminUserService.getUsers(
                        search,
                        role,
                        status,
                        pageable
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "Users retrieved successfully",
                        users
                )
        );
    }


    // =========================================================
    // GET USER BY ID
    //
    // GET /api/admin/users/{id}
    //
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<
            ApiResponse<AdminUserResponse>
            >
    getUserById(

            @PathVariable
            Long id

    ) {

        AdminUserResponse user =
                adminUserService.getUserById(
                        id
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "User retrieved successfully",
                        user
                )
        );
    }


    // =========================================================
    // UPDATE ACCOUNT STATUS
    //
    // PATCH /api/admin/users/{id}/status
    //
    // =========================================================

    @PatchMapping("/{id}/status")
    public ResponseEntity<
            ApiResponse<AdminUserResponse>
            >
    updateUserStatus(

            Authentication authentication,

            @PathVariable
            Long id,

            @Valid
            @RequestBody
            UpdateUserStatusRequest request

    ) {

        String adminEmail =
                authentication.getName();


        AdminUserResponse user =
                adminUserService.updateUserStatus(
                        adminEmail,
                        id,
                        request
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "User account status updated successfully",
                        user
                )
        );
    }
}