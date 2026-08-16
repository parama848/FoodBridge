package com.foodbridge.foundation.dto.response;

import java.time.LocalDateTime;

import com.foodbridge.foundation.entity.VerificationStatus;

public record FoundationResponse(

        Long id,

        Long userId,

        String organizationName,

        String registrationNumber,

        String phone,

        String address,

        String city,

        String state,

        String pincode,

        Double latitude,

        Double longitude,

        VerificationStatus verificationStatus,

        String rejectionReason,

        LocalDateTime verifiedAt,

        LocalDateTime createdAt

) {
}