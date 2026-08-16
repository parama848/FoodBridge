package com.foodbridge.auth.dto.response;

public record LoginResponse(

        String token,

        String tokenType,

        UserResponse user

) {
}