package com.foodbridge.auth.service;

import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(RegisterRequest request);

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long id, RegisterRequest request);

    void deleteUser(Long id);
}