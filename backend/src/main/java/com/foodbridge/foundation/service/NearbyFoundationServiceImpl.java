package com.foodbridge.foundation.service;

import com.foodbridge.foundation.entity.Foundation;
import com.foodbridge.foundation.entity.VerificationStatus;
import com.foodbridge.foundation.repository.FoundationRepository;

import com.foodbridge.location.dto.request.LocationRequest;
import com.foodbridge.location.dto.response.DistanceResponse;
import com.foodbridge.location.service.LocationService;
import com.foodbridge.location.util.CoordinateValidator;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NearbyFoundationServiceImpl
        implements NearbyFoundationService {


    private final FoundationRepository foundationRepository;

    private final LocationService locationService;


    // =========================================================
    // FIND NEARBY VERIFIED FOUNDATIONS
    // =========================================================

    @Override
    public List<Foundation> findNearbyVerifiedFoundations(
            Double latitude,
            Double longitude
    ) {

        // -----------------------------------------------------
        // Validate donation coordinates
        // -----------------------------------------------------

        if (
                latitude == null ||
                        longitude == null
        ) {

            return List.of();
        }


        if (
                !CoordinateValidator.isValidCoordinate(
                        latitude,
                        longitude
                )
        ) {

            return List.of();
        }


        // -----------------------------------------------------
        // Find VERIFIED foundations
        // -----------------------------------------------------

        List<Foundation> verifiedFoundations =
                foundationRepository.findByVerificationStatus(
                        VerificationStatus.VERIFIED
                );


        if (verifiedFoundations.isEmpty()) {
            return List.of();
        }


        // -----------------------------------------------------
        // Donation location
        // -----------------------------------------------------

        LocationRequest donationLocation =
                new LocationRequest(
                        latitude,
                        longitude
                );


        // -----------------------------------------------------
        // Filter by configured radius
        // -----------------------------------------------------

        return verifiedFoundations.stream()

                .filter(foundation -> {

                    // -----------------------------------------
                    // Foundation must have coordinates
                    // -----------------------------------------

                    if (
                            foundation.getLatitude() == null ||
                                    foundation.getLongitude() == null
                    ) {

                        return false;
                    }


                    // -----------------------------------------
                    // Validate foundation coordinates
                    // -----------------------------------------

                    if (
                            !CoordinateValidator.isValidCoordinate(
                                    foundation.getLatitude(),
                                    foundation.getLongitude()
                            )
                    ) {

                        return false;
                    }


                    // -----------------------------------------
                    // Foundation location
                    // -----------------------------------------

                    LocationRequest foundationLocation =
                            new LocationRequest(
                                    foundation.getLatitude(),
                                    foundation.getLongitude()
                            );


                    // -----------------------------------------
                    // Calculate distance
                    // -----------------------------------------

                    DistanceResponse distance =
                            locationService.calculateDistance(
                                    foundationLocation,
                                    donationLocation
                            );


                    // -----------------------------------------
                    // Configured radius check
                    // -----------------------------------------

                    return distance.withinAllowedRadius();

                })

                .toList();
    }
}