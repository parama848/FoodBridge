//package com.foodbridge.donation.service;
//
//import com.foodbridge.auth.entity.Role;
//import com.foodbridge.auth.entity.User;
//import com.foodbridge.auth.repository.UserRepository;
//
//import com.foodbridge.common.exception.DonationNotFoundException;
//import com.foodbridge.common.exception.FoundationNotFoundException;
//import com.foodbridge.common.exception.InvalidDonationStatusException;
//import com.foodbridge.common.exception.UserNotFoundException;
//
//import com.foodbridge.donation.dto.request.CreateDonationRequest;
//import com.foodbridge.donation.dto.request.UpdateDonationRequest;
//import com.foodbridge.donation.dto.response.DonationResponse;
//
//import com.foodbridge.donation.entity.Donation;
//import com.foodbridge.donation.enums.DonationStatus;
//import com.foodbridge.donation.repository.DonationRepository;
//
//import com.foodbridge.foundation.entity.Foundation;
//import com.foodbridge.foundation.entity.VerificationStatus;
//import com.foodbridge.foundation.repository.FoundationRepository;
//
//import com.foodbridge.location.dto.request.LocationRequest;
//import com.foodbridge.location.dto.response.DistanceResponse;
//import com.foodbridge.location.service.LocationService;
//import com.foodbridge.location.util.CoordinateValidator;
//
//import com.foodbridge.notification.enums.NotificationType;
//import com.foodbridge.notification.service.NotificationService;
//
//import com.foodbridge.foundation.service.NearbyFoundationService;
//
//import lombok.RequiredArgsConstructor;
//
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class DonationServiceImpl
//        implements DonationService {
//
//
//    private final DonationRepository donationRepository;
//
//    private final UserRepository userRepository;
//
//    private final FoundationRepository foundationRepository;
//
//    private final LocationService locationService;
//
//    private final NotificationService notificationService;
//
//    private final NearbyFoundationService nearbyFoundationService;
//
//
//    // =========================================================
//    // MARK DONATION AS PICKED UP
//    // =========================================================
//
//    @Override
//    public DonationResponse markAsPickedUp(
//            String email,
//            Long donationId
//    ) {
//
//        // -----------------------------------------------------
//        // Find authenticated foundation user
//        // -----------------------------------------------------
//
//        User foundationUser =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify FOUNDATION role
//        // -----------------------------------------------------
//
//        if (foundationUser.getRole()
//                != Role.FOUNDATION) {
//
//            throw new AccessDeniedException(
//                    "Only foundation users can pick up donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find foundation profile
//        // -----------------------------------------------------
//
//        Foundation foundation =
//                foundationRepository
//                        .findByUserId(
//                                foundationUser.getId()
//                        )
//                        .orElseThrow(() ->
//                                new FoundationNotFoundException(
//                                        "Foundation profile not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Foundation must be VERIFIED
//        // -----------------------------------------------------
//
//        if (foundation.getVerificationStatus()
//                != VerificationStatus.VERIFIED) {
//
//            throw new AccessDeniedException(
//                    "Only verified foundations can pick up donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                donationRepository.findById(donationId)
//                        .orElseThrow(() ->
//                                new DonationNotFoundException(
//                                        "Donation not found with id: "
//                                                + donationId
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Donation must be ACCEPTED
//        // -----------------------------------------------------
//
//        if (donation.getStatus()
//                != DonationStatus.ACCEPTED) {
//
//            throw new InvalidDonationStatusException(
//                    "Only accepted donations can be picked up"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Verify accepted foundation
//        // -----------------------------------------------------
//
//        if (
//                donation.getAcceptedFoundation() == null
//                        ||
//                        !donation.getAcceptedFoundation()
//                                .getId()
//                                .equals(foundation.getId())
//        ) {
//
//            throw new AccessDeniedException(
//                    "Only the accepted foundation can pick up this donation"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Mark as PICKED_UP
//        // -----------------------------------------------------
//
//        donation.setStatus(
//                DonationStatus.PICKED_UP
//        );
//
//
//        // -----------------------------------------------------
//        // Save
//        // -----------------------------------------------------
//
//        Donation savedDonation =
//                donationRepository.save(donation);
//
//
//        // =====================================================
//        // NOTIFY DONOR
//        // =====================================================
//
//        notificationService.createNotification(
//
//                donation.getDonor(),
//
//                "Donation Picked Up",
//
//                "Your food donation has been picked up by "
//                        + foundation.getOrganizationName()
//                        + ".",
//
//                NotificationType.DONATION_PICKED_UP,
//
//                donation.getId()
//        );
//
//
//        return mapToResponse(savedDonation);
//    }
//
//
//    // =========================================================
//    // MARK DONATION AS DELIVERED
//    // =========================================================
//
//    @Override
//    public DonationResponse markAsDelivered(
//            String email,
//            Long donationId
//    ) {
//
//        // -----------------------------------------------------
//        // Find authenticated foundation user
//        // -----------------------------------------------------
//
//        User foundationUser =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify FOUNDATION role
//        // -----------------------------------------------------
//
//        if (foundationUser.getRole()
//                != Role.FOUNDATION) {
//
//            throw new AccessDeniedException(
//                    "Only foundation users can mark donations as delivered"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find foundation profile
//        // -----------------------------------------------------
//
//        Foundation foundation =
//                foundationRepository
//                        .findByUserId(
//                                foundationUser.getId()
//                        )
//                        .orElseThrow(() ->
//                                new FoundationNotFoundException(
//                                        "Foundation profile not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Foundation must be VERIFIED
//        // -----------------------------------------------------
//
//        if (foundation.getVerificationStatus()
//                != VerificationStatus.VERIFIED) {
//
//            throw new AccessDeniedException(
//                    "Only verified foundations can mark donations as delivered"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                donationRepository.findById(donationId)
//                        .orElseThrow(() ->
//                                new DonationNotFoundException(
//                                        "Donation not found with id: "
//                                                + donationId
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Donation must be PICKED_UP
//        // -----------------------------------------------------
//
//        if (donation.getStatus()
//                != DonationStatus.PICKED_UP) {
//
//            throw new InvalidDonationStatusException(
//                    "Only picked up donations can be marked as delivered"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Verify accepted foundation
//        // -----------------------------------------------------
//
//        if (
//                donation.getAcceptedFoundation() == null
//                        ||
//                        !donation.getAcceptedFoundation()
//                                .getId()
//                                .equals(foundation.getId())
//        ) {
//
//            throw new AccessDeniedException(
//                    "Only the accepted foundation can mark this donation as delivered"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Mark as DELIVERED
//        // -----------------------------------------------------
//
//        donation.setStatus(
//                DonationStatus.DELIVERED
//        );
//
//
//        // -----------------------------------------------------
//        // Save
//        // -----------------------------------------------------
//
//        Donation savedDonation =
//                donationRepository.save(donation);
//
//
//        // =====================================================
//        // NOTIFY DONOR
//        // =====================================================
//
//        notificationService.createNotification(
//
//                donation.getDonor(),
//
//                "Donation Delivered",
//
//                "Your food donation has been successfully delivered by "
//                        + foundation.getOrganizationName()
//                        + ".",
//
//                NotificationType.DONATION_DELIVERED,
//
//                donation.getId()
//        );
//
//
//        return mapToResponse(savedDonation);
//    }
//
//
//    // =========================================================
//    // GET MY DONATIONS - FOUNDATION
//    // =========================================================
//
//    @Override
//    public List<DonationResponse> getMyFoundationDonations(
//            String email
//    ) {
//
//        // -----------------------------------------------------
//        // Find authenticated user
//        // -----------------------------------------------------
//
//        User foundationUser =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify FOUNDATION role
//        // -----------------------------------------------------
//
//        if (foundationUser.getRole()
//                != Role.FOUNDATION) {
//
//            throw new AccessDeniedException(
//                    "Only foundation users can view foundation donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find foundation profile
//        // -----------------------------------------------------
//
//        Foundation foundation =
//                foundationRepository
//                        .findByUserId(
//                                foundationUser.getId()
//                        )
//                        .orElseThrow(() ->
//                                new FoundationNotFoundException(
//                                        "Foundation profile not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Foundation must be VERIFIED
//        // -----------------------------------------------------
//
//        if (foundation.getVerificationStatus()
//                != VerificationStatus.VERIFIED) {
//
//            throw new AccessDeniedException(
//                    "Only verified foundations can view foundation donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Get donations accepted by this foundation
//        // -----------------------------------------------------
//
//        return donationRepository
//                .findByAcceptedFoundationId(
//                        foundation.getId()
//                )
//                .stream()
//                .map(this::mapToResponse)
//                .toList();
//    }
//
//
//    // =========================================================
//    // ACCEPT DONATION
//    // =========================================================
//
//    @Override
//    public DonationResponse acceptDonation(
//            String email,
//            Long donationId
//    ) {
//
//        // -----------------------------------------------------
//        // Find authenticated user
//        // -----------------------------------------------------
//
//        User foundationUser =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify FOUNDATION role
//        // -----------------------------------------------------
//
//        if (foundationUser.getRole()
//                != Role.FOUNDATION) {
//
//            throw new AccessDeniedException(
//                    "Only foundation users can accept donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find foundation profile
//        // -----------------------------------------------------
//
//        Foundation foundation =
//                foundationRepository
//                        .findByUserId(
//                                foundationUser.getId()
//                        )
//                        .orElseThrow(() ->
//                                new FoundationNotFoundException(
//                                        "Foundation profile not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Foundation must be VERIFIED
//        // -----------------------------------------------------
//
//        if (foundation.getVerificationStatus()
//                != VerificationStatus.VERIFIED) {
//
//            throw new AccessDeniedException(
//                    "Only verified foundations can accept donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                donationRepository.findById(donationId)
//                        .orElseThrow(() ->
//                                new DonationNotFoundException(
//                                        "Donation not found with id: "
//                                                + donationId
//                                )
//                        );
//
//
//        // =====================================================
//        // CHECK FOOD EXPIRY
//        // =====================================================
//
//        if (donation.getExpiresAt() == null) {
//
//            throw new InvalidDonationStatusException(
//                    "Donation expiry time is missing"
//            );
//        }
//
//
//        if (!donation.getExpiresAt()
//                .isAfter(LocalDateTime.now())) {
//
//            // -------------------------------------------------
//            // Automatically mark expired
//            // -------------------------------------------------
//
//            donation.setStatus(
//                    DonationStatus.EXPIRED
//            );
//
//            donationRepository.save(donation);
//
//
//            // -------------------------------------------------
//            // Notify donor about expiry
//            // -------------------------------------------------
//
//            notificationService.createNotification(
//
//                    donation.getDonor(),
//
//                    "Donation Expired",
//
//                    "Your food donation "
//                            + donation.getFoodName()
//                            + " has expired and can no longer be accepted.",
//
//                    NotificationType.DONATION_EXPIRED,
//
//                    donation.getId()
//            );
//
//
//            throw new InvalidDonationStatusException(
//                    "Donation has expired and cannot be accepted"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Donation must be AVAILABLE
//        // -----------------------------------------------------
//
//        if (donation.getStatus()
//                != DonationStatus.AVAILABLE) {
//
//            throw new InvalidDonationStatusException(
//                    "Only available donations can be accepted"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Validate donation coordinates
//        // -----------------------------------------------------
//
//        validateCoordinates(
//                donation.getLatitude(),
//                donation.getLongitude()
//        );
//
//
//        // -----------------------------------------------------
//        // Foundation location
//        // -----------------------------------------------------
//
//        LocationRequest foundationLocation =
//                new LocationRequest(
//                        foundation.getLatitude(),
//                        foundation.getLongitude()
//                );
//
//
//        // -----------------------------------------------------
//        // Donation location
//        // -----------------------------------------------------
//
//        LocationRequest donationLocation =
//                new LocationRequest(
//                        donation.getLatitude(),
//                        donation.getLongitude()
//                );
//
//
//        // -----------------------------------------------------
//        // Calculate distance
//        // -----------------------------------------------------
//
//        DistanceResponse distanceResponse =
//                locationService.calculateDistance(
//                        foundationLocation,
//                        donationLocation
//                );
//
//
//        // -----------------------------------------------------
//        // Verify allowed radius
//        // -----------------------------------------------------
//
//        if (!distanceResponse.withinAllowedRadius()) {
//
//            throw new AccessDeniedException(
//                    "Donation is outside the allowed pickup radius"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Accept donation
//        // -----------------------------------------------------
//
//        donation.setStatus(
//                DonationStatus.ACCEPTED
//        );
//
//
//        donation.setAcceptedFoundation(
//                foundation
//        );
//
//
//        // -----------------------------------------------------
//        // Save
//        // -----------------------------------------------------
//
//        Donation savedDonation =
//                donationRepository.save(donation);
//
//
//        // =====================================================
//        // NOTIFY DONOR
//        // =====================================================
//
//        notificationService.createNotification(
//
//                donation.getDonor(),
//
//                "Donation Accepted",
//
//                "Your food donation has been accepted by "
//                        + foundation.getOrganizationName()
//                        + ".",
//
//                NotificationType.DONATION_ACCEPTED,
//
//                donation.getId()
//        );
//
//
//        return mapToResponse(savedDonation);
//    }
//
//
//    // =========================================================
//    // CREATE DONATION
//    // =========================================================
//
//    @Override
//    public DonationResponse createDonation(
//            String email,
//            CreateDonationRequest request
//    ) {
//
//        // -----------------------------------------------------
//        // Find donor
//        // -----------------------------------------------------
//
//        User donor =
//                getDonorUser(email);
//
//
//        // -----------------------------------------------------
//        // Validate coordinates
//        // -----------------------------------------------------
//
//        validateCoordinates(
//                request.latitude(),
//                request.longitude()
//        );
//
//
//        // -----------------------------------------------------
//        // Validate time
//        // -----------------------------------------------------
//
//        validateTime(
//                request.preparedAt(),
//                request.expiresAt()
//        );
//
//
//        // -----------------------------------------------------
//        // Expiry must be in future
//        // -----------------------------------------------------
//
//        if (!request.expiresAt()
//                .isAfter(LocalDateTime.now())) {
//
//            throw new IllegalArgumentException(
//                    "Expiry time must be in the future"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Create donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                new Donation();
//
//
//        donation.setDonor(
//                donor
//        );
//
//
//        donation.setFoodName(
//                request.foodName().trim()
//        );
//
//
//        donation.setFoodType(
//                request.foodType().trim()
//        );
//
//
//        donation.setQuantity(
//                request.quantity()
//        );
//
//
//        donation.setQuantityUnit(
//                request.quantityUnit()
//                        .trim()
//                        .toUpperCase()
//        );
//
//
//        donation.setPreparedAt(
//                request.preparedAt()
//        );
//
//
//        donation.setExpiresAt(
//                request.expiresAt()
//        );
//
//
//        donation.setPickupAddress(
//                request.pickupAddress().trim()
//        );
//
//
//        donation.setLatitude(
//                request.latitude()
//        );
//
//
//        donation.setLongitude(
//                request.longitude()
//        );
//
//
//        donation.setStatus(
//                DonationStatus.AVAILABLE
//        );
//
//
//        // -----------------------------------------------------
//        // Save
//        // -----------------------------------------------------
//
//        Donation savedDonation =
//                donationRepository.save(donation);
//
//
//        return mapToResponse(savedDonation);
//    }
//
//
//    // =========================================================
//    // UPDATE DONATION
//    // =========================================================
//
//    @Override
//    public DonationResponse updateDonation(
//            String email,
//            Long donationId,
//            UpdateDonationRequest request
//    ) {
//
//        // -----------------------------------------------------
//        // Find donor
//        // -----------------------------------------------------
//
//        User donor =
//                getDonorUser(email);
//
//
//        // -----------------------------------------------------
//        // Find donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                donationRepository.findById(donationId)
//                        .orElseThrow(() ->
//                                new DonationNotFoundException(
//                                        "Donation not found with id: "
//                                                + donationId
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Ownership check
//        // -----------------------------------------------------
//
//        if (
//                donation.getDonor() == null
//                        ||
//                        !donation.getDonor()
//                                .getId()
//                                .equals(donor.getId())
//        ) {
//
//            throw new AccessDeniedException(
//                    "You are not authorized to update this donation"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Status check
//        // -----------------------------------------------------
//
//        if (donation.getStatus()
//                != DonationStatus.AVAILABLE) {
//
//            throw new InvalidDonationStatusException(
//                    "Only available donations can be updated"
//            );
//        }
//
//
//        // =====================================================
//        // EXPIRED DONATION CANNOT BE UPDATED
//        // =====================================================
//
//        if (
//                donation.getExpiresAt() != null
//                        &&
//                        !donation.getExpiresAt()
//                                .isAfter(LocalDateTime.now())
//        ) {
//
//            donation.setStatus(
//                    DonationStatus.EXPIRED
//            );
//
//
//            donationRepository.save(
//                    donation
//            );
//
//
//            // -------------------------------------------------
//            // Notify donor
//            // -------------------------------------------------
//
//            notificationService.createNotification(
//
//                    donor,
//
//                    "Donation Expired",
//
//                    "Your food donation "
//                            + donation.getFoodName()
//                            + " has expired and can no longer be updated.",
//
//                    NotificationType.DONATION_EXPIRED,
//
//                    donation.getId()
//            );
//
//
//            throw new InvalidDonationStatusException(
//                    "Expired donations cannot be updated"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Validate coordinates
//        // -----------------------------------------------------
//
//        validateCoordinates(
//                request.latitude(),
//                request.longitude()
//        );
//
//
//        // -----------------------------------------------------
//        // Validate time
//        // -----------------------------------------------------
//
//        validateTime(
//                request.preparedAt(),
//                request.expiresAt()
//        );
//
//
//        // -----------------------------------------------------
//        // New expiry must be future
//        // -----------------------------------------------------
//
//        if (!request.expiresAt()
//                .isAfter(LocalDateTime.now())) {
//
//            throw new IllegalArgumentException(
//                    "Expiry time must be in the future"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Update donation
//        // -----------------------------------------------------
//
//        donation.setFoodName(
//                request.foodName().trim()
//        );
//
//
//        donation.setFoodType(
//                request.foodType().trim()
//        );
//
//
//        donation.setQuantity(
//                request.quantity()
//        );
//
//
//        donation.setQuantityUnit(
//                request.quantityUnit()
//                        .trim()
//                        .toUpperCase()
//        );
//
//
//        donation.setPreparedAt(
//                request.preparedAt()
//        );
//
//
//        donation.setExpiresAt(
//                request.expiresAt()
//        );
//
//
//        donation.setPickupAddress(
//                request.pickupAddress().trim()
//        );
//
//
//        donation.setLatitude(
//                request.latitude()
//        );
//
//
//        donation.setLongitude(
//                request.longitude()
//        );
//
//
//        // -----------------------------------------------------
//        // Save
//        // -----------------------------------------------------
//
//        Donation updatedDonation =
//                donationRepository.save(
//                        donation
//                );
//
//
//        return mapToResponse(
//                updatedDonation
//        );
//    }
//
//
//    // =========================================================
//    // GET DONATION BY ID
//    // =========================================================
//
//    @Override
//    public DonationResponse getDonationById(
//            String email,
//            Long donationId
//    ) {
//
//        // -----------------------------------------------------
//        // Verify authenticated user
//        // -----------------------------------------------------
//
//        userRepository.findByEmail(email)
//                .orElseThrow(() ->
//                        new UserNotFoundException(
//                                "Authenticated user not found"
//                        )
//                );
//
//
//        // -----------------------------------------------------
//        // Find donation
//        // -----------------------------------------------------
//
//        Donation donation =
//                donationRepository.findById(donationId)
//                        .orElseThrow(() ->
//                                new DonationNotFoundException(
//                                        "Donation not found with id: "
//                                                + donationId
//                                )
//                        );
//
//
//        return mapToResponse(
//                donation
//        );
//    }
//
//
//    // =========================================================
//    // GET MY DONATIONS - DONOR
//    // =========================================================
//
//    @Override
//    public List<DonationResponse> getMyDonations(
//            String email
//    ) {
//
//        User donor =
//                getDonorUser(email);
//
//
//        return donationRepository
//                .findByDonorId(
//                        donor.getId()
//                )
//                .stream()
//                .map(this::mapToResponse)
//                .toList();
//    }
//
//
//    // =========================================================
//    // GET AVAILABLE DONATIONS FOR FOUNDATION
//    // =========================================================
//
//    @Override
//    public List<DonationResponse> getAvailableDonations(
//            String email
//    ) {
//
//        // -----------------------------------------------------
//        // Find authenticated foundation user
//        // -----------------------------------------------------
//
//        User foundationUser =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify FOUNDATION role
//        // -----------------------------------------------------
//
//        if (foundationUser.getRole()
//                != Role.FOUNDATION) {
//
//            throw new AccessDeniedException(
//                    "Only foundation users can view available donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Find foundation profile
//        // -----------------------------------------------------
//
//        Foundation foundation =
//                foundationRepository
//                        .findByUserId(
//                                foundationUser.getId()
//                        )
//                        .orElseThrow(() ->
//                                new FoundationNotFoundException(
//                                        "Foundation profile not found"
//                                )
//                        );
//
//
//        // -----------------------------------------------------
//        // Verify foundation status
//        // -----------------------------------------------------
//
//        if (foundation.getVerificationStatus()
//                != VerificationStatus.VERIFIED) {
//
//            throw new AccessDeniedException(
//                    "Only verified foundations can view available donations"
//            );
//        }
//
//
//        // -----------------------------------------------------
//        // Validate foundation coordinates
//        // -----------------------------------------------------
//
//        validateCoordinates(
//                foundation.getLatitude(),
//                foundation.getLongitude()
//        );
//
//
//        // -----------------------------------------------------
//        // Get AVAILABLE donations
//        // -----------------------------------------------------
//
//        List<Donation> availableDonations =
//                donationRepository.findByStatus(
//                        DonationStatus.AVAILABLE
//                );
//
//
//        LocalDateTime now =
//                LocalDateTime.now();
//
//
//        // -----------------------------------------------------
//        // Filter donations
//        //
//        // 1. Must not be expired
//        // 2. Must have coordinates
//        // 3. Must be within configured radius
//        // -----------------------------------------------------
//
//        return availableDonations.stream()
//
//                .filter(donation -> {
//
//                    // -----------------------------------------
//                    // Expiry check
//                    // -----------------------------------------
//
//                    if (
//                            donation.getExpiresAt() == null
//                                    ||
//                                    !donation.getExpiresAt()
//                                            .isAfter(now)
//                    ) {
//
//                        return false;
//                    }
//
//
//                    // -----------------------------------------
//                    // Donation coordinates
//                    // -----------------------------------------
//
//                    if (
//                            donation.getLatitude() == null
//                                    ||
//                                    donation.getLongitude() == null
//                    ) {
//
//                        return false;
//                    }
//
//
//                    // -----------------------------------------
//                    // Foundation location
//                    // -----------------------------------------
//
//                    LocationRequest foundationLocation =
//                            new LocationRequest(
//                                    foundation.getLatitude(),
//                                    foundation.getLongitude()
//                            );
//
//
//                    // -----------------------------------------
//                    // Donation location
//                    // -----------------------------------------
//
//                    LocationRequest donationLocation =
//                            new LocationRequest(
//                                    donation.getLatitude(),
//                                    donation.getLongitude()
//                            );
//
//
//                    // -----------------------------------------
//                    // Calculate distance
//                    // -----------------------------------------
//
//                    DistanceResponse distanceResponse =
//                            locationService.calculateDistance(
//                                    foundationLocation,
//                                    donationLocation
//                            );
//
//
//                    // -----------------------------------------
//                    // Check configured radius
//                    // -----------------------------------------
//
//                    return distanceResponse
//                            .withinAllowedRadius();
//
//                })
//
//                .map(this::mapToResponse)
//
//                .toList();
//    }
//
//
//    // =========================================================
//    // GET AUTHENTICATED DONOR
//    // =========================================================
//
//    private User getDonorUser(
//            String email
//    ) {
//
//        User user =
//                userRepository.findByEmail(email)
//                        .orElseThrow(() ->
//                                new UserNotFoundException(
//                                        "Authenticated user not found"
//                                )
//                        );
//
//
//        if (user.getRole()
//                != Role.DONOR) {
//
//            throw new AccessDeniedException(
//                    "Only donor users can perform donation operations"
//            );
//        }
//
//
//        return user;
//    }
//
//
//    // =========================================================
//    // VALIDATE COORDINATES
//    // =========================================================
//
//    private void validateCoordinates(
//            Double latitude,
//            Double longitude
//    ) {
//
//        if (
//                latitude == null
//                        ||
//                        longitude == null
//        ) {
//
//            throw new IllegalArgumentException(
//                    "Latitude and longitude are required"
//            );
//        }
//
//
//        if (
//                !CoordinateValidator.isValidCoordinate(
//                        latitude,
//                        longitude
//                )
//        ) {
//
//            throw new IllegalArgumentException(
//                    "Invalid latitude or longitude"
//            );
//        }
//    }
//
//
//    // =========================================================
//    // VALIDATE TIME
//    // =========================================================
//
//    private void validateTime(
//            LocalDateTime preparedAt,
//            LocalDateTime expiresAt
//    ) {
//
//        if (
//                preparedAt == null
//                        ||
//                        expiresAt == null
//        ) {
//
//            throw new IllegalArgumentException(
//                    "Prepared time and expiry time are required"
//            );
//        }
//
//
//        if (!expiresAt.isAfter(preparedAt)) {
//
//            throw new IllegalArgumentException(
//                    "Expiry time must be after prepared time"
//            );
//        }
//    }
//
//
//    // =========================================================
//    // ENTITY → RESPONSE
//    // =========================================================
//
//    private DonationResponse mapToResponse(
//            Donation donation
//    ) {
//
//        User donor =
//                donation.getDonor();
//
//
//        Foundation foundation =
//                donation.getAcceptedFoundation();
//
//
//        return new DonationResponse(
//
//                donation.getId(),
//
//                donor.getId(),
//
//                donor.getName(),
//
//                donation.getFoodName(),
//
//                donation.getFoodType(),
//
//                donation.getQuantity(),
//
//                donation.getQuantityUnit(),
//
//                donation.getPreparedAt(),
//
//                donation.getExpiresAt(),
//
//                donation.getPickupAddress(),
//
//                donation.getLatitude(),
//
//                donation.getLongitude(),
//
//                donation.getStatus(),
//
//                foundation != null
//                        ? foundation.getId()
//                        : null,
//
//                foundation != null
//                        ? foundation.getOrganizationName()
//                        : null,
//
//                donation.getCreatedAt(),
//
//                donation.getUpdatedAt()
//        );
//    }
//}

