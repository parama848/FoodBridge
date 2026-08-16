package com.foodbridge.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.UserResponse;
import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;
import com.foodbridge.common.exception.UserAlreadyExistsException;
import com.foodbridge.common.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    // =========================================================
    // CREATE USER
    // =========================================================

    @Override
    public UserResponse createUser(
            RegisterRequest request
    ) {

        // -----------------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------------

        String email =
                request.email()
                        .trim()
                        .toLowerCase();


        // -----------------------------------------------------
        // CHECK DUPLICATE EMAIL
        // -----------------------------------------------------

        if (userRepository.existsByEmail(email)) {

            throw new UserAlreadyExistsException(
                    "An account with this email already exists"
            );
        }


        // -----------------------------------------------------
        // CREATE USER
        // -----------------------------------------------------

        User user = new User();

        user.setName(
                request.name()
                        .trim()
        );

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        request.password()
                )
        );


        // -----------------------------------------------------
        // PHONE
        // -----------------------------------------------------

        if (request.phone() != null
                && !request.phone().isBlank()) {

            user.setPhone(
                    request.phone()
                            .trim()
            );
        }


        // -----------------------------------------------------
        // ROLE
        // -----------------------------------------------------

        user.setRole(
                request.role()
        );


        // -----------------------------------------------------
        // ACCOUNT STATUS
        // -----------------------------------------------------

        user.setStatus(
                AccountStatus.ACTIVE
        );


        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapToResponse(savedUser);
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User not found with id: " + id
                                )
                        );

        return mapToResponse(user);
    }


    // =========================================================
    // GET ALL USERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // UPDATE USER
    // =========================================================

    @Override
    public UserResponse updateUser(
            Long id,
            RegisterRequest request
    ) {

        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User not found with id: " + id
                                )
                        );


        // -----------------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------------

        String newEmail =
                request.email()
                        .trim()
                        .toLowerCase();


        // -----------------------------------------------------
        // CHECK EMAIL CHANGE
        // -----------------------------------------------------

        if (!user.getEmail()
                .equalsIgnoreCase(newEmail)
                && userRepository.existsByEmail(newEmail)) {

            throw new UserAlreadyExistsException(
                    "An account with this email already exists"
            );
        }


        // -----------------------------------------------------
        // UPDATE BASIC DETAILS
        // -----------------------------------------------------

        user.setName(
                request.name()
                        .trim()
        );

        user.setEmail(newEmail);


        // -----------------------------------------------------
        // UPDATE PHONE
        // -----------------------------------------------------

        if (request.phone() != null
                && !request.phone().isBlank()) {

            user.setPhone(
                    request.phone()
                            .trim()
            );

        } else {

            user.setPhone(null);
        }


        // -----------------------------------------------------
        // UPDATE ROLE
        // -----------------------------------------------------

        user.setRole(
                request.role()
        );


        // -----------------------------------------------------
        // UPDATE PASSWORD
        // -----------------------------------------------------

        if (request.password() != null
                && !request.password().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(
                            request.password()
                    )
            );
        }


        // -----------------------------------------------------
        // UPDATE TIMESTAMP
        // -----------------------------------------------------

        user.setUpdatedAt(
                LocalDateTime.now()
        );


        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        User updatedUser =
                userRepository.save(user);


        return mapToResponse(updatedUser);
    }


    // =========================================================
    // DELETE USER
    // =========================================================

    @Override
    public void deleteUser(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User not found with id: " + id
                                )
                        );


        // -----------------------------------------------------
        // SOFT DELETE
        // -----------------------------------------------------

        user.setStatus(
                AccountStatus.INACTIVE
        );

        user.setUpdatedAt(
                LocalDateTime.now()
        );


        userRepository.save(user);
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private UserResponse mapToResponse(
            User user
    ) {

        return new UserResponse(
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