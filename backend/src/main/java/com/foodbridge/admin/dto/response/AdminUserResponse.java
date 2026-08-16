package com.foodbridge.admin.dto.response;

import java.time.LocalDateTime;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.Role;

public record AdminUserResponse(

        Long id,

        String name,

        String email,

        String phone,

        Role role,

        AccountStatus status,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}