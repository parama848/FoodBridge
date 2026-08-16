package com.foodbridge.admin.controller;

import com.foodbridge.admin.service.AdminFoundationService;
import com.foodbridge.common.response.ApiResponse;
import com.foodbridge.foundation.dto.response.FoundationResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/foundations")
@RequiredArgsConstructor
public class AdminFoundationController {

    private final AdminFoundationService adminFoundationService;


    // =========================================================
    // GET PENDING FOUNDATIONS
    // GET /api/admin/foundations/pending
    // =========================================================

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<FoundationResponse>>>
    getPendingFoundations() {

        List<FoundationResponse> foundations =
                adminFoundationService.getPendingFoundations();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Pending foundations retrieved successfully",
                        foundations
                )
        );
    }


    // =========================================================
    // GET FOUNDATION BY ID
    // GET /api/admin/foundations/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoundationResponse>>
    getFoundationById(
            @PathVariable Long id
    ) {

        FoundationResponse foundation =
                adminFoundationService.getFoundationById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation retrieved successfully",
                        foundation
                )
        );
    }


    // =========================================================
    // APPROVE FOUNDATION
    // PUT /api/admin/foundations/{id}/approve
    // =========================================================

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<FoundationResponse>>
    approveFoundation(
            @PathVariable Long id
    ) {

        FoundationResponse foundation =
                adminFoundationService.approveFoundation(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation approved successfully",
                        foundation
                )
        );
    }


    // =========================================================
    // REJECT FOUNDATION
    // PUT /api/admin/foundations/{id}/reject
    // =========================================================

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<FoundationResponse>>
    rejectFoundation(
            @PathVariable Long id,
            @RequestParam String reason
    ) {

        FoundationResponse foundation =
                adminFoundationService.rejectFoundation(
                        id,
                        reason
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Foundation rejected successfully",
                        foundation
                )
        );
    }
}
