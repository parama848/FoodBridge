// package com.foodbridge.admin.service;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.foodbridge.admin.dto.response.AdminDonationResponse;
// import com.foodbridge.common.exception.DonationNotFoundException;
// import com.foodbridge.donation.entity.Donation;
// import com.foodbridge.donation.enums.DonationStatus;
// import com.foodbridge.donation.repository.DonationRepository;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class AdminDonationServiceImpl
//         implements AdminDonationService {


//     private final DonationRepository donationRepository;


//     // =========================================================
//     // GET DONATIONS
//     // =========================================================

//     @Override
//     public Page<AdminDonationResponse> getDonations(

//             String search,

//             String status,

//             Pageable pageable

//     ) {


//         // =====================================================
//         // NORMALIZE SEARCH
//         // =====================================================

//         String normalizedSearch =
//                 normalizeSearch(search);


//         // =====================================================
//         // PARSE STATUS
//         // =====================================================

//         DonationStatus parsedStatus =
//                 parseStatus(status);


//         Page<Donation> donations;


//         // =====================================================
//         // SEARCH + STATUS
//         // =====================================================

//         if (normalizedSearch != null
//                 && parsedStatus != null) {

//             donations =
//                     donationRepository
//                             .searchForAdminByStatus(

//                                     normalizedSearch,

//                                     parsedStatus,

//                                     pageable
//                             );
//         }


//         // =====================================================
//         // SEARCH ONLY
//         // =====================================================

//         else if (normalizedSearch != null) {

//             donations =
//                     donationRepository
//                             .searchForAdmin(

//                                     normalizedSearch,

//                                     pageable
//                             );
//         }


//         // =====================================================
//         // STATUS ONLY
//         // =====================================================

//         else if (parsedStatus != null) {

//             donations =
//                     donationRepository
//                             .findAllForAdminByStatus(

//                                     parsedStatus,

//                                     pageable
//                             );
//         }


//         // =====================================================
//         // ALL DONATIONS
//         // =====================================================

//         else {

//             donations =
//                     donationRepository
//                             .findAllForAdmin(

//                                     pageable
//                             );
//         }


//         // =====================================================
//         // ENTITY → DTO
//         // =====================================================

//         return donations.map(
//                 this::mapToResponse
//         );
//     }


//     // =========================================================
//     // GET DONATION BY ID
//     // =========================================================

//     @Override
//     public AdminDonationResponse getDonationById(

//             Long donationId

//     ) {


//         Donation donation =
//                 donationRepository
//                         .findAdminDonationById(
//                                 donationId
//                         )
//                         .orElseThrow(() ->
//                                 new DonationNotFoundException(
//                                         "Donation not found with id: "
//                                                 + donationId
//                                 )
//                         );


//         return mapToResponse(
//                 donation
//         );
//     }


//     // =========================================================
//     // NORMALIZE SEARCH
//     // =========================================================

//     private String normalizeSearch(

//             String search

//     ) {

//         if (search == null) {
//             return null;
//         }


//         String normalized =
//                 search.trim();


//         if (normalized.isEmpty()) {
//             return null;
//         }


//         return normalized;
//     }


//     // =========================================================
//     // PARSE STATUS
//     // =========================================================

//     private DonationStatus parseStatus(

//             String status

//     ) {

//         if (status == null
//                 || status.trim().isEmpty()) {

//             return null;
//         }


//         try {

//             return DonationStatus.valueOf(
//                     status
//                             .trim()
//                             .toUpperCase()
//             );

//         } catch (IllegalArgumentException exception) {

//             throw new IllegalArgumentException(
//                     "Invalid donation status: "
//                             + status
//             );
//         }
//     }


//     // =========================================================
//     // ENTITY → RESPONSE
//     // =========================================================

//     private AdminDonationResponse mapToResponse(

//             Donation donation

//     ) {


//         // =====================================================
//         // DONOR
//         // =====================================================

//         Long donorId = null;

//         String donorName = null;

//         String donorEmail = null;


//         if (donation.getDonor() != null) {

//             donorId =
//                     donation
//                             .getDonor()
//                             .getId();

//             donorName =
//                     donation
//                             .getDonor()
//                             .getName();

//             donorEmail =
//                     donation
//                             .getDonor()
//                             .getEmail();
//         }


//         // =====================================================
//         // FOUNDATION
//         // =====================================================

//         Long foundationId = null;

//         String foundationName = null;


//         if (donation.getAcceptedFoundation()
//                 != null) {

//             foundationId =
//                     donation
//                             .getAcceptedFoundation()
//                             .getId();

//             foundationName =
//                     donation
//                             .getAcceptedFoundation()
//                             .getOrganizationName();
//         }


//         // =====================================================
//         // RESPONSE
//         // =====================================================

//         return new AdminDonationResponse(

//                 donation.getId(),

//                 // Donor
//                 donorId,
//                 donorName,
//                 donorEmail,

//                 // Food
//                 donation.getFoodName(),
//                 donation.getFoodType(),
//                 donation.getQuantity(),
//                 donation.getQuantityUnit(),

