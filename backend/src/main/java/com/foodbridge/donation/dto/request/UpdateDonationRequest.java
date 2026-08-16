package com.foodbridge.donation.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public record UpdateDonationRequest(

        @NotBlank(message = "Food name is required")
        String foodName,

        @NotBlank(message = "Food type is required")
        String foodType,

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be greater than zero")
        Double quantity,

        @NotBlank(message = "Quantity unit is required")
        String quantityUnit,

        @NotNull(message = "Prepared time is required")
        LocalDateTime preparedAt,

        @NotNull(message = "Expiry time is required")
        @Future(message = "Expiry time must be in the future")
        LocalDateTime expiresAt,

        @NotBlank(message = "Pickup address is required")
        String pickupAddress,

        @NotNull(message = "Latitude is required")
        @DecimalMin(
                value = "-90.0",
                message = "Latitude must be between -90 and 90"
        )
        @DecimalMax(
                value = "90.0",
                message = "Latitude must be between -90 and 90"
        )
        Double latitude,

        @NotNull(message = "Longitude is required")
        @DecimalMin(
                value = "-180.0",
                message = "Longitude must be between -180 and 180"
        )
        @DecimalMax(
                value = "180.0",
                message = "Longitude must be between -180 and 180"
        )
        Double longitude

) {
}