package com.foodbridge.auth.dto.response;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.Role;

import java.time.LocalDateTime;

public record UserResponse(

        Long id,

        String name,

        String email,

        String phone,

        Role role,

        AccountStatus status,

        LocalDateTime createdAt

) {
}