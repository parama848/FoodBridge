/*
 * FoodBridge - NotificationContext
 *
 * FIX:
 * Notifications load immediately after authentication becomes
 * available. WebSocket is registered before the initial API load,
 * with a small polling fallback so the bell does not need refresh.
 *
 * The provider waits for AuthContext restoration, then:
 *   1. Loads existing notifications
 *   2. Connects the notification WebSocket
 *   3. Keeps the full history and navbar bell in sync
 *
 * Existing API endpoints, notification actions, and clear-bell behavior
 * are preserved.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/websocketService";

import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./AuthContext";


const NotificationContext = createContext(null);

// =========================================================
// BACKEND TIMESTAMP NORMALIZATION
// =========================================================
// Spring LocalDateTime may arrive without a timezone.
// FoodBridge server timestamps are treated as UTC when no
// timezone/offset is present. Explicit Z/offset values are kept.

function parseNotificationDate(value) {

  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  const valueString = String(value).trim();

  if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(valueString)) {
    const parsed = new Date(valueString);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(valueString)) {
    const parsed = new Date(`${valueString}Z`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const parsed = new Date(valueString);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeNotification(notification) {

  if (!notification) return notification;

  const created =
    notification.createdAt ??
    notification.created_at ??
    notification.timestamp ??
    notification.time ??
    notification.updatedAt ??
    notification.updated_at ??
    null;

  const updated =
    notification.updatedAt ??
    notification.updated_at ??
    notification.createdAt ??
    notification.created_at ??
    null;

  return {
    ...notification,
    createdAt:
      parseNotificationDate(created)?.toISOString() ??
      notification.createdAt ??
      null,
    updatedAt:
      parseNotificationDate(updated)?.toISOString() ??
      notification.updatedAt ??
      null,
  };
}

function notificationKey(notification) {
  return (
    notification?.id ??
    notification?._id ??
    `${notification?.type}-${notification?.createdAt}-${notification?.message}`
  );
}

function mergeNotifications(current = [], incoming = []) {

  const map = new Map();

  [...current, ...incoming].forEach((item) => {

    if (!item) return;

    map.set(
      notificationKey(item),
      item
    );
  });

  return Array.from(map.values()).sort((a, b) => {

    const aTime =
      parseNotificationDate(a.createdAt)?.getTime() ?? 0;

    const bTime =
      parseNotificationDate(b.createdAt)?.getTime() ?? 0;

    return bTime - aTime;
  });
}


export const NotificationProvider = ({
  children,
}) => {

  // =========================================================
  // AUTHENTICATION STATE
  // =========================================================

  const {
    user,
    token,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();


  // =========================================================
  // FULL NOTIFICATION HISTORY
  // Used by /notifications page
  // =========================================================

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);


  // =========================================================
  // BELL NOTIFICATIONS
  // Used ONLY by Navbar notification bell
  // =========================================================

  const [bellNotifications, setBellNotifications] =
    useState([]);

  const [bellUnreadCount, setBellUnreadCount] =
    useState(0);


  // =========================================================
  // WEBSOCKET STATUS
  // =========================================================

  const [connected, setConnected] =
    useState(false);


  // =========================================================
  // LOAD EXISTING NOTIFICATIONS
  // =========================================================

  const loadNotifications =
    useCallback(async () => {

      try {

        const response =
          await axiosInstance.get(
            "/notifications"
          );

        const result =
          response.data;

        const rawData =
          Array.isArray(result?.data)
            ? result.data
            : [];

        const data =
          rawData.map(normalizeNotification);


        // =====================================================
        // FULL NOTIFICATION HISTORY
        // =====================================================

        setNotifications((previous) =>
          mergeNotifications(
            previous,
            data
          )
        );


        // =====================================================
        // FULL PAGE UNREAD COUNT
        // =====================================================

        const unread =
          data.filter(
            (notification) =>
              notification.status ===
              "UNREAD"
          ).length;


        setUnreadCount(unread);


        // =====================================================
        // BELL NOTIFICATIONS
        //
        // Check whether user previously clicked
        // "Clear all" in this browser session.
        // =====================================================

        const bellClearedAt =
          sessionStorage.getItem(
            "foodbridge_bell_cleared_at"
          );


        let bellData = data;


        if (bellClearedAt) {

          const clearTime =
            new Date(
              bellClearedAt
            ).getTime();


          bellData =
            data.filter(
              (notification) => {

                const notificationTime =
                  parseNotificationDate(
                    notification.createdAt
                  )?.getTime() ?? 0;

                return (
                  notificationTime >
                  clearTime
                );
              }
            );
        }


        setBellNotifications((previous) =>
          mergeNotifications(
            [],
            bellData
          )
        );


        // =====================================================
        // BELL UNREAD COUNT
        // =====================================================

        const bellUnread =
          bellData.filter(
            (notification) =>
              notification.status ===
              "UNREAD"
          ).length;


        setBellUnreadCount(
          bellUnread
        );


      } catch (error) {

        console.error(
          "Failed to load notifications:",
          error
        );
      }

    }, []);


  // =========================================================
  // INITIALIZE
  // =========================================================
  //
  // IMPORTANT:
  // Wait for AuthContext to restore the session first.
  // This prevents notifications from being skipped immediately
  // after login when the NotificationProvider mounts before the
  // authenticated user/token is available.
  // =========================================================

  useEffect(() => {

    // -------------------------------------------------------
    // WAIT FOR AUTHENTICATION RESTORATION
    // -------------------------------------------------------

    if (authLoading) {
      return;
    }

    // -------------------------------------------------------
    // USER IS NOT AUTHENTICATED
    // -------------------------------------------------------

    if (!isAuthenticated || !token || !user?.id) {

      console.log(
        "Notification: user not authenticated"
      );

      setNotifications([]);
      setUnreadCount(0);

      setBellNotifications([]);
      setBellUnreadCount(0);

      setConnected(false);

      return;
    }

    // -------------------------------------------------------
    // CONNECT WEBSOCKET FIRST
    // -------------------------------------------------------
    // Register the live listener before the HTTP request so a
    // notification cannot arrive during loading and get lost.

    connectWebSocket({

      userId: user.id,

      // =====================================================
      // REAL-TIME NOTIFICATION
      // =====================================================

      onNotification: (notification) => {

        console.log(
          "🔔 New notification received:",
          notification
        );

        const normalized =
          normalizeNotification(notification);

        // ---------------------------------------------------
        // ADD TO FULL NOTIFICATION HISTORY
        // ---------------------------------------------------

        setNotifications((previous) =>
          mergeNotifications(
            previous,
            [normalized]
          )
        );

        // ---------------------------------------------------
        // ADD TO BELL
        // ---------------------------------------------------

        setBellNotifications((previous) =>
          mergeNotifications(
            previous,
            [normalized]
          )
        );

        // ---------------------------------------------------
        // UPDATE UNREAD COUNTS ONLY FOR UNREAD NOTIFICATIONS
        // ---------------------------------------------------
        // ---------------------------------------------------

        if (notification.status === "UNREAD") {

          setUnreadCount(
            (previous) =>
              previous + 1
          );

          setBellUnreadCount(
            (previous) =>
              previous + 1
          );
        }
      },

      // =====================================================
      // CONNECTED
      // =====================================================

      onConnected: () => {

        console.log(
          "✅ Notification WebSocket connected"
        );

        setConnected(true);
      },

      // =====================================================
      // ERROR
      // =====================================================

      onError: () => {

        console.error(
          "❌ Notification WebSocket error"
        );

        setConnected(false);
      },

    });

    // -------------------------------------------------------
    // LOAD EXISTING NOTIFICATIONS
    // -------------------------------------------------------

    loadNotifications();

    // -------------------------------------------------------
    // BACKUP REFRESH
    // -------------------------------------------------------
    // WebSocket is primary; polling self-heals missed events.

    const refreshTimer =
      window.setInterval(() => {
        loadNotifications();
      }, 15000);

    // -------------------------------------------------------
    // CLEANUP
        // -------------------------------------------------------

    return () => {

      window.clearInterval(refreshTimer);

      disconnectWebSocket();

      setConnected(false);
    };

  }, [
    authLoading,
    isAuthenticated,
    token,
    user,
    loadNotifications,
  ]);


  // =========================================================
  // MARK AS READ
  // =========================================================

  const markAsRead = async (
    notificationId
  ) => {

    try {

      const response =
        await axiosInstance.patch(
          `/notifications/${notificationId}/read`
        );


      const result =
        response.data;


      const updatedNotification =
        result?.data;


      // =====================================================
      // UPDATE FULL HISTORY
      // =====================================================

      setNotifications(
        (previous) =>
          previous.map(
            (notification) =>
              notification.id ===
              notificationId
                ? updatedNotification
                : notification
          )
      );


      // =====================================================
      // UPDATE BELL
      // =====================================================

      setBellNotifications(
        (previous) =>
          previous.map(
            (notification) =>
              notification.id ===
              notificationId
                ? updatedNotification
                : notification
          )
      );


      // =====================================================
      // FULL PAGE UNREAD COUNT
      // =====================================================

      setUnreadCount(
        (previous) =>
          Math.max(
            previous - 1,
            0
          )
      );


      // =====================================================
      // BELL UNREAD COUNT
      // =====================================================

      setBellUnreadCount(
        (previous) =>
          Math.max(
            previous - 1,
            0
          )
      );


    } catch (error) {

      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };


  // =========================================================
  // MARK ALL AS READ
  // =========================================================

  const markAllAsRead = async () => {

    try {

      await axiosInstance.patch(
        "/notifications/read-all"
      );


      const now =
        new Date().toISOString();


      // =====================================================
      // UPDATE FULL HISTORY
      // =====================================================

      setNotifications(
        (previous) =>
          previous.map(
            (notification) => ({
              ...notification,
              status: "READ",
              readAt:
                notification.readAt ||
                now,
            })
          )
      );


      // =====================================================
      // UPDATE BELL
      // =====================================================

      setBellNotifications(
        (previous) =>
          previous.map(
            (notification) => ({
              ...notification,
              status: "READ",
              readAt:
                notification.readAt ||
                now,
            })
          )
      );


      setUnreadCount(0);

      setBellUnreadCount(0);


    } catch (error) {

      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  };


  // =========================================================
  // CLEAR BELL ONLY
  // =========================================================
  //
  // IMPORTANT:
  //
  // This DOES NOT modify:
  //
  // notifications
  //
  // Therefore /notifications page remains untouched.
  //
  // It ONLY clears:
  //
  // bellNotifications
  // bellUnreadCount
  //
  // =========================================================

  const clearBellNotifications = () => {

    const clearTime =
      new Date().toISOString();


    // Save timestamp in browser session.
    //
    // This means refreshing the page during the
    // same browser session will NOT immediately
    // bring the cleared notifications back.

    sessionStorage.setItem(
      "foodbridge_bell_cleared_at",
      clearTime
    );


    // Clear ONLY bell

    setBellNotifications([]);

    setBellUnreadCount(0);
  };


  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {

    // -------------------------------------------------------
    // FULL NOTIFICATION PAGE
    // -------------------------------------------------------

    notifications,

    unreadCount,


    // -------------------------------------------------------
    // NAVBAR BELL
    // -------------------------------------------------------

    bellNotifications,

    bellUnreadCount,


    // -------------------------------------------------------
    // WEBSOCKET
    // -------------------------------------------------------

    connected,


    // -------------------------------------------------------
    // ACTIONS
    // -------------------------------------------------------

    markAsRead,

    markAllAsRead,

    clearBellNotifications,


    // -------------------------------------------------------
    // REFRESH
    // -------------------------------------------------------

    refreshNotifications:
      loadNotifications,
  };


  return (

    <NotificationContext.Provider
      value={value}
    >

      {children}

    </NotificationContext.Provider>

  );
};


// ===========================================================
// CUSTOM HOOK
// ===========================================================

export const useNotifications = () => {

  const context =
    useContext(
      NotificationContext
    );


  if (!context) {

    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }


  return context;
};
