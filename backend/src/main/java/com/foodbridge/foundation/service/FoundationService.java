package com.foodbridge.foundation.service;

import com.foodbridge.foundation.dto.request.CreateFoundationRequest;
import com.foodbridge.foundation.dto.request.UpdateFoundationRequest;
import com.foodbridge.foundation.dto.response.FoundationResponse;

public interface FoundationService {

    FoundationResponse createFoundation(
            String email,
            CreateFoundationRequest request
    );

    FoundationResponse getMyFoundation(
            String email
    );

    FoundationResponse updateMyFoundation(
            String email,
            UpdateFoundationRequest request
    );
}