package com.foodbridge.common.exception;

public class InvalidDonationStatusException
        extends RuntimeException {

    public InvalidDonationStatusException(String message) {
        super(message);
    }
}
