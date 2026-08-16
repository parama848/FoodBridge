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

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {

  // =========================================================
  // FULL NOTIFICATION HISTORY
  // Used by /notifications page
  // =========================================================

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);


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

  const [connected, setConnected] = useState(false);


  // =========================================================
  // GET LOGGED-IN USER
  // =========================================================

  const getCurrentUser = () => {

    try {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);

    } catch (error) {

      console.error(
        "Failed to read user from localStorage:",
        error
      );

      return null;
    }
  };


  // =========================================================
  // LOAD EXISTING NOTIFICATIONS
  // =========================================================

  const loadNotifications = useCallback(async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }


      const response = await fetch(
        "http://localhost:8080/api/notifications",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {

        throw new Error(
          `Failed to load notifications: ${response.status}`
        );
      }


      const result =
        await response.json();


      const data =
        result.data || [];


      // =====================================================
      // FULL NOTIFICATION HISTORY
      // =====================================================

      setNotifications(data);


      // =====================================================
      // FULL PAGE UNREAD COUNT
      // =====================================================

      const unread =
        data.filter(
          (notification) =>
            notification.status === "UNREAD"
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
          new Date(bellClearedAt).getTime();


        bellData =
          data.filter((notification) => {

            const notificationTime =
              new Date(
                notification.createdAt
              ).getTime();

            return notificationTime > clearTime;
          });
      }


      setBellNotifications(
        bellData
      );


      // =====================================================
      // BELL UNREAD COUNT
      // =====================================================

      const bellUnread =
        bellData.filter(
          (notification) =>
            notification.status === "UNREAD"
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

  useEffect(() => {

    const user =
      getCurrentUser();


    if (!user?.id) {

      console.log(
        "Notification WebSocket: user not available"
      );

      return;
    }


    // =======================================================
    // LOAD EXISTING NOTIFICATIONS
    // =======================================================

    loadNotifications();


    // =======================================================
    // CONNECT WEBSOCKET
    // =======================================================

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


        // ===================================================
        // ADD TO FULL NOTIFICATION HISTORY
        // ===================================================

        setNotifications((previous) => {

          const exists =
            previous.some(
              (item) =>
                item.id === notification.id
            );


          if (exists) {
            return previous;
          }


          return [
            notification,
            ...previous,
          ];
        });


        // ===================================================
        // FULL PAGE UNREAD COUNT
        // ===================================================

        setUnreadCount(
          (previous) =>
            previous + 1
        );


        // ===================================================
        // ADD TO BELL
        // ===================================================

        setBellNotifications(
          (previous) => {

            const exists =
              previous.some(
                (item) =>
                  item.id === notification.id
              );


            if (exists) {
              return previous;
            }


            return [
              notification,
              ...previous,
            ];
          }
        );


        // ===================================================
        // BELL UNREAD COUNT
        // ===================================================

        setBellUnreadCount(
          (previous) =>
            previous + 1
        );
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

        setConnected(false);
      },

    });


    // =======================================================
    // CLEANUP
    // =======================================================

    return () => {

      disconnectWebSocket();

      setConnected(false);
    };

  }, [loadNotifications]);


  // =========================================================
  // MARK AS READ
  // =========================================================

  const markAsRead = async (
    notificationId
  ) => {

    try {

      const token =
        localStorage.getItem("token");


      if (!token) {
        return;
      }


      const response = await fetch(
        `http://localhost:8080/api/notifications/${notificationId}/read`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {

        throw new Error(
          `Failed to mark notification as read: ${response.status}`
        );
      }


      const result =
        await response.json();


      const updatedNotification =
        result.data;


      // =====================================================
      // UPDATE FULL HISTORY
      // =====================================================

      setNotifications(
        (previous) =>
          previous.map(
            (notification) =>
              notification.id === notificationId
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
              notification.id === notificationId
                ? updatedNotification
                : notification
          )
      );


      // =====================================================
      // FULL PAGE UNREAD COUNT
      // =====================================================

      setUnreadCount(
        (previous) =>
          Math.max(previous - 1, 0)
      );


      // =====================================================
      // BELL UNREAD COUNT
      // =====================================================

      setBellUnreadCount(
        (previous) =>
          Math.max(previous - 1, 0)
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

      const token =
        localStorage.getItem("token");


      if (!token) {
        return;
      }


      const response = await fetch(
        "http://localhost:8080/api/notifications/read-all",
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {

        throw new Error(
          `Failed to mark all notifications as read: ${response.status}`
        );
      }


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
                notification.readAt || now,
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
                notification.readAt || now,
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