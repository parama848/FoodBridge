package com.foodbridge.donation.controller;

import com.foodbridge.common.response.ApiResponse;

import com.foodbridge.donation.dto.request.CreateDonationRequest;
import com.foodbridge.donation.dto.request.UpdateDonationRequest;
import com.foodbridge.donation.dto.response.DonationResponse;

import com.foodbridge.donation.service.DonationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {


    private final DonationService donationService;


    // =========================================================
    // GET AVAILABLE DONATIONS FOR FOUNDATION
    // =========================================================

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<DonationResponse>>> getAvailableDonations(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        List<DonationResponse> response =
                donationService.getAvailableDonations(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Available donations retrieved successfully",
                        response
                )
        );
    }


    // =========================================================
    // GET MY DONATIONS
    // =========================================================

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<DonationResponse>>> getMyDonations(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        List<DonationResponse> response =
                donationService.getMyDonations(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "My donations retrieved successfully",
                        response
                )
        );
    }


    // =========================================================
    // GET DONATION BY ID
    // =========================================================

    @GetMapping("/{donationId}")
    public ResponseEntity<ApiResponse<DonationResponse>> getDonationById(

            Authentication authentication,

            @PathVariable
            Long donationId

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.getDonationById(
                        email,
                        donationId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Donation retrieved successfully",
                        response
                )
        );
    }


    // =========================================================
    // CREATE DONATION
    // =========================================================

    @PostMapping
    public ResponseEntity<ApiResponse<DonationResponse>> createDonation(

            Authentication authentication,

            @Valid
            @RequestBody
            CreateDonationRequest request

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.createDonation(
                        email,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Donation created successfully",
                                response
                        )
                );
    }

    // =========================================================
// ACCEPT DONATION
// POST /api/donations/{donationId}/accept
// =========================================================

    @PostMapping("/{donationId}/accept")
    public ResponseEntity<ApiResponse<DonationResponse>> acceptDonation(

            Authentication authentication,

            @PathVariable Long donationId

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.acceptDonation(
                        email,
                        donationId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Donation accepted successfully",
                        response
                )
        );
    }

    @GetMapping("/foundation/my")
    public ResponseEntity<ApiResponse<List<DonationResponse>>> getMyFoundationDonations(
            Authentication authentication
    ) {

        String email = authentication.getName();

        List<DonationResponse> response =
                donationService.getMyFoundationDonations(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation donations retrieved successfully",
                        response
                )
        );
    }

    // =========================================================
// MARK DONATION AS PICKED UP
// PUT /api/donations/{donationId}/pickup
// =========================================================

    @PutMapping("/{donationId}/pickup")
    public ResponseEntity<ApiResponse<DonationResponse>> markAsPickedUp(

            Authentication authentication,

            @PathVariable Long donationId

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.markAsPickedUp(
                        email,
                        donationId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Donation marked as picked up successfully",
                        response
                )
        );
    }


    // =========================================================
// MARK DONATION AS DELIVERED
// PUT /api/donations/{donationId}/deliver
// =========================================================

    @PutMapping("/{donationId}/deliver")
    public ResponseEntity<ApiResponse<DonationResponse>> markAsDelivered(

            Authentication authentication,

            @PathVariable Long donationId

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.markAsDelivered(
                        email,
                        donationId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Donation marked as delivered successfully",
                        response
                )
        );
    }

    // =========================================================
    // UPDATE DONATION
    // =========================================================

    @PutMapping("/{donationId}")
    public ResponseEntity<ApiResponse<DonationResponse>> updateDonation(

            Authentication authentication,

            @PathVariable
            Long donationId,

            @Valid
            @RequestBody
            UpdateDonationRequest request

    ) {

        String email =
                authentication.getName();

        DonationResponse response =
                donationService.updateDonation(
                        email,
                        donationId,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Donation updated successfully",
                        response
                )
        );
    }
}