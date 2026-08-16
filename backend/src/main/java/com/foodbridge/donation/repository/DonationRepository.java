// //package com.foodbridge.donation.repository;
// //
// //import com.foodbridge.donation.entity.Donation;
// //import com.foodbridge.donation.enums.DonationStatus;
// //
// //import org.springframework.data.jpa.repository.JpaRepository;
// //
// //import java.time.LocalDateTime;
// //import java.util.List;
// //
// //public interface DonationRepository
// //        extends JpaRepository<Donation, Long> {
// //
// //    // =========================================================
// //    // FIND DONATIONS BY DONOR
// //    // =========================================================
// //
// //    List<Donation> findByDonorId(Long donorId);
// //
// //
// //    // =========================================================
// //    // FIND DONATIONS BY STATUS
// //    // =========================================================
// //
// //    List<Donation> findByStatus(DonationStatus status);
// //
// //
// //    // =========================================================
// //    // FIND DONATIONS BY DONOR + STATUS
// //    // =========================================================
// //
// //    List<Donation> findByDonorIdAndStatus(
// //            Long donorId,
// //            DonationStatus status
// //    );
// //
// //
// //    // =========================================================
// //    // FIND EXPIRED AVAILABLE DONATIONS
// //    // =========================================================
// //    //
// //    // Finds donations where:
// //    //
// //    // status = AVAILABLE
// //    // AND
// //    // expiresAt < current time
// //    //
// //    // Used by Module 7 expiry scheduler.
// //    // =========================================================
// //
// //    List<Donation> findByStatusAndExpiresAtBefore(
// //            DonationStatus status,
// //            LocalDateTime currentTime
// //    );
// //}

// package com.foodbridge.donation.repository;

// import com.foodbridge.donation.entity.Donation;
// import com.foodbridge.donation.enums.DonationStatus;

// import org.springframework.data.jpa.repository.JpaRepository;

// import java.time.LocalDateTime;
// import java.util.List;

// public interface DonationRepository
//         extends JpaRepository<Donation, Long> {

//     // =========================================================
//     // DONOR
//     // =========================================================

//     List<Donation> findByDonorId(
//             Long donorId
//     );


//     // =========================================================
//     // AVAILABLE DONATIONS
//     // =========================================================

//     List<Donation> findByStatus(
//             DonationStatus status
//     );


//     // =========================================================
//     // FOUNDATION ACCEPTED DONATIONS
//     // =========================================================

//     List<Donation> findByAcceptedFoundationId(
//             Long foundationId
//     );


//     // =========================================================
//     // EXPIRED DONATIONS
//     // =========================================================

//     List<Donation> findByStatusAndExpiresAtBefore(
//             DonationStatus status,
//             LocalDateTime time
//     );
// }

package com.foodbridge.donation.repository;

import com.foodbridge.donation.entity.Donation;
import com.foodbridge.donation.enums.DonationStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DonationRepository
        extends JpaRepository<Donation, Long> {


    // =========================================================
    // DONOR
    // =========================================================

    List<Donation> findByDonorId(
            Long donorId
    );


    // =========================================================
    // AVAILABLE DONATIONS
    // =========================================================

    List<Donation> findByStatus(
            DonationStatus status
    );


    // =========================================================
    // FOUNDATION ACCEPTED DONATIONS
    // =========================================================

    List<Donation> findByAcceptedFoundationId(
            Long foundationId
    );


    // =========================================================
    // EXPIRED DONATIONS
    // =========================================================

    List<Donation> findByStatusAndExpiresAtBefore(
            DonationStatus status,
            LocalDateTime time
    );


    // =========================================================
    // ADMIN
    // GET ALL DONATIONS
    // =========================================================
    //
    // JOIN FETCH loads:
    //
    // Donation
    //    ├── donor
    //    └── acceptedFoundation
    //
    // This prevents LazyInitializationException when
    // AdminDonationService maps the entity to a DTO.
    //
    // =========================================================

    @Query("""
            SELECT d
            FROM Donation d
            JOIN FETCH d.donor donor
            LEFT JOIN FETCH d.acceptedFoundation foundation
            ORDER BY d.createdAt DESC
            """)
    Page<Donation> findAllForAdmin(
            Pageable pageable
    );


    // =========================================================
    // ADMIN
    // GET DONATIONS BY STATUS
    // =========================================================

    @Query("""
            SELECT d
            FROM Donation d
            JOIN FETCH d.donor donor
            LEFT JOIN FETCH d.acceptedFoundation foundation
            WHERE d.status = :status
            ORDER BY d.createdAt DESC
            """)
    Page<Donation> findAllForAdminByStatus(

            @Param("status")
            DonationStatus status,

            Pageable pageable
    );


    // =========================================================
    // ADMIN
    // SEARCH DONATIONS
    // =========================================================
    //
    // Search fields:
    //
    // - food name
    // - donor name
    // - donor email
    //
    // =========================================================

    @Query("""
            SELECT d
            FROM Donation d
            JOIN FETCH d.donor donor
            LEFT JOIN FETCH d.acceptedFoundation foundation
            WHERE
                LOWER(d.foodName) LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
                OR LOWER(donor.name) LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
                OR LOWER(donor.email) LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
            ORDER BY d.createdAt DESC
            """)
    Page<Donation> searchForAdmin(

            @Param("search")
            String search,

            Pageable pageable
    );


    // =========================================================
    // ADMIN
    // SEARCH + STATUS
    // =========================================================

    @Query("""
            SELECT d
            FROM Donation d
            JOIN FETCH d.donor donor
            LEFT JOIN FETCH d.acceptedFoundation foundation
            WHERE
                (
                    LOWER(d.foodName) LIKE LOWER(
                        CONCAT('%', :search, '%')
                    )
                    OR LOWER(donor.name) LIKE LOWER(
                        CONCAT('%', :search, '%')
                    )
                    OR LOWER(donor.email) LIKE LOWER(
                        CONCAT('%', :search, '%')
                    )
                )
                AND d.status = :status
            ORDER BY d.createdAt DESC
            """)
    Page<Donation> searchForAdminByStatus(

            @Param("search")
            String search,

            @Param("status")
            DonationStatus status,

            Pageable pageable
    );


    // =========================================================
    // ADMIN
    // GET DONATION BY ID
    // =========================================================
    //
    // Fetch donor + foundation together.
    //
    // =========================================================

    @Query("""
            SELECT d
            FROM Donation d
            JOIN FETCH d.donor donor
            LEFT JOIN FETCH d.acceptedFoundation foundation
            WHERE d.id = :id
            """)
    Optional<Donation> findAdminDonationById(

            @Param("id")
            Long id
    );
}