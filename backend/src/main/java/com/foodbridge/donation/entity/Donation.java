package com.foodbridge.donation.entity;

import com.foodbridge.auth.entity.User;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.foundation.entity.Foundation;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "donations",
        indexes = {
                @Index(
                        name = "idx_donation_status",
                        columnList = "status"
                ),
                @Index(
                        name = "idx_donation_donor",
                        columnList = "donor_id"
                ),
                @Index(
                        name = "idx_donation_created_at",
                        columnList = "created_at"
                ),
                @Index(
                        name = "idx_donation_location",
                        columnList = "latitude, longitude"
                )
        }
)
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // DONOR
    // =========================================================

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "donor_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_donation_donor"
            )
    )
    private User donor;


    // =========================================================
    // FOOD INFORMATION
    // =========================================================

    @Column(
            nullable = false,
            length = 150
    )
    private String foodName;

    @Column(
            nullable = false,
            length = 100
    )
    private String foodType;

    @Column(nullable = false)
    private Double quantity;

    @Column(
            nullable = false,
            length = 30
    )
    private String quantityUnit;

    @Column(nullable = false)
    private LocalDateTime preparedAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;


    // =========================================================
    // PICKUP LOCATION
    // =========================================================

    @Column(
            nullable = false,
            length = 255
    )
    private String pickupAddress;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;


    // =========================================================
    // STATUS
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private DonationStatus status;


    // =========================================================
    // ACCEPTED FOUNDATION
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "accepted_foundation_id",
            foreignKey = @ForeignKey(
                    name = "fk_donation_foundation"
            )
    )
    private Foundation acceptedFoundation;


    // =========================================================
    // TIMESTAMPS
    // =========================================================

    @Column(
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;


    // =========================================================
    // LIFECYCLE
    // =========================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now =
                LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (status == null) {

            status =
                    DonationStatus.AVAILABLE;
        }
    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt =
                LocalDateTime.now();
    }


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public Donation() {
    }


    // =========================================================
    // GETTERS
    // =========================================================

    public Long getId() {
        return id;
    }

    public User getDonor() {
        return donor;
    }

    public String getFoodName() {
        return foodName;
    }

    public String getFoodType() {
        return foodType;
    }

    public Double getQuantity() {
        return quantity;
    }

    public String getQuantityUnit() {
        return quantityUnit;
    }

    public LocalDateTime getPreparedAt() {
        return preparedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public String getPickupAddress() {
        return pickupAddress;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public DonationStatus getStatus() {
        return status;
    }

    public Foundation getAcceptedFoundation() {
        return acceptedFoundation;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }


    // =========================================================
    // SETTERS
    // =========================================================

    public void setId(Long id) {
        this.id = id;
    }

    public void setDonor(User donor) {
        this.donor = donor;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public void setQuantityUnit(String quantityUnit) {
        this.quantityUnit = quantityUnit;
    }

    public void setPreparedAt(LocalDateTime preparedAt) {
        this.preparedAt = preparedAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setStatus(DonationStatus status) {
        this.status = status;
    }

    public void setAcceptedFoundation(
            Foundation acceptedFoundation
    ) {
        this.acceptedFoundation =
                acceptedFoundation;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt
    ) {
        this.updatedAt = updatedAt;
    }
}