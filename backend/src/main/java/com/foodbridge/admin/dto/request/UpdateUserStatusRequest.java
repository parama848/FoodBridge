package com.foodbridge.admin.dto.request;

import com.foodbridge.auth.entity.AccountStatus;

import jakarta.validation.constraints.NotNull;

public record UpdateUserStatusRequest(

        @NotNull(message = "Account status is required")
        AccountStatus status

) {
}