package com.foodbridge.common.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import com.foodbridge.common.response.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        private static final Logger log = LoggerFactory.getLogger(
                        GlobalExceptionHandler.class);

        // =========================================================
        // INVALID CREDENTIALS
        // =========================================================

        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidCredentials(
                        InvalidCredentialsException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.UNAUTHORIZED,
                                "INVALID_CREDENTIALS",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // INACTIVE ACCOUNT
        // =========================================================

        @ExceptionHandler(InactiveAccountException.class)
        public ResponseEntity<ApiResponse<Void>> handleInactiveAccount(
                        InactiveAccountException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.FORBIDDEN,
                                "ACCOUNT_INACTIVE",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // FOUNDATION NOT FOUND
        // =========================================================

        @ExceptionHandler(FoundationNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleFoundationNotFound(
                        FoundationNotFoundException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.NOT_FOUND,
                                "FOUNDATION_NOT_FOUND",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // DUPLICATE FOUNDATION
        // =========================================================

        @ExceptionHandler(DuplicateFoundationException.class)
        public ResponseEntity<ApiResponse<Void>> handleDuplicateFoundation(
                        DuplicateFoundationException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.CONFLICT,
                                "DUPLICATE_FOUNDATION",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // INVALID FOUNDATION STATUS
        // =========================================================

        @ExceptionHandler(InvalidFoundationStatusException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidFoundationStatus(
                        InvalidFoundationStatusException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_FOUNDATION_STATUS",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // REJECTION REASON REQUIRED
        // =========================================================

        @ExceptionHandler(RejectionReasonRequiredException.class)
        public ResponseEntity<ApiResponse<Void>> handleRejectionReasonRequired(
                        RejectionReasonRequiredException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "REJECTION_REASON_REQUIRED",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // USER NOT FOUND
        // =========================================================

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleUserNotFound(
                        UserNotFoundException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.NOT_FOUND,
                                "USER_NOT_FOUND",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // ACCESS DENIED
        // =========================================================

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ApiResponse<Void>> handleAccessDenied(
                        AccessDeniedException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.FORBIDDEN,
                                "ACCESS_DENIED",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // VALIDATION ERRORS
        // =========================================================

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Void>> handleValidationErrors(
                        MethodArgumentNotValidException exception,
                        HttpServletRequest request) {

                Map<String, String> errors = new LinkedHashMap<>();

                exception.getBindingResult()
                                .getFieldErrors()
                                .forEach(error -> errors.put(
                                                error.getField(),
                                                error.getDefaultMessage()));

                return buildValidationResponse(
                                errors,
                                request.getRequestURI());
        }

        // =========================================================
        // CONSTRAINT VALIDATION ERRORS
        // =========================================================

        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity<ApiResponse<Void>> handleConstraintViolation(
                        ConstraintViolationException exception,
                        HttpServletRequest request) {

                Map<String, String> errors = new LinkedHashMap<>();

                exception.getConstraintViolations()
                                .forEach(violation -> errors.put(
                                                violation
                                                                .getPropertyPath()
                                                                .toString(),
                                                violation.getMessage()));

                return buildValidationResponse(
                                errors,
                                request.getRequestURI());
        }

        // =========================================================
        // INVALID DONATION STATUS
        // =========================================================

        @ExceptionHandler(InvalidDonationStatusException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidDonationStatus(
                        InvalidDonationStatusException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_DONATION_STATUS",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // DONATION NOT FOUND
        // =========================================================

        @ExceptionHandler(DonationNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleDonationNotFound(
                        DonationNotFoundException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.NOT_FOUND,
                                "DONATION_NOT_FOUND",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // INVALID JSON REQUEST
        // =========================================================

        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidJson(
                        HttpMessageNotReadableException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_JSON",
                                "Request body is invalid or malformed",
                                request.getRequestURI());
        }

        // =========================================================
        // INVALID REQUEST PARAMETER TYPE
        // =========================================================

        @ExceptionHandler(MethodArgumentTypeMismatchException.class)
        public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(
                        MethodArgumentTypeMismatchException exception,
                        HttpServletRequest request) {

                String message = "Invalid value for parameter: "
                                + exception.getName();

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_PARAMETER",
                                message,
                                request.getRequestURI());
        }

        // =========================================================
        // MISSING REQUEST PARAMETER
        // =========================================================

        @ExceptionHandler(MissingServletRequestParameterException.class)
        public ResponseEntity<ApiResponse<Void>> handleMissingParameter(
                        MissingServletRequestParameterException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "MISSING_PARAMETER",
                                "Required parameter is missing: "
                                                + exception.getParameterName(),
                                request.getRequestURI());
        }

        // =========================================================
        // ILLEGAL ARGUMENT
        // =========================================================

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ApiResponse<Void>> handleIllegalArgument(
                        IllegalArgumentException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_REQUEST",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // ILLEGAL STATE
        // =========================================================

        @ExceptionHandler(IllegalStateException.class)
        public ResponseEntity<ApiResponse<Void>> handleIllegalState(
                        IllegalStateException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.CONFLICT,
                                "INVALID_STATE",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // DATABASE INTEGRITY ERROR
        // =========================================================

        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ApiResponse<Void>> handleDataIntegrityViolation(
                        DataIntegrityViolationException exception,
                        HttpServletRequest request) {

                log.error(
                                "Database integrity violation at {}",
                                request.getRequestURI(),
                                exception);

                return buildErrorResponse(
                                HttpStatus.CONFLICT,
                                "DATA_INTEGRITY_ERROR",
                                "The request could not be completed because it conflicts with existing data",
                                request.getRequestURI());
        }

        // =========================================================
        // DATABASE ACCESS ERROR
        // =========================================================

        @ExceptionHandler(DataAccessException.class)
        public ResponseEntity<ApiResponse<Void>> handleDataAccessException(
                        DataAccessException exception,
                        HttpServletRequest request) {

                log.error(
                                "Database access error at {}",
                                request.getRequestURI(),
                                exception);

                return buildErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "DATABASE_ERROR",
                                "A database error occurred while processing the request",
                                request.getRequestURI());
        }

        // =========================================================
        // HTTP METHOD NOT SUPPORTED
        // =========================================================

        @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
        public ResponseEntity<ApiResponse<Void>> handleMethodNotSupported(
                        HttpRequestMethodNotSupportedException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.METHOD_NOT_ALLOWED,
                                "METHOD_NOT_ALLOWED",
                                "HTTP method is not supported for this endpoint",
                                request.getRequestURI());
        }

        // =========================================================
        // MEDIA TYPE NOT SUPPORTED
        // =========================================================

        @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
        public ResponseEntity<ApiResponse<Void>> handleMediaTypeNotSupported(
                        HttpMediaTypeNotSupportedException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                                "UNSUPPORTED_MEDIA_TYPE",
                                "The requested media type is not supported",
                                request.getRequestURI());
        }

        // =========================================================
        // RESPONSE STATUS EXCEPTION
        // =========================================================

        @ExceptionHandler(ResponseStatusException.class)
        public ResponseEntity<ApiResponse<Void>> handleResponseStatusException(
                        ResponseStatusException exception,
                        HttpServletRequest request) {

                String message = exception.getReason() != null
                                ? exception.getReason()
                                : "Request failed";

                return buildErrorResponse(
                                HttpStatus.valueOf(
                                                exception.getStatusCode().value()),
                                "REQUEST_FAILED",
                                message,
                                request.getRequestURI());
        }

        // =========================================================
        // USER ALREADY EXISTS
        // =========================================================

        @ExceptionHandler(UserAlreadyExistsException.class)
        public ResponseEntity<ApiResponse<Void>> handleUserAlreadyExists(
                        UserAlreadyExistsException exception,
                        HttpServletRequest request) {

                return buildErrorResponse(
                                HttpStatus.CONFLICT,
                                "USER_ALREADY_EXISTS",
                                exception.getMessage(),
                                request.getRequestURI());
        }

        // =========================================================
        // GENERAL FALLBACK
        // =========================================================

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleGeneralException(
                        Exception exception,
                        HttpServletRequest request) {

                /*
                 * IMPORTANT:
                 *
                 * Never expose internal exception details
                 * to the client.
                 *
                 * Log the complete exception internally.
                 */

                log.error(
                                "Unhandled exception at {}",
                                request.getRequestURI(),
                                exception);

                return buildErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "INTERNAL_SERVER_ERROR",
                                "An unexpected error occurred",
                                request.getRequestURI());
        }

        // =========================================================
        // ERROR RESPONSE BUILDER
        // =========================================================

        private ResponseEntity<ApiResponse<Void>> buildErrorResponse(
                        HttpStatus status,
                        String errorCode,
                        String message,
                        String path) {

                ApiResponse<Void> response = ApiResponse.error(
                                message,
                                errorCode,
                                path);

                return ResponseEntity
                                .status(status)
                                .body(response);
        }

        // =========================================================
        // VALIDATION RESPONSE BUILDER
        // =========================================================

        private ResponseEntity<ApiResponse<Void>> buildValidationResponse(
                        Map<String, String> errors,
                        String path) {

                ApiResponse<Void> response = ApiResponse.validationError(
                                "Validation failed",
                                "VALIDATION_ERROR",
                                path,
                                errors);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }
}