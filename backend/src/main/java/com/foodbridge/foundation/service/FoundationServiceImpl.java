// package com.foodbridge.foundation.service;

// import com.foodbridge.auth.entity.Role;
// import com.foodbridge.auth.entity.User;
// import com.foodbridge.auth.repository.UserRepository;

// import com.foodbridge.common.exception.DuplicateFoundationException;
// import com.foodbridge.common.exception.UserNotFoundException;
// import com.foodbridge.common.exception.FoundationNotFoundException;

// import com.foodbridge.foundation.dto.request.CreateFoundationRequest;
// import com.foodbridge.foundation.dto.request.UpdateFoundationRequest;
// import com.foodbridge.foundation.dto.response.FoundationResponse;
// import com.foodbridge.foundation.entity.Foundation;
// import com.foodbridge.foundation.entity.VerificationStatus;
// import com.foodbridge.foundation.repository.FoundationRepository;
// import com.foodbridge.common.exception.AccessDeniedException;

// import lombok.RequiredArgsConstructor;

// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class FoundationServiceImpl implements FoundationService {

//     private final FoundationRepository foundationRepository;
//     private final UserRepository userRepository;

//     // =========================================================
//     // CREATE FOUNDATION
//     // =========================================================

//     @Override
//     public FoundationResponse createFoundation(
//             String email,
//             CreateFoundationRequest request
//     ) {

//         User user = getFoundationUser(email);

//         // -----------------------------------------------------
//         // Prevent duplicate foundation profile
//         // -----------------------------------------------------

//         if (foundationRepository.existsByUserId(user.getId())) {

//             throw new DuplicateFoundationException(
//                     "Foundation profile already exists for this user"
//             );
//         }

//         // -----------------------------------------------------
//         // Normalize registration number
//         // -----------------------------------------------------

//         String registrationNumber =
//                 request.registrationNumber()
//                         .trim()
//                         .toUpperCase();

//         // -----------------------------------------------------
//         // Prevent duplicate registration number
//         // -----------------------------------------------------

//         if (foundationRepository
//                 .existsByRegistrationNumber(registrationNumber)) {

//             throw new DuplicateFoundationException(
//                     "Registration number already registered"
//             );
//         }

//         // -----------------------------------------------------
//         // Create foundation
//         // -----------------------------------------------------

//         Foundation foundation = new Foundation();

//         foundation.setUser(user);

//         foundation.setOrganizationName(
//                 request.organizationName().trim()
//         );

//         foundation.setRegistrationNumber(
//                 registrationNumber
//         );

//         foundation.setAddress(
//                 request.address().trim()
//         );

//         foundation.setCity(
//                 request.city().trim()
//         );

//         foundation.setState(
//                 request.state().trim()
//         );

//         foundation.setPincode(
//                 request.pincode().trim()
//         );

//         foundation.setLatitude(
//                 request.latitude()
//         );

//         foundation.setLongitude(
//                 request.longitude()
//         );

//         // -----------------------------------------------------
//         // Initial verification status
//         // -----------------------------------------------------

//         foundation.setVerificationStatus(
//                 VerificationStatus.PENDING
//         );

//         // -----------------------------------------------------
//         // Save
//         // -----------------------------------------------------

//         Foundation savedFoundation =
//                 foundationRepository.save(foundation);

//         return mapToResponse(savedFoundation);
//     }

//     // =========================================================
//     // GET MY FOUNDATION
//     // =========================================================

//     @Override
//     public FoundationResponse getMyFoundation(
//             String email
//     ) {

//         User user = getFoundationUser(email);

//         Foundation foundation =
//                 foundationRepository
//                         .findByUserId(user.getId())
//                         .orElseThrow(() ->
//                                 new FoundationNotFoundException(
//                                         "Foundation profile not found"
//                                 )
//                         );

//         return mapToResponse(foundation);
//     }

//     // =========================================================
//     // UPDATE MY FOUNDATION
//     // =========================================================

//     @Override
//     public FoundationResponse updateMyFoundation(
//             String email,
//             UpdateFoundationRequest request
//     ) {

//         User user = getFoundationUser(email);

//         Foundation foundation =
//                 foundationRepository
//                         .findByUserId(user.getId())
//                         .orElseThrow(() ->
//                                 new FoundationNotFoundException(
//                                         "Foundation profile not found"
//                                 )
//                         );

//         // -----------------------------------------------------
//         // Update allowed fields
//         // -----------------------------------------------------

//         foundation.setOrganizationName(
//                 request.organizationName().trim()
//         );

