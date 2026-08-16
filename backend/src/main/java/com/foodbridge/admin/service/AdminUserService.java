package com.foodbridge.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.foodbridge.admin.dto.request.UpdateUserStatusRequest;
import com.foodbridge.admin.dto.response.AdminUserResponse;

public interface AdminUserService {


    // =========================================================
    // GET USERS
    // =========================================================

    Page<AdminUserResponse> getUsers(
            String search,
            String role,
            String status,
            Pageable pageable
    );


    // =========================================================
    // GET USER BY ID
    // =========================================================

    AdminUserResponse getUserById(
            Long userId
    );


    // =========================================================
    // UPDATE ACCOUNT STATUS
    // =========================================================

    AdminUserResponse updateUserStatus(
            String adminEmail,
            Long userId,
            UpdateUserStatusRequest request
    );
}