package com.foodbridge.common.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiResponse<T>(

        boolean success,

        String message,

        T data,

        LocalDateTime timestamp,

        String errorCode,

        String path,

        Map<String, String> errors

) {

    // =========================================================
    // SUCCESS WITH DATA
    // =========================================================

    public static <T> ApiResponse<T> success(
            String message,
            T data
    ) {

        return new ApiResponse<>(
                true,
                message,
                data,
                LocalDateTime.now(),
                null,
                null,
                null
        );
    }


    // =========================================================
    // SUCCESS WITHOUT DATA
    // =========================================================

    public static <T> ApiResponse<T> success(
            String message
    ) {

        return new ApiResponse<>(
                true,
                message,
                null,
                LocalDateTime.now(),
                null,
                null,
                null
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    public static <T> ApiResponse<T> error(
            String message,
            String errorCode,
            String path
    ) {

        return new ApiResponse<>(
                false,
                message,
                null,
                LocalDateTime.now(),
                errorCode,
                path,
                null
        );
    }


    // =========================================================
    // VALIDATION ERROR
    // =========================================================

    public static <T> ApiResponse<T> validationError(
            String message,
            String errorCode,
            String path,
            Map<String, String> errors
    ) {

        return new ApiResponse<>(
                false,
                message,
                null,
                LocalDateTime.now(),
                errorCode,
                path,
                errors
        );
    }
}