//         foundation.setAddress(
//                 request.address().trim()
//         );

//         foundation.setCity(
//                 request.city().trim()
//         );

//         foundation.setState(
//                 request.state().trim()
//         );

//         foundation.setPincode(
//                 request.pincode().trim()
//         );

//         foundation.setLatitude(
//                 request.latitude()
//         );

//         foundation.setLongitude(
//                 request.longitude()
//         );

//         // =====================================================
//         // RE-VERIFICATION RULE
//         // =====================================================
//         //
//         // VERIFIED  → update → PENDING
//         // REJECTED  → update → PENDING
//         // PENDING   → update → PENDING
//         //
//         // Any profile update requires admin verification again.
//         // =====================================================

//         if (foundation.getVerificationStatus()
//                 == VerificationStatus.VERIFIED
//                 || foundation.getVerificationStatus()
//                 == VerificationStatus.REJECTED) {

//             foundation.setVerificationStatus(
//                     VerificationStatus.PENDING
//             );

//             foundation.setRejectionReason(null);
//             foundation.setVerifiedAt(null);
//         }

//         // -----------------------------------------------------
//         // Save
//         // -----------------------------------------------------

//         Foundation updatedFoundation =
//                 foundationRepository.save(foundation);

//         return mapToResponse(updatedFoundation);
//     }

//     // =========================================================
//     // FIND AUTHENTICATED FOUNDATION USER
//     // =========================================================

//     private User getFoundationUser(String email) {

//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() ->
//                         new UserNotFoundException(
//                                 "Authenticated user not found"
//                         )
//                 );

//         // -----------------------------------------------------
//         // Role validation
//         // -----------------------------------------------------

//         if (user.getRole() != Role.FOUNDATION) {

//             throw new AccessDeniedException(
//                     "Only foundation users can access foundation operations"
//             );
//         }

//         return user;
//     }

//     // =========================================================
//     // ENTITY → RESPONSE
//     // =========================================================

//     private FoundationResponse mapToResponse(
//             Foundation foundation
//     ) {

//         return new FoundationResponse(
//                 foundation.getId(),
//                 foundation.getUser().getId(),
//                 foundation.getOrganizationName(),
//                 foundation.getRegistrationNumber(),
//                 foundation.getAddress(),
//                 foundation.getCity(),
//                 foundation.getState(),
//                 foundation.getPincode(),
//                 foundation.getLatitude(),
//                 foundation.getLongitude(),
//                 foundation.getVerificationStatus(),
//                 foundation.getRejectionReason(),
//                 foundation.getVerifiedAt(),
//                 foundation.getCreatedAt()
//         );
//     }
// }

