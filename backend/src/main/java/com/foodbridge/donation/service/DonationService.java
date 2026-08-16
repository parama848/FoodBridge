//package com.foodbridge.donation.service;
//
//import com.foodbridge.donation.dto.request.CreateDonationRequest;
//import com.foodbridge.donation.dto.request.UpdateDonationRequest;
//import com.foodbridge.donation.dto.response.DonationResponse;
//
//import java.util.List;
//
//public interface DonationService {
//
//    // =========================================================
//    // CREATE DONATION
//    // =========================================================
//
//    DonationResponse createDonation(
//            String email,
//            CreateDonationRequest request
//    );
//
//
//    // =========================================================
//    // UPDATE DONATION
//    // =========================================================
//
//    DonationResponse updateDonation(
//            String email,
//            Long donationId,
//            UpdateDonationRequest request
//    );
//
//
//    // =========================================================
//    // GET DONATION BY ID
//    // =========================================================
//
//    DonationResponse getDonationById(
//            String email,
//            Long donationId
//    );
//
//
//    // =========================================================
//    // GET MY DONATIONS
//    // =========================================================
//
//    List<DonationResponse> getMyDonations(
//            String email
//    );
//
//
//    // =========================================================
//    // GET AVAILABLE DONATIONS
//    // =========================================================
//
//    List<DonationResponse> getAvailableDonations(
//            String email
//    );
//
//    // accept donation
//    DonationResponse acceptDonation(
//            String email,
//            Long donationId
//    );
//    DonationResponse markAsPickedUp(
//            String email,
//            Long donationId
//    );
//
//    DonationResponse markAsDelivered(
//            String email,
//            Long donationId
//    );
//
//    List<DonationResponse> getMyFoundationDonations(
//            String email
//    );
//
//}

package com.foodbridge.donation.service;

import com.foodbridge.donation.dto.request.CreateDonationRequest;
import com.foodbridge.donation.dto.request.UpdateDonationRequest;
import com.foodbridge.donation.dto.response.DonationResponse;

import java.util.List;

public interface DonationService {

    // =========================================================
    // CREATE DONATION
    // =========================================================

    DonationResponse createDonation(
            String email,
            CreateDonationRequest request
    );


    // =========================================================
    // UPDATE DONATION
    // =========================================================

    DonationResponse updateDonation(
            String email,
            Long donationId,
            UpdateDonationRequest request
    );


    // =========================================================
    // GET DONATION BY ID
    // =========================================================

    DonationResponse getDonationById(
            String email,
            Long donationId
    );


    // =========================================================
    // GET MY DONATIONS - DONOR
    // =========================================================

    List<DonationResponse> getMyDonations(
            String email
    );


    // =========================================================
    // GET AVAILABLE DONATIONS - FOUNDATION
    // =========================================================

    List<DonationResponse> getAvailableDonations(
            String email
    );


    // =========================================================
    // GET MY DONATIONS - FOUNDATION
    // =========================================================

    List<DonationResponse> getMyFoundationDonations(
            String email
    );


    // =========================================================
    // ACCEPT DONATION - FOUNDATION
    // =========================================================

    DonationResponse acceptDonation(
            String email,
            Long donationId
    );


    // =========================================================
    // MARK AS PICKED UP - FOUNDATION
    // =========================================================

    DonationResponse markAsPickedUp(
            String email,
            Long donationId
    );


    // =========================================================
    // MARK AS DELIVERED - FOUNDATION
    // =========================================================

    DonationResponse markAsDelivered(
            String email,
            Long donationId
    );
}