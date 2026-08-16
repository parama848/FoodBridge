package com.foodbridge.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.foodbridge.admin.dto.request.UpdateUserStatusRequest;
import com.foodbridge.admin.dto.response.AdminUserResponse;
import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.Role;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;
import com.foodbridge.common.exception.AccessDeniedException;
import com.foodbridge.common.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl
        implements AdminUserService {


    private final UserRepository userRepository;


    // =========================================================
    // GET USERS
    // =========================================================

    @Override
    public Page<AdminUserResponse> getUsers(
            String search,
            String role,
            String status,
            Pageable pageable
    ) {

        String normalizedSearch = normalizeSearch(search);

        Role parsedRole = parseRole(role);

        AccountStatus parsedStatus =
                parseStatus(status);


        Page<User> users =
                userRepository.searchUsers(
                        normalizedSearch,
                        parsedRole,
                        parsedStatus,
                        pageable
                );


        return users.map(
                this::mapToResponse
        );
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    @Override
    public AdminUserResponse getUserById(
            Long userId
    ) {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User not found"
                                )
                        );


        return mapToResponse(user);
    }


    // =========================================================
    // UPDATE ACCOUNT STATUS
    // =========================================================

    @Override
    public AdminUserResponse updateUserStatus(
            String adminEmail,
            Long userId,
            UpdateUserStatusRequest request
    ) {

        User admin =
                userRepository
                        .findByEmail(adminEmail)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "Authenticated admin not found"
                                )
                        );


        // =====================================================
        // SECURITY
        // =====================================================
        //
        // Admin cannot deactivate their own account.
        //
        // Otherwise they could immediately lose access to
        // the administration panel.
        //
        // =====================================================

        if (admin.getId().equals(userId)
                && request.status()
                == AccountStatus.INACTIVE) {

            throw new AccessDeniedException(
                    "You cannot deactivate your own admin account"
            );
        }


        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User not found"
                                )
                        );


        // =====================================================
        // PROTECT ADMIN ACCOUNTS
        // =====================================================
        //
        // For the current Admin User Management module,
        // an admin should not be able to deactivate another
        // ADMIN accidentally.
        //
        // Admin lifecycle management can be added separately
        // later with stronger controls.
        //
        // =====================================================

        if (user.getRole() == Role.ADMIN
                && request.status()
                == AccountStatus.INACTIVE) {

            throw new AccessDeniedException(
                    "Admin accounts cannot be deactivated from user management"
            );
        }


        // =====================================================
        // UPDATE STATUS
        // =====================================================

        user.setStatus(
                request.status()
        );


        User updatedUser =
                userRepository.save(user);


        return mapToResponse(
                updatedUser
        );
    }


    // =========================================================
    // NORMALIZE SEARCH
    // =========================================================

    private String normalizeSearch(
            String search
    ) {

        if (search == null) {
            return null;
        }

        String value =
                search.trim();

        return value.isEmpty()
                ? null
                : value;
    }


    // =========================================================
    // PARSE ROLE
    // =========================================================

    private Role parseRole(
            String role
    ) {

        if (role == null
                || role.trim().isEmpty()) {

            return null;
        }


        try {

            return Role.valueOf(
                    role.trim().toUpperCase()
            );

        } catch (IllegalArgumentException exception) {

            throw new IllegalArgumentException(
                    "Invalid user role: " + role
            );
        }
    }


    // =========================================================
    // PARSE STATUS
    // =========================================================

    private AccountStatus parseStatus(
            String status
    ) {

        if (status == null
                || status.trim().isEmpty()) {

            return null;
        }


        try {

            return AccountStatus.valueOf(
                    status.trim().toUpperCase()
            );

        } catch (IllegalArgumentException exception) {

            throw new IllegalArgumentException(
                    "Invalid account status: " + status
            );
        }
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private AdminUserResponse mapToResponse(
            User user
    ) {

        return new AdminUserResponse(

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getPhone(),

                user.getRole(),

                user.getStatus(),

                user.getCreatedAt(),

                user.getUpdatedAt()
        );
    }
}