//                 // Time
//                 donation.getPreparedAt(),
//                 donation.getExpiresAt(),

//                 // Location
//                 donation.getPickupAddress(),
//                 donation.getLatitude(),
//                 donation.getLongitude(),

//                 // Status
//                 donation.getStatus(),

//                 // Foundation
//                 foundationId,
//                 foundationName,

//                 // Timestamps
//                 donation.getCreatedAt(),
//                 donation.getUpdatedAt()
//         );
//     }
// }


package com.foodbridge.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.admin.dto.response.AdminDonationResponse;
import com.foodbridge.common.exception.DonationNotFoundException;
import com.foodbridge.donation.entity.Donation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.DonationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDonationServiceImpl
        implements AdminDonationService {

    private final DonationRepository donationRepository;

    // =========================================================
    // GET DONATIONS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public Page<AdminDonationResponse> getDonations(
            String search,
            String status,
            Pageable pageable
    ) {

        // =====================================================
        // NORMALIZE SEARCH
        // =====================================================

        String normalizedSearch =
                normalizeSearch(search);

        // =====================================================
        // PARSE STATUS
        // =====================================================

        DonationStatus parsedStatus =
                parseStatus(status);

        Page<Donation> donations;

        // =====================================================
        // SEARCH + STATUS
        // =====================================================

        if (normalizedSearch != null
                && parsedStatus != null) {

            donations =
                    donationRepository
                            .searchForAdminByStatus(
                                    normalizedSearch,
                                    parsedStatus,
                                    pageable
                            );
        }

        // =====================================================
        // SEARCH ONLY
        // =====================================================

        else if (normalizedSearch != null) {

            donations =
                    donationRepository
                            .searchForAdmin(
                                    normalizedSearch,
                                    pageable
                            );
        }

        // =====================================================
        // STATUS ONLY
        // =====================================================

        else if (parsedStatus != null) {

            donations =
                    donationRepository
                            .findAllForAdminByStatus(
                                    parsedStatus,
                                    pageable
                            );
        }

        // =====================================================
        // ALL DONATIONS
        // =====================================================

        else {

            donations =
                    donationRepository
                            .findAllForAdmin(
                                    pageable
                            );
        }

        // =====================================================
        // ENTITY → DTO
        // =====================================================

        return donations.map(
                this::mapToResponse
        );
    }

    // =========================================================
    // GET DONATION BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public AdminDonationResponse getDonationById(
            Long donationId
    ) {

        Donation donation =
                donationRepository
                        .findAdminDonationById(
                                donationId
                        )
                        .orElseThrow(() ->
                                new DonationNotFoundException(
                                        "Donation not found with id: "
                                                + donationId
                                )
                        );

        return mapToResponse(
                donation
        );
    }

    // =========================================================
    // NORMALIZE SEARCH
    // =========================================================

    private String normalizeSearch(
            String search
    ) {

        if (search == null) {
            return null;
        }

        String normalized =
                search.trim();

        if (normalized.isEmpty()) {
            return null;
        }

        return normalized;
    }

    // =========================================================
    // PARSE STATUS
    // =========================================================

    private DonationStatus parseStatus(
            String status
    ) {

        if (status == null
                || status.trim().isEmpty()) {

            return null;
        }

        try {

            return DonationStatus.valueOf(
                    status
                            .trim()
                            .toUpperCase()
            );

        } catch (IllegalArgumentException exception) {

            throw new IllegalArgumentException(
                    "Invalid donation status: "
                            + status
            );
        }
    }

    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private AdminDonationResponse mapToResponse(
            Donation donation
    ) {

        // =====================================================
        // DONOR
        // =====================================================

        Long donorId = null;

        String donorName = null;

        String donorEmail = null;

        if (donation.getDonor() != null) {

            donorId =
                    donation
                            .getDonor()
                            .getId();

            donorName =
                    donation
                            .getDonor()
                            .getName();

            donorEmail =
                    donation
                            .getDonor()
                            .getEmail();
        }

        // =====================================================
        // FOUNDATION
        // =====================================================

        Long foundationId = null;

        String foundationName = null;

        if (donation.getAcceptedFoundation()
                != null) {

            foundationId =
                    donation
                            .getAcceptedFoundation()
                            .getId();

            foundationName =
                    donation
                            .getAcceptedFoundation()
                            .getOrganizationName();
        }

        // =====================================================
        // RESPONSE
        // =====================================================

        return new AdminDonationResponse(

                donation.getId(),

                // Donor
                donorId,
                donorName,
                donorEmail,

                // Food
                donation.getFoodName(),
                donation.getFoodType(),
                donation.getQuantity(),
                donation.getQuantityUnit(),

                // Time
                donation.getPreparedAt(),
                donation.getExpiresAt(),

                // Location
                donation.getPickupAddress(),
                donation.getLatitude(),
                donation.getLongitude(),

                // Status
                donation.getStatus(),

                // Foundation
                foundationId,
                foundationName,

                // Timestamps
                donation.getCreatedAt(),
                donation.getUpdatedAt()
        );
    }
 }