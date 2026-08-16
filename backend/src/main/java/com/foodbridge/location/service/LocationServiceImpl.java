package com.foodbridge.location.service;

import com.foodbridge.location.config.LocationProperties;
import com.foodbridge.location.dto.request.LocationRequest;
import com.foodbridge.location.dto.response.DistanceResponse;
import com.foodbridge.location.util.CoordinateValidator;
import com.foodbridge.location.util.DistanceCalculator;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl
        implements LocationService {


    private final LocationProperties locationProperties;


    // =========================================================
    // CALCULATE DISTANCE
    // =========================================================

    @Override
    public DistanceResponse calculateDistance(
            LocationRequest source,
            LocationRequest destination
    ) {

        // -----------------------------------------------------
        // Validate source coordinates
        // -----------------------------------------------------

        validateCoordinates(source);


        // -----------------------------------------------------
        // Validate destination coordinates
        // -----------------------------------------------------

        validateCoordinates(destination);


        // -----------------------------------------------------
        // Calculate distance
        // -----------------------------------------------------

        double distanceKm =
                DistanceCalculator.calculateDistanceKm(
                        source.latitude(),
                        source.longitude(),
                        destination.latitude(),
                        destination.longitude()
                );


        // -----------------------------------------------------
        // Get configured donation radius
        // -----------------------------------------------------

        double allowedRadiusKm =
                locationProperties.donationRadiusKm();


        // -----------------------------------------------------
        // Check whether location is within radius
        // -----------------------------------------------------

        boolean withinAllowedRadius =
                distanceKm <= allowedRadiusKm;


        // -----------------------------------------------------
        // Return response
        // -----------------------------------------------------

        return new DistanceResponse(
                round(distanceKm),
                allowedRadiusKm,
                withinAllowedRadius
        );
    }


    // =========================================================
    // VALIDATE COORDINATES
    // =========================================================

    private void validateCoordinates(
            LocationRequest location
    ) {

        if (location == null) {

            throw new IllegalArgumentException(
                    "Location data is required"
            );
        }


        if (!CoordinateValidator.isValidCoordinate(
                location.latitude(),
                location.longitude()
        )) {

            throw new IllegalArgumentException(
                    "Invalid latitude or longitude"
            );
        }
    }


    // =========================================================
    // ROUND DISTANCE
    // =========================================================

    private double round(
            double value
    ) {

        return Math.round(value * 100.0) / 100.0;
    }
}