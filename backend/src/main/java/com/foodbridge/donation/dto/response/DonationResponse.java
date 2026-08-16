package com.foodbridge.donation.dto.response;

import com.foodbridge.donation.enums.DonationStatus;

import java.time.LocalDateTime;

public record DonationResponse(

        Long id,

        Long donorId,

        String donorName,

        String foodName,

        String foodType,

        Double quantity,

        String quantityUnit,

        LocalDateTime preparedAt,

        LocalDateTime expiresAt,

        String pickupAddress,

        Double latitude,

        Double longitude,

        DonationStatus status,

        Long acceptedFoundationId,

        String acceptedFoundationName,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}