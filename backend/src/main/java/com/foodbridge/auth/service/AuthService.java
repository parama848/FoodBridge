package com.foodbridge.auth.service;

import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.LoginResponse;
import com.foodbridge.auth.dto.response.UserResponse;

public interface AuthService {

    LoginResponse login(
            LoginRequest request
    );

    UserResponse register(
            RegisterRequest request
    );
}