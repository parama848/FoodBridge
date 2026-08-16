-- =========================================================
-- FOODBRIDGE 2.0
-- V1 - INITIAL DATABASE SCHEMA
-- MySQL 8+
-- =========================================================


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (

    id BIGINT NOT NULL AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    role VARCHAR(20) NOT NULL,

    status VARCHAR(20) NOT NULL,

    created_at DATETIME(6) NOT NULL,

    updated_at DATETIME(6) NOT NULL,

    CONSTRAINT pk_users
        PRIMARY KEY (id),

    CONSTRAINT uk_users_email
        UNIQUE (email)

) ENGINE=InnoDB;


-- =========================================================
-- FOUNDATIONS
-- =========================================================

CREATE TABLE foundations (

    id BIGINT NOT NULL AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    organization_name VARCHAR(150) NOT NULL,

    registration_number VARCHAR(100) NOT NULL,

    address VARCHAR(255) NOT NULL,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    pincode VARCHAR(10) NOT NULL,

    latitude DOUBLE NOT NULL,

    longitude DOUBLE NOT NULL,

    verification_status VARCHAR(20) NOT NULL,

    rejection_reason VARCHAR(500),

    verified_at DATETIME(6),

    created_at DATETIME(6) NOT NULL,

    updated_at DATETIME(6) NOT NULL,

    CONSTRAINT pk_foundations
        PRIMARY KEY (id),

    CONSTRAINT uk_foundation_registration_number
        UNIQUE (registration_number),

    CONSTRAINT uk_foundations_user
        UNIQUE (user_id),

    CONSTRAINT fk_foundation_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)

) ENGINE=InnoDB;


-- =========================================================
-- DONATIONS
-- =========================================================

CREATE TABLE donations (

    id BIGINT NOT NULL AUTO_INCREMENT,

    donor_id BIGINT NOT NULL,

    food_name VARCHAR(150) NOT NULL,

    food_type VARCHAR(100) NOT NULL,

    quantity DOUBLE NOT NULL,

    quantity_unit VARCHAR(30) NOT NULL,

    prepared_at DATETIME(6) NOT NULL,

    expires_at DATETIME(6) NOT NULL,

    pickup_address VARCHAR(255) NOT NULL,

    latitude DOUBLE NOT NULL,

    longitude DOUBLE NOT NULL,

    status VARCHAR(20) NOT NULL,

    accepted_foundation_id BIGINT,

    created_at DATETIME(6) NOT NULL,

    updated_at DATETIME(6) NOT NULL,

    CONSTRAINT pk_donations
        PRIMARY KEY (id),

    CONSTRAINT fk_donation_donor
        FOREIGN KEY (donor_id)
        REFERENCES users(id),

    CONSTRAINT fk_donation_foundation
        FOREIGN KEY (accepted_foundation_id)
        REFERENCES foundations(id)

) ENGINE=InnoDB;


-- =========================================================
-- DONATION INDEXES
-- =========================================================

CREATE INDEX idx_donation_status
    ON donations(status);

CREATE INDEX idx_donation_donor
    ON donations(donor_id);

CREATE INDEX idx_donation_created_at
    ON donations(created_at);

CREATE INDEX idx_donation_location
    ON donations(latitude, longitude);


-- =========================================================
-- NOTIFICATIONS
-- =========================================================

CREATE TABLE notifications (

    id BIGINT NOT NULL AUTO_INCREMENT,

    recipient_id BIGINT NOT NULL,

    title VARCHAR(150) NOT NULL,

    message VARCHAR(500) NOT NULL,

    type VARCHAR(50) NOT NULL,

    status VARCHAR(20) NOT NULL,

    reference_id BIGINT,

    created_at DATETIME(6) NOT NULL,

    read_at DATETIME(6),

    CONSTRAINT pk_notifications
        PRIMARY KEY (id),

    CONSTRAINT fk_notification_recipient
        FOREIGN KEY (recipient_id)
        REFERENCES users(id)

) ENGINE=InnoDB;


-- =========================================================
-- NOTIFICATION INDEXES
-- =========================================================

CREATE INDEX idx_notification_recipient_created
    ON notifications(recipient_id, created_at);

CREATE INDEX idx_notification_recipient_status
    ON notifications(recipient_id, status);

CREATE INDEX idx_notification_reference
    ON notifications(reference_id);