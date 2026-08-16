package com.foodbridge.notification.controller;

import com.foodbridge.common.response.ApiResponse;
import com.foodbridge.notification.dto.response.NotificationResponse;
import com.foodbridge.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {


    private final NotificationService notificationService;


    // =========================================================
    // GET MY NOTIFICATIONS
    // GET /api/notifications
    // =========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>>
    getMyNotifications(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        List<NotificationResponse> notifications =
                notificationService.getMyNotifications(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Notifications retrieved successfully",
                        notifications
                )
        );
    }


    // =========================================================
    // GET UNREAD NOTIFICATIONS
    // GET /api/notifications/unread
    // =========================================================

    @GetMapping("/unread")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>>
    getUnreadNotifications(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        List<NotificationResponse> notifications =
                notificationService.getUnreadNotifications(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Unread notifications retrieved successfully",
                        notifications
                )
        );
    }


    // =========================================================
    // GET UNREAD COUNT
    // GET /api/notifications/unread/count
    // =========================================================

    @GetMapping("/unread/count")
    public ResponseEntity<ApiResponse<Long>>
    getUnreadCount(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        long count =
                notificationService.getUnreadCount(email);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Unread notification count retrieved successfully",
                        count
                )
        );
    }


    // =========================================================
    // MARK NOTIFICATION AS READ
    // PATCH /api/notifications/{id}/read
    // =========================================================

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<NotificationResponse>>
    markAsRead(

            Authentication authentication,

            @PathVariable
            Long id

    ) {

        String email =
                authentication.getName();

        NotificationResponse notification =
                notificationService.markAsRead(
                        email,
                        id
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Notification marked as read successfully",
                        notification
                )
        );
    }


    // =========================================================
    // MARK ALL NOTIFICATIONS AS READ
    // PATCH /api/notifications/read-all
    // =========================================================

    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>>
    markAllAsRead(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        notificationService.markAllAsRead(
                email
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "All notifications marked as read successfully",
                        null
                )
        );
    }
}