package com.foodbridge.location.service;

import com.foodbridge.location.dto.request.LocationRequest;
import com.foodbridge.location.dto.response.DistanceResponse;

public interface LocationService {

    DistanceResponse calculateDistance(
            LocationRequest source,
            LocationRequest destination
    );
}