package com.foodbridge.notification.service;

import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;

import com.foodbridge.common.exception.NotificationNotFoundException;
import com.foodbridge.common.exception.UserNotFoundException;

import com.foodbridge.notification.dto.response.NotificationResponse;
import com.foodbridge.notification.entity.Notification;
import com.foodbridge.notification.enums.NotificationStatus;
import com.foodbridge.notification.enums.NotificationType;
import com.foodbridge.notification.event.NotificationCreatedEvent;
import com.foodbridge.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.context.ApplicationEventPublisher;

import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl
        implements NotificationService {


    private final NotificationRepository
            notificationRepository;


    private final UserRepository
            userRepository;


    private final ApplicationEventPublisher
            eventPublisher;


    // =========================================================
    // GET MY NOTIFICATIONS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications(
            String email
    ) {

        User user =
                getAuthenticatedUser(email);


        return notificationRepository
                .findByRecipientIdOrderByCreatedAtDesc(
                        user.getId(),
                        PageRequest.of(
                                0,
                                50
                        )
                )
                .getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET UNREAD NOTIFICATIONS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadNotifications(
            String email
    ) {

        User user =
                getAuthenticatedUser(email);


        return notificationRepository
                .findByRecipientIdAndStatusOrderByCreatedAtDesc(
                        user.getId(),
                        NotificationStatus.UNREAD,
                        PageRequest.of(
                                0,
                                50
                        )
                )
                .getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET UNREAD COUNT
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(
            String email
    ) {

        User user =
                getAuthenticatedUser(email);


        return notificationRepository
                .countByRecipientIdAndStatus(
                        user.getId(),
                        NotificationStatus.UNREAD
                );
    }


    // =========================================================
    // MARK ONE AS READ
    // =========================================================

    @Override
    public NotificationResponse markAsRead(
            String email,
            Long notificationId
    ) {

        User user =
                getAuthenticatedUser(email);


        Notification notification =
                notificationRepository
                        .findByIdAndRecipientId(
                                notificationId,
                                user.getId()
                        )
                        .orElseThrow(() ->
                                new NotificationNotFoundException(
                                        "Notification not found"
                                )
                        );


        if (
                notification.getStatus()
                        != NotificationStatus.READ
        ) {

            notification.setStatus(
                    NotificationStatus.READ
            );

            notification.setReadAt(
                    LocalDateTime.now()
            );
        }


        Notification savedNotification =
                notificationRepository.save(
                        notification
                );


        return mapToResponse(
                savedNotification
        );
    }


    // =========================================================
    // MARK ALL AS READ
    // =========================================================

    @Override
    public void markAllAsRead(
            String email
    ) {

        User user =
                getAuthenticatedUser(email);


        List<Notification> notifications =
                notificationRepository
                        .findByRecipientIdAndStatus(
                                user.getId(),
                                NotificationStatus.UNREAD
                        );


        if (notifications.isEmpty()) {
            return;
        }


        LocalDateTime now =
                LocalDateTime.now();


        for (
                Notification notification
                : notifications
        ) {

            notification.setStatus(
                    NotificationStatus.READ
            );

            notification.setReadAt(now);
        }


        notificationRepository.saveAll(
                notifications
        );
    }


    // =========================================================
    // CREATE NOTIFICATION
    // =========================================================

    @Override
    public NotificationResponse createNotification(

            User recipient,

            String title,

            String message,

            NotificationType type,

            Long referenceId

    ) {


        // -----------------------------------------------------
        // VALIDATE RECIPIENT
        // -----------------------------------------------------

        if (recipient == null) {

            throw new IllegalArgumentException(
                    "Notification recipient is required"
            );
        }


        // -----------------------------------------------------
        // VALIDATE TITLE
        // -----------------------------------------------------

        if (
                title == null ||
                        title.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Notification title is required"
            );
        }


        // -----------------------------------------------------
        // VALIDATE MESSAGE
        // -----------------------------------------------------

        if (
                message == null ||
                        message.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Notification message is required"
            );
        }


        // -----------------------------------------------------
        // VALIDATE TYPE
        // -----------------------------------------------------

        if (type == null) {

            throw new IllegalArgumentException(
                    "Notification type is required"
            );
        }


        // =====================================================
        // CREATE ENTITY
        // =====================================================

        Notification notification =
                new Notification();


        notification.setRecipient(
                recipient
        );


        notification.setTitle(
                title.trim()
        );


        notification.setMessage(
                message.trim()
        );


        notification.setType(
                type
        );


        notification.setStatus(
                NotificationStatus.UNREAD
        );


        notification.setReferenceId(
                referenceId
        );


        // =====================================================
        // SAVE
        // =====================================================

        Notification savedNotification =
                notificationRepository.save(
                        notification
                );


        // =====================================================
        // MAP RESPONSE
        // =====================================================

        NotificationResponse response =
                mapToResponse(
                        savedNotification
                );


        // =====================================================
        // REAL-TIME EVENT
        // =====================================================

        /*
         * Important:
         *
         * We DON'T directly call WebSocket here.
         *
         * The event listener sends it AFTER
         * the transaction commits.
         */

        eventPublisher.publishEvent(
                new NotificationCreatedEvent(
                        recipient.getEmail(),
                        response
                )
        );


        return response;
    }


    // =========================================================
    // GET AUTHENTICATED USER
    // =========================================================

    private User getAuthenticatedUser(
            String email
    ) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Authenticated user not found"
                        )
                );
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private NotificationResponse mapToResponse(
            Notification notification
    ) {

        return new NotificationResponse(

                notification.getId(),

                notification.getTitle(),

                notification.getMessage(),

                notification.getType(),

                notification.getStatus(),

                notification.getReferenceId(),

                notification.getCreatedAt(),

                notification.getReadAt()

        );
    }
}