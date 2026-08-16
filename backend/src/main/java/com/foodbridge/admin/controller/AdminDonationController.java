package com.foodbridge.admin.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.admin.dto.response.AdminDonationResponse;
import com.foodbridge.admin.service.AdminDonationService;
import com.foodbridge.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/donations")
@RequiredArgsConstructor
public class AdminDonationController {


    private final AdminDonationService
            adminDonationService;


    // =========================================================
    // GET ALL DONATIONS
    // =========================================================
    //
    // GET /api/admin/donations
    //
    // Optional:
    //
    // ?page=0
    // ?size=20
    // ?search=biryani
    // ?status=AVAILABLE
    //
    // =========================================================

    @GetMapping
    public ResponseEntity<
            ApiResponse<Page<AdminDonationResponse>>
            >
    getDonations(

            @RequestParam(
                    required = false
            )
            String search,

            @RequestParam(
                    required = false
            )
            String status,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "20"
            )
            int size

    ) {


        // =====================================================
        // PAGINATION VALIDATION
        // =====================================================

        if (page < 0) {

            page = 0;
        }


        if (size < 1) {

            size = 20;
        }


        if (size > 100) {

            size = 100;
        }


        // =====================================================
        // PAGE REQUEST
        // =====================================================

        Pageable pageable =
                PageRequest.of(

                        page,

                        size,

                        Sort.by(
                                Sort.Direction.DESC,
                                "createdAt"
                        )
                );


        // =====================================================
        // SERVICE
        // =====================================================

        Page<AdminDonationResponse> donations =
                adminDonationService.getDonations(

                        search,

                        status,

                        pageable
                );


        // =====================================================
        // RESPONSE
        // =====================================================

        return ResponseEntity.ok(

                ApiResponse.success(

                        "Donations retrieved successfully",

                        donations

                )
        );
    }


    // =========================================================
    // GET DONATION BY ID
    // =========================================================
    //
    // GET /api/admin/donations/{id}
    //
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<
            ApiResponse<AdminDonationResponse>
            >
    getDonationById(

            @PathVariable
            Long id

    ) {


        AdminDonationResponse donation =
                adminDonationService.getDonationById(
                        id
                );


        return ResponseEntity.ok(

                ApiResponse.success(

                        "Donation retrieved successfully",

                        donation

                )
        );
    }
}