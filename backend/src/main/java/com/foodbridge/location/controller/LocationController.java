package com.foodbridge.location.controller;

import com.foodbridge.common.response.ApiResponse;
import com.foodbridge.location.dto.request.LocationRequest;
import com.foodbridge.location.dto.response.DistanceResponse;
import com.foodbridge.location.service.LocationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;


    // =========================================================
    // CALCULATE DISTANCE
    // =========================================================
    //
    // POST /api/location/distance
    //
    // Calculates distance between two coordinates and checks
    // whether the destination is within the configured radius.
    // =========================================================

    @PostMapping("/distance")
    public ResponseEntity<ApiResponse<DistanceResponse>> calculateDistance(
            @Valid @RequestBody DistanceRequest request
    ) {

        LocationRequest source =
                new LocationRequest(
                        request.sourceLatitude(),
                        request.sourceLongitude()
                );

        LocationRequest destination =
                new LocationRequest(
                        request.destinationLatitude(),
                        request.destinationLongitude()
                );

        DistanceResponse response =
                locationService.calculateDistance(
                        source,
                        destination
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Distance calculated successfully",
                        response
                )
        );
    }


    // =========================================================
    // REQUEST DTO
    // =========================================================

    public record DistanceRequest(

            @jakarta.validation.constraints.NotNull(
                    message = "Source latitude is required"
            )
            @jakarta.validation.constraints.DecimalMin(
                    value = "-90.0",
                    message = "Source latitude must be between -90 and 90"
            )
            @jakarta.validation.constraints.DecimalMax(
                    value = "90.0",
                    message = "Source latitude must be between -90 and 90"
            )
            Double sourceLatitude,


            @jakarta.validation.constraints.NotNull(
                    message = "Source longitude is required"
            )
            @jakarta.validation.constraints.DecimalMin(
                    value = "-180.0",
                    message = "Source longitude must be between -180 and 180"
            )
            @jakarta.validation.constraints.DecimalMax(
                    value = "180.0",
                    message = "Source longitude must be between -180 and 180"
            )
            Double sourceLongitude,


            @jakarta.validation.constraints.NotNull(
                    message = "Destination latitude is required"
            )
            @jakarta.validation.constraints.DecimalMin(
                    value = "-90.0",
                    message = "Destination latitude must be between -90 and 90"
            )
            @jakarta.validation.constraints.DecimalMax(
                    value = "90.0",
                    message = "Destination latitude must be between -90 and 90"
            )
            Double destinationLatitude,


            @jakarta.validation.constraints.NotNull(
                    message = "Destination longitude is required"
            )
            @jakarta.validation.constraints.DecimalMin(
                    value = "-180.0",
                    message = "Destination longitude must be between -180 and 180"
            )
            @jakarta.validation.constraints.DecimalMax(
                    value = "180.0",
                    message = "Destination longitude must be between -180 and 180"
            )
            Double destinationLongitude
    ) {
    }
}