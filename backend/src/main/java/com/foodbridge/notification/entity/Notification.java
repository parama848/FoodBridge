package com.foodbridge.notification.entity;

import java.time.LocalDateTime;

import com.foodbridge.auth.entity.User;
import com.foodbridge.notification.enums.NotificationStatus;
import com.foodbridge.notification.enums.NotificationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "notifications",
        indexes = {

                @Index(
                        name = "idx_notification_recipient_created",
                        columnList = "recipient_id, created_at"
                ),

                @Index(
                        name = "idx_notification_recipient_status",
                        columnList = "recipient_id, status"
                ),

                @Index(
                        name = "idx_notification_reference",
                        columnList = "reference_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Notification {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // RECIPIENT
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "recipient_id",
            nullable = false
    )
    private User recipient;


    // =========================================================
    // TITLE
    // =========================================================

    @Column(
            nullable = false,
            length = 150
    )
    private String title;


    // =========================================================
    // MESSAGE
    // =========================================================

    @Column(
            nullable = false,
            length = 500
    )
    private String message;


    // =========================================================
    // TYPE
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 50
    )
    private NotificationType type;


    // =========================================================
    // STATUS
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private NotificationStatus status;


    // =========================================================
    // REFERENCE ID
    // =========================================================

    @Column(name = "reference_id")
    private Long referenceId;


    // =========================================================
    // CREATED AT
    // =========================================================

    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;


    // =========================================================
    // READ AT
    // =========================================================

    @Column(name = "read_at")
    private LocalDateTime readAt;


    // =========================================================
    // PRE PERSIST
    // =========================================================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (status == null) {
            status = NotificationStatus.UNREAD;
        }
    }
}