package com.foodbridge.location.dto.response;

public record DistanceResponse(

        double distanceKm,

        double allowedRadiusKm,

        boolean withinAllowedRadius

) {
}