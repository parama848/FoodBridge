package com.foodbridge.notification.service;

import com.foodbridge.notification.dto.response.NotificationResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationWebSocketService {


    private final SimpMessagingTemplate messagingTemplate;


    // =========================================================
    // SEND PRIVATE USER NOTIFICATION
    // =========================================================

    public void sendNotification(
            String recipientEmail,
            NotificationResponse notification
    ) {

        if (
                recipientEmail == null ||
                        recipientEmail.isBlank() ||
                        notification == null
        ) {
            return;
        }


        messagingTemplate.convertAndSendToUser(
                recipientEmail,
                "/queue/notifications",
                notification
        );
    }
}