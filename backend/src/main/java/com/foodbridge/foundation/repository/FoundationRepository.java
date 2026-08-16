package com.foodbridge.foundation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.foundation.entity.Foundation;
import com.foodbridge.foundation.entity.VerificationStatus;

public interface FoundationRepository
        extends JpaRepository<Foundation, Long> {

    // =========================================================
    // FIND FOUNDATION PROFILE BY USER
    // =========================================================

    Optional<Foundation> findByUserId(
            Long userId
    );


    // =========================================================
    // CHECK EXISTING FOUNDATION PROFILE
    // =========================================================

    boolean existsByUserId(
            Long userId
    );


    // =========================================================
    // CHECK DUPLICATE REGISTRATION NUMBER
    // =========================================================

    boolean existsByRegistrationNumber(
            String registrationNumber
    );


    // =========================================================
    // FIND FOUNDATIONS BY VERIFICATION STATUS
    // =========================================================
    //
    // Existing method.
    // Used by nearby-foundation logic.
    //
    // Do NOT add "WithUser" here.
    // =========================================================

    List<Foundation> findByVerificationStatus(
            VerificationStatus verificationStatus
    );


    // =========================================================
    // ADMIN - PENDING FOUNDATIONS
    // =========================================================
    //
    // EntityGraph tells Hibernate to load User together
    // with Foundation for this specific query.
    // =========================================================

    @EntityGraph(attributePaths = "user")
    List<Foundation> findByVerificationStatus(
            VerificationStatus verificationStatus,
            org.springframework.data.domain.Pageable pageable
    );


    // =========================================================
    // FIND FOUNDATION BY ID + VERIFICATION STATUS
    // =========================================================

    @EntityGraph(attributePaths = "user")
    Optional<Foundation> findByIdAndVerificationStatus(
            Long id,
            VerificationStatus verificationStatus
    );
}