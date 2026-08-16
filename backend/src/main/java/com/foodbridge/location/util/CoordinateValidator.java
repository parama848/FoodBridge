package com.foodbridge.location.util;

public final class CoordinateValidator {

    private CoordinateValidator() {
        // Utility class
    }


    // =========================================================
    // VALIDATE LATITUDE
    // =========================================================

    public static boolean isValidLatitude(
            double latitude
    ) {

        return !Double.isNaN(latitude)
                && !Double.isInfinite(latitude)
                && latitude >= -90.0
                && latitude <= 90.0;
    }


    // =========================================================
    // VALIDATE LONGITUDE
    // =========================================================

    public static boolean isValidLongitude(
            double longitude
    ) {

        return !Double.isNaN(longitude)
                && !Double.isInfinite(longitude)
                && longitude >= -180.0
                && longitude <= 180.0;
    }


    // =========================================================
    // VALIDATE BOTH
    // =========================================================

    public static boolean isValidCoordinate(
            double latitude,
            double longitude
    ) {

        return isValidLatitude(latitude)
                && isValidLongitude(longitude);
    }
}