package com.foodbridge.donation.service;

import com.foodbridge.auth.entity.Role;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;

import com.foodbridge.common.exception.DonationNotFoundException;
import com.foodbridge.common.exception.FoundationNotFoundException;
import com.foodbridge.common.exception.InvalidDonationStatusException;
import com.foodbridge.common.exception.UserNotFoundException;

import com.foodbridge.donation.dto.request.CreateDonationRequest;
import com.foodbridge.donation.dto.request.UpdateDonationRequest;
import com.foodbridge.donation.dto.response.DonationResponse;

import com.foodbridge.donation.entity.Donation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.DonationRepository;

import com.foodbridge.foundation.entity.Foundation;
import com.foodbridge.foundation.entity.VerificationStatus;
import com.foodbridge.foundation.repository.FoundationRepository;
import com.foodbridge.foundation.service.NearbyFoundationService;

import com.foodbridge.location.dto.request.LocationRequest;
import com.foodbridge.location.dto.response.DistanceResponse;
import com.foodbridge.location.service.LocationService;
import com.foodbridge.location.util.CoordinateValidator;

import com.foodbridge.notification.enums.NotificationType;
import com.foodbridge.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class DonationServiceImpl
        implements DonationService {


    private final DonationRepository donationRepository;

    private final UserRepository userRepository;

    private final FoundationRepository foundationRepository;

    private final LocationService locationService;

    private final NotificationService notificationService;

    private final NearbyFoundationService nearbyFoundationService;


    // =========================================================
    // MARK DONATION AS PICKED UP
    // =========================================================

    @Override
    public DonationResponse markAsPickedUp(
            String email,
            Long donationId
    ) {

        User foundationUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (foundationUser.getRole()
                != Role.FOUNDATION) {

            throw new AccessDeniedException(
                    "Only foundation users can pick up donations"
            );
        }


        Foundation foundation =
                foundationRepository
                        .findByUserId(
                                foundationUser.getId()
                        )
                        .orElseThrow(() ->
                                new FoundationNotFoundException(
                                        "Foundation profile not found"
                                )
                        );


        if (foundation.getVerificationStatus()
                != VerificationStatus.VERIFIED) {

            throw new AccessDeniedException(
                    "Only verified foundations can pick up donations"
            );
        }


        Donation donation =
                donationRepository.findById(donationId)
                        .orElseThrow(() ->
                                new DonationNotFoundException(
                                        "Donation not found with id: "
                                                + donationId
                                )
                        );


        if (donation.getStatus()
                != DonationStatus.ACCEPTED) {

            throw new InvalidDonationStatusException(
                    "Only accepted donations can be picked up"
            );
        }


        if (
                donation.getAcceptedFoundation() == null
                        ||
                        !donation.getAcceptedFoundation()
                                .getId()
                                .equals(foundation.getId())
        ) {

            throw new AccessDeniedException(
                    "Only the accepted foundation can pick up this donation"
            );
        }


        donation.setStatus(
                DonationStatus.PICKED_UP
        );


        Donation savedDonation =
                donationRepository.save(
                        donation
                );


        // =====================================================
        // NOTIFY DONOR
        // =====================================================

        notificationService.createNotification(

                donation.getDonor(),

                "Donation Picked Up",

                "Your food donation has been picked up by "
                        + foundation.getOrganizationName()
                        + ".",

                NotificationType.DONATION_PICKED_UP,

                donation.getId()
        );


        return mapToResponse(
                savedDonation
        );
    }


    // =========================================================
    // MARK DONATION AS DELIVERED
    // =========================================================

    @Override
    public DonationResponse markAsDelivered(
            String email,
            Long donationId
    ) {

        User foundationUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (foundationUser.getRole()
                != Role.FOUNDATION) {

            throw new AccessDeniedException(
                    "Only foundation users can mark donations as delivered"
            );
        }


        Foundation foundation =
                foundationRepository
                        .findByUserId(
                                foundationUser.getId()
                        )
                        .orElseThrow(() ->
                                new FoundationNotFoundException(
                                        "Foundation profile not found"
                                )
                        );


        if (foundation.getVerificationStatus()
                != VerificationStatus.VERIFIED) {

            throw new AccessDeniedException(
                    "Only verified foundations can mark donations as delivered"
            );
        }


        Donation donation =
                donationRepository.findById(donationId)
                        .orElseThrow(() ->
                                new DonationNotFoundException(
                                        "Donation not found with id: "
                                                + donationId
                                )
                        );


        if (donation.getStatus()
                != DonationStatus.PICKED_UP) {

            throw new InvalidDonationStatusException(
                    "Only picked up donations can be marked as delivered"
            );
        }


        if (
                donation.getAcceptedFoundation() == null
                        ||
                        !donation.getAcceptedFoundation()
                                .getId()
                                .equals(foundation.getId())
        ) {

            throw new AccessDeniedException(
                    "Only the accepted foundation can mark this donation as delivered"
            );
        }


        donation.setStatus(
                DonationStatus.DELIVERED
        );


        Donation savedDonation =
                donationRepository.save(
                        donation
                );


        // =====================================================
        // NOTIFY DONOR
        // =====================================================

        notificationService.createNotification(

                donation.getDonor(),

                "Donation Delivered",

                "Your food donation has been successfully delivered by "
                        + foundation.getOrganizationName()
                        + ".",

                NotificationType.DONATION_DELIVERED,

                donation.getId()
        );


        return mapToResponse(
                savedDonation
        );
    }


    // =========================================================
    // GET MY DONATIONS - FOUNDATION
    // =========================================================

    @Override
    public List<DonationResponse> getMyFoundationDonations(
            String email
    ) {

        User foundationUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (foundationUser.getRole()
                != Role.FOUNDATION) {

            throw new AccessDeniedException(
                    "Only foundation users can view foundation donations"
            );
        }


        Foundation foundation =
                foundationRepository
                        .findByUserId(
                                foundationUser.getId()
                        )
                        .orElseThrow(() ->
                                new FoundationNotFoundException(
                                        "Foundation profile not found"
                                )
                        );


        if (foundation.getVerificationStatus()
                != VerificationStatus.VERIFIED) {

            throw new AccessDeniedException(
                    "Only verified foundations can view foundation donations"
            );
        }


        return donationRepository
                .findByAcceptedFoundationId(
                        foundation.getId()
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // ACCEPT DONATION
    // =========================================================

    @Override
    public DonationResponse acceptDonation(
            String email,
            Long donationId
    ) {

        User foundationUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (foundationUser.getRole()
                != Role.FOUNDATION) {

            throw new AccessDeniedException(
                    "Only foundation users can accept donations"
            );
        }


        Foundation foundation =
                foundationRepository
                        .findByUserId(
                                foundationUser.getId()
                        )
                        .orElseThrow(() ->
                                new FoundationNotFoundException(
                                        "Foundation profile not found"
                                )
                        );


        if (foundation.getVerificationStatus()
                != VerificationStatus.VERIFIED) {

            throw new AccessDeniedException(
                    "Only verified foundations can accept donations"
            );
        }


        Donation donation =
                donationRepository.findById(donationId)
                        .orElseThrow(() ->
                                new DonationNotFoundException(
                                        "Donation not found with id: "
                                                + donationId
                                )
                        );


        // -----------------------------------------------------
        // Expiry
        // -----------------------------------------------------

        if (donation.getExpiresAt() == null) {

            throw new InvalidDonationStatusException(
                    "Donation expiry time is missing"
            );
        }


        if (!donation.getExpiresAt()
                .isAfter(LocalDateTime.now())) {

            donation.setStatus(
                    DonationStatus.EXPIRED
            );


            donationRepository.save(
                    donation
            );


            notificationService.createNotification(

                    donation.getDonor(),

                    "Donation Expired",

                    "Your food donation "
                            + donation.getFoodName()
                            + " has expired and can no longer be accepted.",

                    NotificationType.DONATION_EXPIRED,

                    donation.getId()
            );


            throw new InvalidDonationStatusException(
                    "Donation has expired and cannot be accepted"
            );
        }


        // -----------------------------------------------------
        // Status
        // -----------------------------------------------------

        if (donation.getStatus()
                != DonationStatus.AVAILABLE) {

            throw new InvalidDonationStatusException(
                    "Only available donations can be accepted"
            );
        }


        // -----------------------------------------------------
        // Validate coordinates
        // -----------------------------------------------------

        validateCoordinates(
                donation.getLatitude(),
                donation.getLongitude()
        );


        LocationRequest foundationLocation =
                new LocationRequest(
                        foundation.getLatitude(),
                        foundation.getLongitude()
                );


        LocationRequest donationLocation =
                new LocationRequest(
                        donation.getLatitude(),
                        donation.getLongitude()
                );


        DistanceResponse distanceResponse =
                locationService.calculateDistance(
                        foundationLocation,
                        donationLocation
                );


        if (!distanceResponse.withinAllowedRadius()) {

            throw new AccessDeniedException(
                    "Donation is outside the allowed pickup radius"
            );
        }


        // -----------------------------------------------------
        // Accept
        // -----------------------------------------------------

        donation.setStatus(
                DonationStatus.ACCEPTED
        );


        donation.setAcceptedFoundation(
                foundation
        );


        Donation savedDonation =
                donationRepository.save(
                        donation
                );


        // =====================================================
        // NOTIFY DONOR
        // =====================================================

        notificationService.createNotification(

                donation.getDonor(),

                "Donation Accepted",

                "Your food donation has been accepted by "
                        + foundation.getOrganizationName()
                        + ".",

                NotificationType.DONATION_ACCEPTED,

                donation.getId()
        );


        return mapToResponse(
                savedDonation
        );
    }


    // =========================================================
    // CREATE DONATION
    // =========================================================

    @Override
    public DonationResponse createDonation(
            String email,
            CreateDonationRequest request
    ) {

        // -----------------------------------------------------
        // Find donor
        // -----------------------------------------------------

        User donor =
                getDonorUser(email);


        // -----------------------------------------------------
        // Validate coordinates
        // -----------------------------------------------------

        validateCoordinates(
                request.latitude(),
                request.longitude()
        );


        // -----------------------------------------------------
        // Validate time
        // -----------------------------------------------------

        validateTime(
                request.preparedAt(),
                request.expiresAt()
        );


        // -----------------------------------------------------
        // Expiry must be future
        // -----------------------------------------------------

        if (
                !request.expiresAt()
                        .isAfter(LocalDateTime.now())
        ) {

            throw new IllegalArgumentException(
                    "Expiry time must be in the future"
            );
        }


        // =====================================================
        // CREATE DONATION
        // =====================================================

        Donation donation =
                new Donation();


        donation.setDonor(
                donor
        );


        donation.setFoodName(
                request.foodName().trim()
        );


        donation.setFoodType(
                request.foodType().trim()
        );


        donation.setQuantity(
                request.quantity()
        );


        donation.setQuantityUnit(
                request.quantityUnit()
                        .trim()
                        .toUpperCase()
        );


        donation.setPreparedAt(
                request.preparedAt()
        );


        donation.setExpiresAt(
                request.expiresAt()
        );


        donation.setPickupAddress(
                request.pickupAddress().trim()
        );


        donation.setLatitude(
                request.latitude()
        );


        donation.setLongitude(
                request.longitude()
        );


        donation.setStatus(
                DonationStatus.AVAILABLE
        );


        // =====================================================
        // SAVE DONATION
        // =====================================================

        Donation savedDonation =
                donationRepository.save(
                        donation
                );


        // =====================================================
        // FIND NEARBY VERIFIED FOUNDATIONS
        // =====================================================

        List<Foundation> nearbyFoundations =
                nearbyFoundationService
                        .findNearbyVerifiedFoundations(
                                savedDonation.getLatitude(),
                                savedDonation.getLongitude()
                        );


        // =====================================================
        // NOTIFY NEARBY FOUNDATIONS
        // =====================================================

        for (
                Foundation foundation
                : nearbyFoundations
        ) {

            // -------------------------------------------------
            // Safety check
            // -------------------------------------------------

            if (
                    foundation.getUser() == null
            ) {
                continue;
            }


            notificationService.createNotification(

                    foundation.getUser(),

                    "New Food Donation Nearby",

                    "A new food donation "
                            + savedDonation.getFoodName()
                            + " is available near your location.",

                    NotificationType.NEW_DONATION,

                    savedDonation.getId()
            );
        }


        // =====================================================
        // RETURN
        // =====================================================

        return mapToResponse(
                savedDonation
        );
    }


    // =========================================================
    // UPDATE DONATION
    // =========================================================

    @Override
    public DonationResponse updateDonation(
            String email,
            Long donationId,
            UpdateDonationRequest request
    ) {

        User donor =
                getDonorUser(email);


        Donation donation =
                donationRepository.findById(donationId)
                        .orElseThrow(() ->
                                new DonationNotFoundException(
                                        "Donation not found with id: "
                                                + donationId
                                )
                        );


        // -----------------------------------------------------
        // Ownership
        // -----------------------------------------------------

        if (
                donation.getDonor() == null
                        ||
                        !donation.getDonor()
                                .getId()
                                .equals(donor.getId())
        ) {

            throw new AccessDeniedException(
                    "You are not authorized to update this donation"
            );
        }


        // -----------------------------------------------------
        // Status
        // -----------------------------------------------------

        if (donation.getStatus()
                != DonationStatus.AVAILABLE) {

            throw new InvalidDonationStatusException(
                    "Only available donations can be updated"
            );
        }


        // -----------------------------------------------------
        // Expiry
        // -----------------------------------------------------

        if (
                donation.getExpiresAt() != null
                        &&
                        !donation.getExpiresAt()
                                .isAfter(LocalDateTime.now())
        ) {

            donation.setStatus(
                    DonationStatus.EXPIRED
            );


            donationRepository.save(
                    donation
            );


            notificationService.createNotification(

                    donor,

                    "Donation Expired",

                    "Your food donation "
                            + donation.getFoodName()
                            + " has expired and can no longer be updated.",

                    NotificationType.DONATION_EXPIRED,

                    donation.getId()
            );


            throw new InvalidDonationStatusException(
                    "Expired donations cannot be updated"
            );
        }


        // -----------------------------------------------------
        // Validate
        // -----------------------------------------------------

        validateCoordinates(
                request.latitude(),
                request.longitude()
        );


        validateTime(
                request.preparedAt(),
                request.expiresAt()
        );


        if (
                !request.expiresAt()
                        .isAfter(LocalDateTime.now())
        ) {

            throw new IllegalArgumentException(
                    "Expiry time must be in the future"
            );
        }


        // -----------------------------------------------------
        // Update
        // -----------------------------------------------------

        donation.setFoodName(
                request.foodName().trim()
        );


        donation.setFoodType(
                request.foodType().trim()
        );


        donation.setQuantity(
                request.quantity()
        );


        donation.setQuantityUnit(
                request.quantityUnit()
                        .trim()
                        .toUpperCase()
        );


        donation.setPreparedAt(
                request.preparedAt()
        );


        donation.setExpiresAt(
                request.expiresAt()
        );


        donation.setPickupAddress(
                request.pickupAddress().trim()
        );


        donation.setLatitude(
                request.latitude()
        );


        donation.setLongitude(
                request.longitude()
        );


        Donation updatedDonation =
                donationRepository.save(
                        donation
                );


        return mapToResponse(
                updatedDonation
        );
    }


    // =========================================================
    // GET DONATION BY ID
    // =========================================================

    @Override
    public DonationResponse getDonationById(
            String email,
            Long donationId
    ) {

        userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Authenticated user not found"
                        )
                );


        Donation donation =
                donationRepository.findById(donationId)
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
    // GET MY DONATIONS - DONOR
    // =========================================================

    @Override
    public List<DonationResponse> getMyDonations(
            String email
    ) {

        User donor =
                getDonorUser(email);


        return donationRepository
                .findByDonorId(
                        donor.getId()
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET AVAILABLE DONATIONS FOR FOUNDATION
    // =========================================================

    @Override
    public List<DonationResponse> getAvailableDonations(
            String email
    ) {

        User foundationUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (foundationUser.getRole()
                != Role.FOUNDATION) {

            throw new AccessDeniedException(
                    "Only foundation users can view available donations"
            );
        }


        Foundation foundation =
                foundationRepository
                        .findByUserId(
                                foundationUser.getId()
                        )
                        .orElseThrow(() ->
                                new FoundationNotFoundException(
                                        "Foundation profile not found"
                                )
                        );


        if (foundation.getVerificationStatus()
                != VerificationStatus.VERIFIED) {

            throw new AccessDeniedException(
                    "Only verified foundations can view available donations"
            );
        }


        validateCoordinates(
                foundation.getLatitude(),
                foundation.getLongitude()
        );


        List<Donation> availableDonations =
                donationRepository.findByStatus(
                        DonationStatus.AVAILABLE
                );


        LocalDateTime now =
                LocalDateTime.now();


        return availableDonations.stream()

                .filter(donation -> {

                    // -------------------------------------------------
                    // Not expired
                    // -------------------------------------------------

                    if (
                            donation.getExpiresAt() == null
                                    ||
                                    !donation.getExpiresAt()
                                            .isAfter(now)
                    ) {

                        return false;
                    }


                    // -------------------------------------------------
                    // Donation coordinates
                    // -------------------------------------------------

                    if (
                            donation.getLatitude() == null
                                    ||
                                    donation.getLongitude() == null
                    ) {

                        return false;
                    }


                    // -------------------------------------------------
                    // Foundation location
                    // -------------------------------------------------

                    LocationRequest foundationLocation =
                            new LocationRequest(
                                    foundation.getLatitude(),
                                    foundation.getLongitude()
                            );


                    // -------------------------------------------------
                    // Donation location
                    // -------------------------------------------------

                    LocationRequest donationLocation =
                            new LocationRequest(
                                    donation.getLatitude(),
                                    donation.getLongitude()
                            );


                    // -------------------------------------------------
                    // Distance
                    // -------------------------------------------------

                    DistanceResponse distanceResponse =
                            locationService.calculateDistance(
                                    foundationLocation,
                                    donationLocation
                            );


                    return distanceResponse
                            .withinAllowedRadius();

                })

                .map(this::mapToResponse)

                .toList();
    }


    // =========================================================
    // GET AUTHENTICATED DONOR
    // =========================================================

    private User getDonorUser(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated user not found"
                                )
                        );


        if (user.getRole()
                != Role.DONOR) {

            throw new AccessDeniedException(
                    "Only donor users can perform donation operations"
            );
        }


        return user;
    }


    // =========================================================
    // VALIDATE COORDINATES
    // =========================================================

    private void validateCoordinates(
            Double latitude,
            Double longitude
    ) {

        if (
                latitude == null
                        ||
                        longitude == null
        ) {

            throw new IllegalArgumentException(
                    "Latitude and longitude are required"
            );
        }


        if (
                !CoordinateValidator.isValidCoordinate(
                        latitude,
                        longitude
                )
        ) {

            throw new IllegalArgumentException(
                    "Invalid latitude or longitude"
            );
        }
    }


    // =========================================================
    // VALIDATE TIME
    // =========================================================

    private void validateTime(
            LocalDateTime preparedAt,
            LocalDateTime expiresAt
    ) {

        if (
                preparedAt == null
                        ||
                        expiresAt == null
        ) {

            throw new IllegalArgumentException(
                    "Prepared time and expiry time are required"
            );
        }


        if (!expiresAt.isAfter(preparedAt)) {

            throw new IllegalArgumentException(
                    "Expiry time must be after prepared time"
            );
        }
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private DonationResponse mapToResponse(
            Donation donation
    ) {

        User donor =
                donation.getDonor();


        Foundation foundation =
                donation.getAcceptedFoundation();


        return new DonationResponse(

                donation.getId(),

                donor.getId(),

                donor.getName(),

                donation.getFoodName(),

                donation.getFoodType(),

                donation.getQuantity(),

                donation.getQuantityUnit(),

                donation.getPreparedAt(),

                donation.getExpiresAt(),

                donation.getPickupAddress(),

                donation.getLatitude(),

                donation.getLongitude(),

                donation.getStatus(),

                foundation != null
                        ? foundation.getId()
                        : null,

                foundation != null
                        ? foundation.getOrganizationName()
                        : null,

                donation.getCreatedAt(),

                donation.getUpdatedAt()
        );
    }
}