package com.foodbridge.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.foodbridge.admin.dto.response.AdminDonationResponse;

public interface AdminDonationService {


    // =========================================================
    // GET DONATIONS
    // =========================================================

    Page<AdminDonationResponse> getDonations(

            String search,

            String status,

            Pageable pageable

    );


    // =========================================================
    // GET DONATION BY ID
    // =========================================================

    AdminDonationResponse getDonationById(

            Long donationId

    );
}