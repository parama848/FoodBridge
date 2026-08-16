package com.foodbridge.admin.dto.response;

import java.time.LocalDateTime;

import com.foodbridge.donation.enums.DonationStatus;

public record AdminDonationResponse(

        // =====================================================
        // DONATION
        // =====================================================

        Long id,


        // =====================================================
        // DONOR
        // =====================================================

        Long donorId,

        String donorName,

        String donorEmail,


        // =====================================================
        // FOOD
        // =====================================================

        String foodName,

        String foodType,

        Double quantity,

        String quantityUnit,


        // =====================================================
        // TIME
        // =====================================================

        LocalDateTime preparedAt,

        LocalDateTime expiresAt,


        // =====================================================
        // PICKUP LOCATION
        // =====================================================

        String pickupAddress,

        Double latitude,

        Double longitude,


        // =====================================================
        // STATUS
        // =====================================================

        DonationStatus status,


        // =====================================================
        // ACCEPTED FOUNDATION
        // =====================================================

        Long foundationId,

        String foundationName,


        // =====================================================
        // TIMESTAMPS
        // =====================================================

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}