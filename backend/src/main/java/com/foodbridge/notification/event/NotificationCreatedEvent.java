package com.foodbridge.notification.event;

import com.foodbridge.notification.dto.response.NotificationResponse;

public record NotificationCreatedEvent(

        String recipientEmail,

        NotificationResponse notification

) {
}