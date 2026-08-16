// package com.foodbridge.foundation.dto.request;

// import jakarta.validation.constraints.DecimalMax;
// import jakarta.validation.constraints.DecimalMin;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;

// public record CreateFoundationRequest(

//         @NotBlank(message = "Organization name is required")
//         @Size(
//                 max = 150,
//                 message = "Organization name cannot exceed 150 characters"
//         )
//         String organizationName,

//         @NotBlank(message = "Registration number is required")
//         @Size(
//                 max = 100,
//                 message = "Registration number cannot exceed 100 characters"
//         )
//         String registrationNumber,

//         @NotBlank(message = "Address is required")
//         @Size(
//                 max = 255,
//                 message = "Address cannot exceed 255 characters"
//         )
//         String address,

//         @NotBlank(message = "City is required")
//         @Size(
//                 max = 100,
//                 message = "City cannot exceed 100 characters"
//         )
//         String city,

//         @NotBlank(message = "State is required")
//         @Size(
//                 max = 100,
//                 message = "State cannot exceed 100 characters"
//         )
//         String state,

//         @NotBlank(message = "Pincode is required")
//         @Pattern(
//                 regexp = "^[0-9]{6}$",
//                 message = "Pincode must contain exactly 6 digits"
//         )
//         String pincode,

//         @NotNull(message = "Latitude is required")
//         @DecimalMin(
//                 value = "-90.0",
//                 message = "Latitude must be between -90 and 90"
//         )
//         @DecimalMax(
//                 value = "90.0",
//                 message = "Latitude must be between -90 and 90"
//         )
//         Double latitude,

//         @NotNull(message = "Longitude is required")
//         @DecimalMin(
//                 value = "-180.0",
//                 message = "Longitude must be between -180 and 180"
//         )
//         @DecimalMax(
//                 value = "180.0",
//                 message = "Longitude must be between -180 and 180"
//         )
//         Double longitude

// ) {
// }

package com.foodbridge.foundation.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateFoundationRequest(

        @NotBlank(message = "Organization name is required")
        @Size(
                max = 150,
                message = "Organization name cannot exceed 150 characters"
        )
        String organizationName,

        @NotBlank(message = "Registration number is required")
        @Size(
                max = 100,
                message = "Registration number cannot exceed 100 characters"
        )
        String registrationNumber,

        @NotBlank(message = "Address is required")
        @Size(
                max = 255,
                message = "Address cannot exceed 255 characters"
        )
        String address,

        @NotBlank(message = "City is required")
        @Size(
                max = 100,
                message = "City cannot exceed 100 characters"
        )
        String city,

        @NotBlank(message = "State is required")
        @Size(
                max = 100,
                message = "State cannot exceed 100 characters"
        )
        String state,

        @NotBlank(message = "Pincode is required")
        @Pattern(
                regexp = "^[0-9]{6}$",
                message = "Pincode must contain exactly 6 digits"
        )
        String pincode,

        @NotNull(message = "Latitude is required")
        @DecimalMin(
                value = "-90.0",
                message = "Latitude must be between -90 and 90"
        )
        @DecimalMax(
                value = "90.0",
                message = "Latitude must be between -90 and 90"
        )
        Double latitude,

        @NotNull(message = "Longitude is required")
        @DecimalMin(
                value = "-180.0",
                message = "Longitude must be between -180 and 180"
        )
        @DecimalMax(
                value = "180.0",
                message = "Longitude must be between -180 and 180"
        )
        Double longitude

) {
}