package com.foodbridge.notification.event;

import com.foodbridge.notification.service.NotificationWebSocketService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class NotificationWebSocketEventListener {


    private final NotificationWebSocketService
            notificationWebSocketService;


    // =========================================================
    // SEND AFTER DATABASE TRANSACTION COMMITS
    // =========================================================

    @TransactionalEventListener(
            phase = TransactionPhase.AFTER_COMMIT
    )
    public void handleNotificationCreated(
            NotificationCreatedEvent event
    ) {

        if (event == null) {
            return;
        }


        notificationWebSocketService.sendNotification(
                event.recipientEmail(),
                event.notification()
        );
    }
}