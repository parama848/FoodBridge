package com.foodbridge.location.util;

public final class DistanceCalculator {

    private static final double EARTH_RADIUS_KM = 6371.0;

    private DistanceCalculator() {
        // Utility class
    }

    public static double calculateDistanceKm(
            double latitude1,
            double longitude1,
            double latitude2,
            double longitude2
    ) {

        double lat1Radians = Math.toRadians(latitude1);
        double lat2Radians = Math.toRadians(latitude2);

        double deltaLatitude =
                Math.toRadians(latitude2 - latitude1);

        double deltaLongitude =
                Math.toRadians(longitude2 - longitude1);

        double a =
                Math.sin(deltaLatitude / 2)
                        * Math.sin(deltaLatitude / 2)
                        +
                        Math.cos(lat1Radians)
                                * Math.cos(lat2Radians)
                                * Math.sin(deltaLongitude / 2)
                                * Math.sin(deltaLongitude / 2);

        double c =
                2 * Math.atan2(
                        Math.sqrt(a),
                        Math.sqrt(1 - a)
                );

        return EARTH_RADIUS_KM * c;
    }
}