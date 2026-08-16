package com.foodbridge.notification.repository;

import com.foodbridge.notification.entity.Notification;
import com.foodbridge.notification.enums.NotificationStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {


    // =========================================================
    // ALL USER NOTIFICATIONS
    // =========================================================

    Page<Notification> findByRecipientIdOrderByCreatedAtDesc(
            Long recipientId,
            Pageable pageable
    );


    // =========================================================
    // USER NOTIFICATIONS BY STATUS
    // =========================================================

    Page<Notification> findByRecipientIdAndStatusOrderByCreatedAtDesc(
            Long recipientId,
            NotificationStatus status,
            Pageable pageable
    );


    // =========================================================
    // UNREAD COUNT
    // =========================================================

    long countByRecipientIdAndStatus(
            Long recipientId,
            NotificationStatus status
    );


    // =========================================================
    // USER-SPECIFIC NOTIFICATION
    // =========================================================

    Optional<Notification> findByIdAndRecipientId(
            Long notificationId,
            Long recipientId
    );


    // =========================================================
    // ALL UNREAD
    // =========================================================

    List<Notification> findByRecipientIdAndStatus(
            Long recipientId,
            NotificationStatus status
    );
}