package com.foodbridge.common.exception;

public class DonationNotFoundException
        extends RuntimeException {

    public DonationNotFoundException(String message) {
        super(message);
    }
}