// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client/dist/sockjs";

// const API_BASE_URL = "http://localhost:8080";

// let stompClient = null;

// export const connectWebSocket = ({
//   userId,
//   onNotification,
//   onConnected,
//   onError,
// }) => {
//   if (!userId) {
//     console.warn("WebSocket: userId is missing");
//     return null;
//   }

//   // Prevent duplicate connections
//   if (stompClient?.active) {
//     console.log("WebSocket already connected");
//     return stompClient;
//   }

//   stompClient = new Client({
//     webSocketFactory: () =>
//       new SockJS(`${API_BASE_URL}/ws`),

//     reconnectDelay: 5000,

//     heartbeatIncoming: 10000,
//     heartbeatOutgoing: 10000,

//     debug: (message) => {
//       console.log("[STOMP]", message);
//     },

//     onConnect: () => {
//       console.log(
//         `WebSocket connected for user ${userId}`
//       );

//       // User-specific notification channel
//       stompClient.subscribe(
//         `/topic/notifications/${userId}`,
//         (message) => {
//           try {
//             const notification = JSON.parse(
//               message.body
//             );

//             console.log(
//               "🔔 Real-time notification:",
//               notification
//             );

//             if (onNotification) {
//               onNotification(notification);
//             }
//           } catch (error) {
//             console.error(
//               "Failed to parse WebSocket notification:",
//               error
//             );
//           }
//         }
//       );

//       if (onConnected) {
//         onConnected();
//       }
//     },

//     onStompError: (frame) => {
//       console.error(
//         "STOMP broker error:",
//         frame.headers["message"]
//       );

//       console.error(
//         "Details:",
//         frame.body
//       );

//       if (onError) {
//         onError(frame);
//       }
//     },

//     onWebSocketError: (error) => {
//       console.error(
//         "WebSocket connection error:",
//         error
//       );

//       if (onError) {
//         onError(error);
//       }
//     },

//     onWebSocketClose: () => {
//       console.log("WebSocket connection closed");
//     },
//   });

//   stompClient.activate();

//   return stompClient;
// };


// export const disconnectWebSocket = () => {
//   if (stompClient) {
//     stompClient.deactivate();

//     stompClient = null;

//     console.log(
//       "WebSocket disconnected"
//     );
//   }
// };


// export const getWebSocketClient = () => {
//   return stompClient;
// };

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let stompClient = null;

export const connectWebSocket = ({
  userId,
  onNotification,
  onConnected,
  onError,
}) => {
  if (!userId) {
    console.warn("WebSocket: userId is missing");
    return null;
  }

  // Prevent duplicate connections
  if (stompClient?.active) {
    console.log("WebSocket already connected");
    return stompClient;
  }

  if (!API_BASE_URL) {
    console.error(
      "VITE_API_BASE_URL is not configured"
    );
    return null;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${API_BASE_URL}/ws`),

    reconnectDelay: 5000,

    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    debug: (message) => {
      console.log("[STOMP]", message);
    },

    onConnect: () => {
      console.log(
        `WebSocket connected for user ${userId}`
      );

      // User-specific notification channel
      stompClient.subscribe(
        `/topic/notifications/${userId}`,
        (message) => {
          try {
            const notification = JSON.parse(
              message.body
            );

            console.log(
              "🔔 Real-time notification:",
              notification
            );

            if (onNotification) {
              onNotification(notification);
            }
          } catch (error) {
            console.error(
              "Failed to parse WebSocket notification:",
              error
            );
          }
        }
      );

      if (onConnected) {
        onConnected();
      }
    },

    onStompError: (frame) => {
      console.error(
        "STOMP broker error:",
        frame.headers["message"]
      );

      console.error(
        "Details:",
        frame.body
      );

      if (onError) {
        onError(frame);
      }
    },

    onWebSocketError: (error) => {
      console.error(
        "WebSocket connection error:",
        error
      );

      if (onError) {
        onError(error);
      }
    },

    onWebSocketClose: () => {
      console.log(
        "WebSocket connection closed"
      );
    },
  });

  stompClient.activate();

  return stompClient;
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();

    stompClient = null;

    console.log(
      "WebSocket disconnected"
    );
  }
};

export const getWebSocketClient = () => {
  return stompClient;
};