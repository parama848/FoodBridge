package com.foodbridge.donation.scheduler;

import com.foodbridge.donation.entity.Donation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.DonationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DonationExpiryScheduler {


    private final DonationRepository donationRepository;


    // =========================================================
    // EXPIRE DONATIONS
    // =========================================================
    //
    // Runs every 1 minute.
    //
    // Finds donations that are:
    //
    // AVAILABLE
    // AND
    // expiresAt < current time
    //
    // Then changes their status to EXPIRED.
    // =========================================================

    @Scheduled(fixedRate = 60000)
    public void expireDonations() {

        LocalDateTime now =
                LocalDateTime.now();


        List<Donation> expiredDonations =
                donationRepository
                        .findByStatusAndExpiresAtBefore(
                                DonationStatus.AVAILABLE,
                                now
                        );


        if (expiredDonations.isEmpty()) {
            return;
        }


        // -----------------------------------------------------
        // Mark donations as EXPIRED
        // -----------------------------------------------------

        for (Donation donation : expiredDonations) {

            donation.setStatus(
                    DonationStatus.EXPIRED
            );
        }


        // -----------------------------------------------------
        // Save all expired donations
        // -----------------------------------------------------

        donationRepository.saveAll(
                expiredDonations
        );
    }
}