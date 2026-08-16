package com.foodbridge.admin.service;

import com.foodbridge.foundation.dto.response.FoundationResponse;

import java.util.List;

public interface AdminFoundationService {

    List<FoundationResponse> getPendingFoundations();

    FoundationResponse getFoundationById(Long foundationId);

    FoundationResponse approveFoundation(Long foundationId);

    FoundationResponse rejectFoundation(
            Long foundationId,
            String rejectionReason
    );
}