package com.foodbridge.notification.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig
        implements WebSocketMessageBrokerConfigurer {


    // =========================================================
    // ALLOWED FRONTEND ORIGIN
    // =========================================================

    @Value("${app.websocket.allowed-origins}")
    private String allowedOrigin;


    // =========================================================
    // MESSAGE BROKER
    // =========================================================

    @Override
    public void configureMessageBroker(
            MessageBrokerRegistry registry
    ) {

        registry.enableSimpleBroker(
                "/topic",
                "/queue"
        );


        registry.setApplicationDestinationPrefixes(
                "/app"
        );


        /*
         * User-specific destinations.
         */
        registry.setUserDestinationPrefix(
                "/user"
        );
    }


    // =========================================================
    // STOMP ENDPOINT
    // =========================================================

    @Override
    public void registerStompEndpoints(
            StompEndpointRegistry registry
    ) {

        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(
                        allowedOrigin
                )
                .withSockJS();
    }
}

// package com.foodbridge.notification.config;

// import org.springframework.context.annotation.Configuration;

// import org.springframework.messaging.simp.config.MessageBrokerRegistry;

// import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// @Configuration
// @EnableWebSocketMessageBroker
// public class WebSocketConfig
//         implements WebSocketMessageBrokerConfigurer {


//     // =========================================================
//     // MESSAGE BROKER
//     // =========================================================

//     @Override
//     public void configureMessageBroker(
//             MessageBrokerRegistry registry
//     ) {

//         registry.enableSimpleBroker(
//                 "/topic",
//                 "/queue"
//         );


//         registry.setApplicationDestinationPrefixes(
//                 "/app"
//         );


//         /*
//          * User-specific destinations.
//          */
//         registry.setUserDestinationPrefix(
//                 "/user"
//         );
//     }


//     // =========================================================
//     // STOMP ENDPOINT
//     // =========================================================

//     @Override
//     public void registerStompEndpoints(
//             StompEndpointRegistry registry
//     ) {

//         registry.addEndpoint("/ws")
//                 .setAllowedOriginPatterns(
//                         "http://localhost:5173"
//                 )
//                 .withSockJS();
//     }
// }