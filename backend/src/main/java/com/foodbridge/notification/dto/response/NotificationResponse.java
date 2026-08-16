package com.foodbridge.notification.dto.response;

import com.foodbridge.notification.enums.NotificationStatus;
import com.foodbridge.notification.enums.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(

        Long id,

        String title,

        String message,

        NotificationType type,

        NotificationStatus status,

        Long referenceId,

        LocalDateTime createdAt,

        LocalDateTime readAt

) {
}