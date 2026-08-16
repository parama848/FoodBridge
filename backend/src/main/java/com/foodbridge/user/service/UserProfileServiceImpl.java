package com.foodbridge.user.service;

import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;
import com.foodbridge.user.dto.request.UpdateProfileRequest;
import com.foodbridge.user.dto.response.UserProfileResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;

    @Override
    public UserProfileResponse getCurrentUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + email
                        )
                );

        return mapToResponse(user);
    }

    @Override
    public UserProfileResponse updateCurrentUser(
            String email,
            UpdateProfileRequest request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + email
                        )
                );

        String newEmail = request.email()
                .trim()
                .toLowerCase();

        // Check whether the new email belongs to another user
        if (!user.getEmail().equalsIgnoreCase(newEmail)
                && userRepository.existsByEmail(newEmail)) {

            throw new RuntimeException("Email already registered");
        }

        user.setName(request.name());
        user.setEmail(newEmail);
        user.setPhone(request.phone());
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    private UserProfileResponse mapToResponse(User user) {

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getStatus(),
                user.getCreatedAt()
        );
    }
}