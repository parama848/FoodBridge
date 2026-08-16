package com.foodbridge.user.service;

import com.foodbridge.user.dto.request.UpdateProfileRequest;
import com.foodbridge.user.dto.response.UserProfileResponse;

public interface UserProfileService {

    UserProfileResponse getCurrentUser(String email);

    UserProfileResponse updateCurrentUser(
            String email,
            UpdateProfileRequest request
    );
}