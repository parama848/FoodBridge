package com.foodbridge.admin.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.common.exception.FoundationNotFoundException;
import com.foodbridge.common.exception.InvalidFoundationStatusException;
import com.foodbridge.common.exception.RejectionReasonRequiredException;
import com.foodbridge.foundation.dto.response.FoundationResponse;
import com.foodbridge.foundation.entity.Foundation;
import com.foodbridge.foundation.entity.VerificationStatus;
import com.foodbridge.foundation.repository.FoundationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminFoundationServiceImpl
        implements AdminFoundationService {


    private final FoundationRepository foundationRepository;


    // =========================================================
    // GET ALL PENDING FOUNDATIONS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<FoundationResponse> getPendingFoundations() {

        return foundationRepository
                .findByVerificationStatus(
                        VerificationStatus.PENDING
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET FOUNDATION BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public FoundationResponse getFoundationById(
            Long foundationId
    ) {

        Foundation foundation =
                findFoundation(foundationId);

        return mapToResponse(foundation);
    }


    // =========================================================
    // APPROVE FOUNDATION
    // =========================================================

    @Override
    public FoundationResponse approveFoundation(
            Long foundationId
    ) {

        Foundation foundation =
                findFoundation(foundationId);


        // -----------------------------------------------------
        // Only PENDING foundations can be approved
        // -----------------------------------------------------

        if (foundation.getVerificationStatus()
                != VerificationStatus.PENDING) {

            throw new InvalidFoundationStatusException(
                    "Only pending foundations can be approved"
            );
        }


        // -----------------------------------------------------
        // Approve foundation
        // -----------------------------------------------------

        foundation.setVerificationStatus(
                VerificationStatus.VERIFIED
        );

        foundation.setVerifiedAt(
                LocalDateTime.now()
        );

        foundation.setRejectionReason(null);


        // -----------------------------------------------------
        // Save
        // -----------------------------------------------------

        Foundation savedFoundation =
                foundationRepository.save(foundation);

        return mapToResponse(savedFoundation);
    }


    // =========================================================
    // REJECT FOUNDATION
    // =========================================================

    @Override
    public FoundationResponse rejectFoundation(
            Long foundationId,
            String rejectionReason
    ) {

        Foundation foundation =
                findFoundation(foundationId);


        // -----------------------------------------------------
        // Only PENDING foundations can be rejected
        // -----------------------------------------------------

        if (foundation.getVerificationStatus()
                != VerificationStatus.PENDING) {

            throw new InvalidFoundationStatusException(
                    "Only pending foundations can be rejected"
            );
        }


        // -----------------------------------------------------
        // Validate rejection reason
        // -----------------------------------------------------

        if (rejectionReason == null
                || rejectionReason.isBlank()) {

            throw new RejectionReasonRequiredException(
                    "Rejection reason is required"
            );
        }


        // -----------------------------------------------------
        // Reject foundation
        // -----------------------------------------------------

        foundation.setVerificationStatus(
                VerificationStatus.REJECTED
        );

        foundation.setRejectionReason(
                rejectionReason.trim()
        );

        foundation.setVerifiedAt(null);


        // -----------------------------------------------------
        // Save
        // -----------------------------------------------------

        Foundation savedFoundation =
                foundationRepository.save(foundation);

        return mapToResponse(savedFoundation);
    }


    // =========================================================
    // FIND FOUNDATION
    // =========================================================

    private Foundation findFoundation(
            Long foundationId
    ) {

        return foundationRepository
                .findById(foundationId)
                .orElseThrow(() ->
                        new FoundationNotFoundException(
                                "Foundation not found with id: "
                                        + foundationId
                        )
                );
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private FoundationResponse mapToResponse(
            Foundation foundation
    ) {

       return new FoundationResponse(

        // Foundation ID
        foundation.getId(),

        // User ID
        foundation.getUser().getId(),

        // Foundation details
        foundation.getOrganizationName(),

        foundation.getRegistrationNumber(),

        // User phone
        foundation.getUser().getPhone(),

        foundation.getAddress(),

        foundation.getCity(),

        foundation.getState(),

        foundation.getPincode(),

        // Location
        foundation.getLatitude(),

        foundation.getLongitude(),

        // Verification
        foundation.getVerificationStatus(),

        foundation.getRejectionReason(),

        foundation.getVerifiedAt(),

        // Created
        foundation.getCreatedAt()
);
    }
}