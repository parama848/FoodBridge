package com.foodbridge.auth.config;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.Role;
import com.foodbridge.auth.entity.User;
import com.foodbridge.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@gmail.com";

        // ---------------------------------------------------------
        // Check whether admin already exists
        // ---------------------------------------------------------

        if (userRepository.existsByEmail(adminEmail)) {

            System.out.println(
                    "Admin user already exists: " + adminEmail
            );

            return;
        }

        // ---------------------------------------------------------
        // Create Admin
        // ---------------------------------------------------------

        User admin = new User();

        admin.setName("FoodBridge Admin");
        admin.setEmail(adminEmail);

        admin.setPassword(
                passwordEncoder.encode("Admin@12345")
        );

        admin.setPhone("9999999999");

        admin.setRole(Role.ADMIN);
        admin.setStatus(AccountStatus.ACTIVE);

        LocalDateTime now = LocalDateTime.now();

        admin.setCreatedAt(now);
        admin.setUpdatedAt(now);

        userRepository.save(admin);

        System.out.println(
                "=========================================="
        );

        System.out.println(
                "FoodBridge Admin created successfully"
        );

        System.out.println(
                "Email    : " + adminEmail
        );

        System.out.println(
                "Password : Admin@12345"
        );

        System.out.println(
                "=========================================="
        );
    }
}