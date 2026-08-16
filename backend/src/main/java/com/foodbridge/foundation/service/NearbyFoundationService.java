package com.foodbridge.foundation.service;

import com.foodbridge.foundation.entity.Foundation;

import java.util.List;

public interface NearbyFoundationService {

    // =========================================================
    // FIND VERIFIED FOUNDATIONS NEAR DONATION
    // =========================================================

    List<Foundation> findNearbyVerifiedFoundations(
            Double latitude,
            Double longitude
    );
}