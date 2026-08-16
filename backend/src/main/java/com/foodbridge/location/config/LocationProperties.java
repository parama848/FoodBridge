package com.foodbridge.location.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "foodbridge.location")
public record LocationProperties(

        double donationRadiusKm

) {
}