package com.foodbridge.foundation.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.auth.entity.Role;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;
import com.foodbridge.common.exception.AccessDeniedException;
import com.foodbridge.common.exception.DuplicateFoundationException;
import com.foodbridge.common.exception.FoundationNotFoundException;
import com.foodbridge.common.exception.UserNotFoundException;
import com.foodbridge.foundation.dto.request.CreateFoundationRequest;
import com.foodbridge.foundation.dto.request.UpdateFoundationRequest;
import com.foodbridge.foundation.dto.response.FoundationResponse;
import com.foodbridge.foundation.entity.Foundation;
import com.foodbridge.foundation.entity.VerificationStatus;
import com.foodbridge.foundation.repository.FoundationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FoundationServiceImpl implements FoundationService {

        private final FoundationRepository foundationRepository;
        private final UserRepository userRepository;

        // =========================================================
        // CREATE FOUNDATION
        // =========================================================

        @Override
        public FoundationResponse createFoundation(
                        String email,
                        CreateFoundationRequest request) {

                User user = getFoundationUser(email);

                // -----------------------------------------------------
                // Prevent duplicate foundation profile
                // -----------------------------------------------------

                if (foundationRepository.existsByUserId(user.getId())) {

                        throw new DuplicateFoundationException(
                                        "Foundation profile already exists for this user");
                }

                // -----------------------------------------------------
                // Normalize registration number
                // -----------------------------------------------------

                String registrationNumber = request.registrationNumber()
                                .trim()
                                .toUpperCase();

                // -----------------------------------------------------
                // Prevent duplicate registration number
                // -----------------------------------------------------

                if (foundationRepository
                                .existsByRegistrationNumber(registrationNumber)) {

                        throw new DuplicateFoundationException(
                                        "Registration number already registered");
                }

                // -----------------------------------------------------
                // Create foundation
                // -----------------------------------------------------

                Foundation foundation = new Foundation();

                foundation.setUser(user);

                foundation.setOrganizationName(
                                request.organizationName().trim());

                foundation.setRegistrationNumber(
                                registrationNumber);

                foundation.setAddress(
                                request.address().trim());

                foundation.setCity(
                                request.city().trim());

                foundation.setState(
                                request.state().trim());

                foundation.setPincode(
                                request.pincode().trim());

                foundation.setLatitude(
                                request.latitude());

                foundation.setLongitude(
                                request.longitude());

                // -----------------------------------------------------
                // Initial verification status
                // -----------------------------------------------------

                foundation.setVerificationStatus(
                                VerificationStatus.PENDING);

                // -----------------------------------------------------
                // Save
                // -----------------------------------------------------

                Foundation savedFoundation = foundationRepository.save(foundation);

                return mapToResponse(savedFoundation);
        }

        // =========================================================
        // GET MY FOUNDATION
        // =========================================================

        @Override
        @Transactional(readOnly = true)
        public FoundationResponse getMyFoundation(
                        String email) {

                User user = getFoundationUser(email);

                Foundation foundation = foundationRepository
                                .findByUserId(user.getId())
                                .orElseThrow(() -> new FoundationNotFoundException(
                                                "Foundation profile not found"));

                return mapToResponse(foundation);
        }

        // =========================================================
        // UPDATE MY FOUNDATION
        // =========================================================

        @Override
        public FoundationResponse updateMyFoundation(
                        String email,
                        UpdateFoundationRequest request) {

                User user = getFoundationUser(email);

                Foundation foundation = foundationRepository
                                .findByUserId(user.getId())
                                .orElseThrow(() -> new FoundationNotFoundException(
                                                "Foundation profile not found"));

                // =====================================================
                // UPDATE USER PHONE
                // =====================================================

                String newPhone = request.phone().trim();

                user.setPhone(newPhone);

                userRepository.save(user);

                // =====================================================
                // UPDATE FOUNDATION DETAILS
                // =====================================================

                foundation.setOrganizationName(
                                request.organizationName().trim());

                foundation.setAddress(
                                request.address().trim());

                foundation.setCity(
                                request.city().trim());

                foundation.setState(
                                request.state().trim());

                foundation.setPincode(
                                request.pincode().trim());

                foundation.setLatitude(
                                request.latitude());

                foundation.setLongitude(
                                request.longitude());

                // =====================================================
                // RE-VERIFICATION RULE
                // =====================================================
                //
                // VERIFIED → update → PENDING
                // REJECTED → update → PENDING
                // PENDING → update → PENDING
                //
                // Any profile modification requires admin
                // verification again.
                // =====================================================

                if (foundation.getVerificationStatus() == VerificationStatus.VERIFIED
                                || foundation.getVerificationStatus() == VerificationStatus.REJECTED) {

                        foundation.setVerificationStatus(
                                        VerificationStatus.PENDING);

                        foundation.setRejectionReason(null);

                        foundation.setVerifiedAt(null);
                }

                // -----------------------------------------------------
                // Save foundation
                // -----------------------------------------------------

                Foundation updatedFoundation = foundationRepository.save(foundation);

                return mapToResponse(updatedFoundation);
        }

        // =========================================================
        // FIND AUTHENTICATED FOUNDATION USER
        // =========================================================

        private User getFoundationUser(String email) {

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UserNotFoundException(
                                                "Authenticated user not found"));

                // -----------------------------------------------------
                // Role validation
                // -----------------------------------------------------

                if (user.getRole() != Role.FOUNDATION) {

                        throw new AccessDeniedException(
                                        "Only foundation users can access foundation operations");
                }

                return user;
        }

        // =========================================================
        // ENTITY → RESPONSE
        // =========================================================

        private FoundationResponse mapToResponse(
                        Foundation foundation) {

                User user = foundation.getUser();

                return new FoundationResponse(
                                foundation.getId(),
                                foundation.getUser().getId(),

                                foundation.getOrganizationName(),

                                foundation.getRegistrationNumber(),

                                // NEW
                                foundation.getUser().getPhone(),

                                foundation.getAddress(),

                                foundation.getCity(),

                                foundation.getState(),

                                foundation.getPincode(),

                                foundation.getLatitude(),

                                foundation.getLongitude(),

                                foundation.getVerificationStatus(),

                                foundation.getRejectionReason(),

                                foundation.getVerifiedAt(),

                                foundation.getCreatedAt());
        }
}