package com.foodbridge.notification.service;

import com.foodbridge.auth.entity.User;
import com.foodbridge.notification.dto.response.NotificationResponse;
import com.foodbridge.notification.enums.NotificationType;

import java.util.List;

public interface NotificationService {


    // =========================================================
    // GET MY NOTIFICATIONS
    // =========================================================

    List<NotificationResponse> getMyNotifications(
            String email
    );


    // =========================================================
    // GET UNREAD
    // =========================================================

    List<NotificationResponse> getUnreadNotifications(
            String email
    );


    // =========================================================
    // UNREAD COUNT
    // =========================================================

    long getUnreadCount(
            String email
    );


    // =========================================================
    // MARK ONE AS READ
    // =========================================================

    NotificationResponse markAsRead(
            String email,
            Long notificationId
    );


    // =========================================================
    // MARK ALL AS READ
    // =========================================================

    void markAllAsRead(
            String email
    );


    // =========================================================
    // CREATE NOTIFICATION
    // =========================================================

    NotificationResponse createNotification(

            User recipient,

            String title,

            String message,

            NotificationType type,

            Long referenceId

    );
}