package com.foodbridge.user.dto.response;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.Role;

import java.time.LocalDateTime;

public record UserProfileResponse(

        Long id,

        String name,

        String email,

        String phone,

        Role role,

        AccountStatus status,

        LocalDateTime createdAt

) {
}