// package com.foodbridge.auth.service;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.foodbridge.auth.dto.request.LoginRequest;
// import com.foodbridge.auth.dto.response.LoginResponse;
// import com.foodbridge.auth.dto.response.UserResponse;
// import com.foodbridge.auth.entity.AccountStatus;
// import com.foodbridge.auth.entity.User;
// import com.foodbridge.auth.repository.UserRepository;
// import com.foodbridge.auth.security.JwtService;
// import com.foodbridge.common.exception.InactiveAccountException;
// import com.foodbridge.common.exception.InvalidCredentialsException;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// @Transactional
// public class AuthServiceImpl
//         implements AuthService {


//     private final UserRepository userRepository;

//     private final PasswordEncoder passwordEncoder;

//     private final JwtService jwtService;


//     // =========================================================
//     // LOGIN
//     // =========================================================

//     @Override
//     public LoginResponse login(
//             LoginRequest request
//     ) {

//         // -----------------------------------------------------
//         // NORMALIZE EMAIL
//         // -----------------------------------------------------

//         String email =
//                 request.email()
//                         .trim()
//                         .toLowerCase();


//         // -----------------------------------------------------
//         // FIND USER
//         // -----------------------------------------------------

//         User user =
//                 userRepository
//                         .findByEmail(email)
//                         .orElseThrow(() ->
//                                 new InvalidCredentialsException(
//                                         "Invalid email or password"
//                                 )
//                         );


//         // -----------------------------------------------------
//         // CHECK ACCOUNT STATUS
//         // -----------------------------------------------------

//         if (user.getStatus()
//                 != AccountStatus.ACTIVE) {

//             throw new InactiveAccountException(
//                     "User account is not active"
//             );
//         }


//         // -----------------------------------------------------
//         // VERIFY PASSWORD
//         // -----------------------------------------------------

//         boolean passwordMatches =
//                 passwordEncoder.matches(
//                         request.password(),
//                         user.getPassword()
//                 );


//         if (!passwordMatches) {

//             throw new InvalidCredentialsException(
//                     "Invalid email or password"
//             );
//         }


//         // -----------------------------------------------------
//         // GENERATE JWT
//         // -----------------------------------------------------

//         String token =
//                 jwtService.generateToken(user);


//         // -----------------------------------------------------
//         // USER RESPONSE
//         // -----------------------------------------------------

//         UserResponse userResponse =
//                 new UserResponse(
//                         user.getId(),
//                         user.getName(),
//                         user.getEmail(),
//                         user.getPhone(),
//                         user.getRole(),
//                         user.getStatus(),
//                         user.getCreatedAt()
//                 );


//         // -----------------------------------------------------
//         // LOGIN RESPONSE
//         // -----------------------------------------------------

//         return new LoginResponse(
//                 token,
//                 "Bearer",
//                 userResponse
//         );
//     }
// }

package com.foodbridge.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;

import com.foodbridge.auth.dto.response.LoginResponse;
import com.foodbridge.auth.dto.response.UserResponse;

import com.foodbridge.auth.entity.AccountStatus;
import com.foodbridge.auth.entity.User;

import com.foodbridge.auth.repository.UserRepository;

import com.foodbridge.auth.security.JwtService;

import com.foodbridge.common.exception.InactiveAccountException;
import com.foodbridge.common.exception.InvalidCredentialsException;
import com.foodbridge.common.exception.UserAlreadyExistsException;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl
        implements AuthService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    // =========================================================
    // LOGIN
    // =========================================================

    @Override
    public LoginResponse login(
            LoginRequest request
    ) {

        // -----------------------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------------------

        String email =
                request.email()
                        .trim()
                        .toLowerCase();


        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new InvalidCredentialsException(
                                        "Invalid email or password"
                                )
                        );


        // -----------------------------------------------------
        // CHECK ACCOUNT STATUS
        // -----------------------------------------------------

        if (user.getStatus()
                != AccountStatus.ACTIVE) {

            throw new InactiveAccountException(
                    "User account is not active"
            );
        }


        // -----------------------------------------------------
        // VERIFY PASSWORD
        // -----------------------------------------------------

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.password(),
                        user.getPassword()
                );


        if (!passwordMatches) {

            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }


        // -----------------------------------------------------
        // GENERATE JWT
        // -----------------------------------------------------

        String token =
                jwtService.generateToken(user);


        // -----------------------------------------------------
        // USER RESPONSE
        // -----------------------------------------------------

        UserResponse userResponse =
                mapToUserResponse(user);


        // -----------------------------------------------------
        // LOGIN RESPONSE
        // -----------------------------------------------------

        return new LoginResponse(
                token,
                "Bearer",
                userResponse
        );
    }


    // =========================================================
    // REGISTER
    // =========================================================

    @Override
    public UserResponse register(
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

        User user =
                new User();

        user.setName(
                request.name()
                        .trim()
        );

        user.setEmail(
                email
        );


        // -----------------------------------------------------
        // HASH PASSWORD
        // -----------------------------------------------------

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
        //
        // User entity @PrePersist already defaults
        // this to ACTIVE when status is null.
        //
        // We intentionally don't set it here so
        // User remains responsible for its lifecycle default.
        // -----------------------------------------------------


        // -----------------------------------------------------
        // SAVE USER
        // -----------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapToUserResponse(
                savedUser
        );
    }


    // =========================================================
    // ENTITY → USER RESPONSE
    // =========================================================

    private UserResponse mapToUserResponse(
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