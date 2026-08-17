// // // import {
// // //   createContext,
// // //   useContext,
// // //   useEffect,
// // //   useState,
// // //   useCallback,
// // // } from "react";

// // // import {
// // //   connectWebSocket,
// // //   disconnectWebSocket,
// // // } from "../services/websocketService";

// // // const NotificationContext = createContext(null);

// // // export const NotificationProvider = ({ children }) => {

// // //   // =========================================================
// // //   // FULL NOTIFICATION HISTORY
// // //   // Used by /notifications page
// // //   // =========================================================

// // //   const [notifications, setNotifications] = useState([]);

// // //   const [unreadCount, setUnreadCount] = useState(0);


// // //   // =========================================================
// // //   // BELL NOTIFICATIONS
// // //   // Used ONLY by Navbar notification bell
// // //   // =========================================================

// // //   const [bellNotifications, setBellNotifications] =
// // //     useState([]);

// // //   const [bellUnreadCount, setBellUnreadCount] =
// // //     useState(0);


// // //   // =========================================================
// // //   // WEBSOCKET STATUS
// // //   // =========================================================

// // //   const [connected, setConnected] = useState(false);


// // //   // =========================================================
// // //   // GET LOGGED-IN USER
// // //   // =========================================================

// // //   const getCurrentUser = () => {

// // //     try {

// // //       const storedUser =
// // //         localStorage.getItem("user");

// // //       if (!storedUser) {
// // //         return null;
// // //       }

// // //       return JSON.parse(storedUser);

// // //     } catch (error) {

// // //       console.error(
// // //         "Failed to read user from localStorage:",
// // //         error
// // //       );

// // //       return null;
// // //     }
// // //   };


// // //   // =========================================================
// // //   // LOAD EXISTING NOTIFICATIONS
// // //   // =========================================================

// // //   const loadNotifications = useCallback(async () => {

// // //     try {

// // //       const token =
// // //         localStorage.getItem("token");

// // //       if (!token) {
// // //         return;
// // //       }


// // //       const response = await fetch(
// // //         "http://localhost:8080/api/notifications",
// // //         {
// // //           method: "GET",

// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );


// // //       if (!response.ok) {

// // //         throw new Error(
// // //           `Failed to load notifications: ${response.status}`
// // //         );
// // //       }


// // //       const result =
// // //         await response.json();


// // //       const data =
// // //         result.data || [];


// // //       // =====================================================
// // //       // FULL NOTIFICATION HISTORY
// // //       // =====================================================

// // //       setNotifications(data);


// // //       // =====================================================
// // //       // FULL PAGE UNREAD COUNT
// // //       // =====================================================

// // //       const unread =
// // //         data.filter(
// // //           (notification) =>
// // //             notification.status === "UNREAD"
// // //         ).length;


// // //       setUnreadCount(unread);


// // //       // =====================================================
// // //       // BELL NOTIFICATIONS
// // //       //
// // //       // Check whether user previously clicked
// // //       // "Clear all" in this browser session.
// // //       // =====================================================

// // //       const bellClearedAt =
// // //         sessionStorage.getItem(
// // //           "foodbridge_bell_cleared_at"
// // //         );


// // //       let bellData = data;


// // //       if (bellClearedAt) {

// // //         const clearTime =
// // //           new Date(bellClearedAt).getTime();


// // //         bellData =
// // //           data.filter((notification) => {

// // //             const notificationTime =
// // //               new Date(
// // //                 notification.createdAt
// // //               ).getTime();

// // //             return notificationTime > clearTime;
// // //           });
// // //       }


// // //       setBellNotifications(
// // //         bellData
// // //       );


// // //       // =====================================================
// // //       // BELL UNREAD COUNT
// // //       // =====================================================

// // //       const bellUnread =
// // //         bellData.filter(
// // //           (notification) =>
// // //             notification.status === "UNREAD"
// // //         ).length;


// // //       setBellUnreadCount(
// // //         bellUnread
// // //       );


// // //     } catch (error) {

// // //       console.error(
// // //         "Failed to load notifications:",
// // //         error
// // //       );
// // //     }

// // //   }, []);


// // //   // =========================================================
// // //   // INITIALIZE
// // //   // =========================================================

// // //   useEffect(() => {

// // //     const user =
// // //       getCurrentUser();


// // //     if (!user?.id) {

// // //       console.log(
// // //         "Notification WebSocket: user not available"
// // //       );

// // //       return;
// // //     }


// // //     // =======================================================
// // //     // LOAD EXISTING NOTIFICATIONS
// // //     // =======================================================

// // //     loadNotifications();


// // //     // =======================================================
// // //     // CONNECT WEBSOCKET
// // //     // =======================================================

// // //     connectWebSocket({

// // //       userId: user.id,


// // //       // =====================================================
// // //       // REAL-TIME NOTIFICATION
// // //       // =====================================================

// // //       onNotification: (notification) => {

// // //         console.log(
// // //           "🔔 New notification received:",
// // //           notification
// // //         );


// // //         // ===================================================
// // //         // ADD TO FULL NOTIFICATION HISTORY
// // //         // ===================================================

// // //         setNotifications((previous) => {

// // //           const exists =
// // //             previous.some(
// // //               (item) =>
// // //                 item.id === notification.id
// // //             );


// // //           if (exists) {
// // //             return previous;
// // //           }


// // //           return [
// // //             notification,
// // //             ...previous,
// // //           ];
// // //         });


// // //         // ===================================================
// // //         // FULL PAGE UNREAD COUNT
// // //         // ===================================================

// // //         setUnreadCount(
// // //           (previous) =>
// // //             previous + 1
// // //         );


// // //         // ===================================================
// // //         // ADD TO BELL
// // //         // ===================================================

// // //         setBellNotifications(
// // //           (previous) => {

// // //             const exists =
// // //               previous.some(
// // //                 (item) =>
// // //                   item.id === notification.id
// // //               );


// // //             if (exists) {
// // //               return previous;
// // //             }


// // //             return [
// // //               notification,
// // //               ...previous,
// // //             ];
// // //           }
// // //         );


// // //         // ===================================================
// // //         // BELL UNREAD COUNT
// // //         // ===================================================

// // //         setBellUnreadCount(
// // //           (previous) =>
// // //             previous + 1
// // //         );
// // //       },


// // //       // =====================================================
// // //       // CONNECTED
// // //       // =====================================================

// // //       onConnected: () => {

// // //         console.log(
// // //           "✅ Notification WebSocket connected"
// // //         );

// // //         setConnected(true);
// // //       },


// // //       // =====================================================
// // //       // ERROR
// // //       // =====================================================

// // //       onError: () => {

// // //         setConnected(false);
// // //       },

// // //     });


// // //     // =======================================================
// // //     // CLEANUP
// // //     // =======================================================

// // //     return () => {

// // //       disconnectWebSocket();

// // //       setConnected(false);
// // //     };

// // //   }, [loadNotifications]);


// // //   // =========================================================
// // //   // MARK AS READ
// // //   // =========================================================

// // //   const markAsRead = async (
// // //     notificationId
// // //   ) => {

// // //     try {

// // //       const token =
// // //         localStorage.getItem("token");


// // //       if (!token) {
// // //         return;
// // //       }


// // //       const response = await fetch(
// // //         `http://localhost:8080/api/notifications/${notificationId}/read`,
// // //         {
// // //           method: "PATCH",

// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );


// // //       if (!response.ok) {

// // //         throw new Error(
// // //           `Failed to mark notification as read: ${response.status}`
// // //         );
// // //       }


// // //       const result =
// // //         await response.json();


// // //       const updatedNotification =
// // //         result.data;


// // //       // =====================================================
// // //       // UPDATE FULL HISTORY
// // //       // =====================================================

// // //       setNotifications(
// // //         (previous) =>
// // //           previous.map(
// // //             (notification) =>
// // //               notification.id === notificationId
// // //                 ? updatedNotification
// // //                 : notification
// // //           )
// // //       );


// // //       // =====================================================
// // //       // UPDATE BELL
// // //       // =====================================================

// // //       setBellNotifications(
// // //         (previous) =>
// // //           previous.map(
// // //             (notification) =>
// // //               notification.id === notificationId
// // //                 ? updatedNotification
// // //                 : notification
// // //           )
// // //       );


// // //       // =====================================================
// // //       // FULL PAGE UNREAD COUNT
// // //       // =====================================================

// // //       setUnreadCount(
// // //         (previous) =>
// // //           Math.max(previous - 1, 0)
// // //       );


// // //       // =====================================================
// // //       // BELL UNREAD COUNT
// // //       // =====================================================

// // //       setBellUnreadCount(
// // //         (previous) =>
// // //           Math.max(previous - 1, 0)
// // //       );


// // //     } catch (error) {

// // //       console.error(
// // //         "Failed to mark notification as read:",
// // //         error
// // //       );
// // //     }
// // //   };


// // //   // =========================================================
// // //   // MARK ALL AS READ
// // //   // =========================================================

// // //   const markAllAsRead = async () => {

// // //     try {

// // //       const token =
// // //         localStorage.getItem("token");


// // //       if (!token) {
// // //         return;
// // //       }


// // //       const response = await fetch(
// // //         "http://localhost:8080/api/notifications/read-all",
// // //         {
// // //           method: "PATCH",

// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         }
// // //       );


// // //       if (!response.ok) {

// // //         throw new Error(
// // //           `Failed to mark all notifications as read: ${response.status}`
// // //         );
// // //       }


// // //       const now =
// // //         new Date().toISOString();


// // //       // =====================================================
// // //       // UPDATE FULL HISTORY
// // //       // =====================================================

// // //       setNotifications(
// // //         (previous) =>
// // //           previous.map(
// // //             (notification) => ({
// // //               ...notification,
// // //               status: "READ",
// // //               readAt:
// // //                 notification.readAt || now,
// // //             })
// // //           )
// // //       );


// // //       // =====================================================
// // //       // UPDATE BELL
// // //       // =====================================================

// // //       setBellNotifications(
// // //         (previous) =>
// // //           previous.map(
// // //             (notification) => ({
// // //               ...notification,
// // //               status: "READ",
// // //               readAt:
// // //                 notification.readAt || now,
// // //             })
// // //           )
// // //       );


// // //       setUnreadCount(0);

// // //       setBellUnreadCount(0);


// // //     } catch (error) {

// // //       console.error(
// // //         "Failed to mark all notifications as read:",
// // //         error
// // //       );
// // //     }
// // //   };


// // //   // =========================================================
// // //   // CLEAR BELL ONLY
// // //   // =========================================================
// // //   //
// // //   // IMPORTANT:
// // //   //
// // //   // This DOES NOT modify:
// // //   //
// // //   // notifications
// // //   //
// // //   // Therefore /notifications page remains untouched.
// // //   //
// // //   // It ONLY clears:
// // //   //
// // //   // bellNotifications
// // //   // bellUnreadCount
// // //   //
// // //   // =========================================================

// // //   const clearBellNotifications = () => {

// // //     const clearTime =
// // //       new Date().toISOString();


// // //     // Save timestamp in browser session.
// // //     //
// // //     // This means refreshing the page during the
// // //     // same browser session will NOT immediately
// // //     // bring the cleared notifications back.

// // //     sessionStorage.setItem(
// // //       "foodbridge_bell_cleared_at",
// // //       clearTime
// // //     );


// // //     // Clear ONLY bell

// // //     setBellNotifications([]);

// // //     setBellUnreadCount(0);
// // //   };


// // //   // =========================================================
// // //   // CONTEXT VALUE
// // //   // =========================================================

// // //   const value = {

// // //     // -------------------------------------------------------
// // //     // FULL NOTIFICATION PAGE
// // //     // -------------------------------------------------------

// // //     notifications,

// // //     unreadCount,


// // //     // -------------------------------------------------------
// // //     // NAVBAR BELL
// // //     // -------------------------------------------------------

// // //     bellNotifications,

// // //     bellUnreadCount,


// // //     // -------------------------------------------------------
// // //     // WEBSOCKET
// // //     // -------------------------------------------------------

// // //     connected,


// // //     // -------------------------------------------------------
// // //     // ACTIONS
// // //     // -------------------------------------------------------

// // //     markAsRead,

// // //     markAllAsRead,

// // //     clearBellNotifications,


// // //     // -------------------------------------------------------
// // //     // REFRESH
// // //     // -------------------------------------------------------

// // //     refreshNotifications:
// // //       loadNotifications,
// // //   };


// // //   return (

// // //     <NotificationContext.Provider
// // //       value={value}
// // //     >
// // //       {children}
// // //     </NotificationContext.Provider>

// // //   );
// // // };


// // // // ===========================================================
// // // // CUSTOM HOOK
// // // // ===========================================================

// // // export const useNotifications = () => {

// // //   const context =
// // //     useContext(
// // //       NotificationContext
// // //     );


// // //   if (!context) {

// // //     throw new Error(
// // //       "useNotifications must be used inside NotificationProvider"
// // //     );
// // //   }


// // //   return context;
// // // };

// // import {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// //   useCallback,
// // } from "react";

// // import {
// //   connectWebSocket,
// //   disconnectWebSocket,
// // } from "../services/websocketService";

// // import axiosInstance from "../api/axiosInstance";

// // const NotificationContext = createContext(null);

// // export const NotificationProvider = ({
// //   children,
// // }) => {

// //   // =========================================================
// //   // FULL NOTIFICATION HISTORY
// //   // Used by /notifications page
// //   // =========================================================

// //   const [notifications, setNotifications] =
// //     useState([]);

// //   const [unreadCount, setUnreadCount] =
// //     useState(0);


// //   // =========================================================
// //   // BELL NOTIFICATIONS
// //   // Used ONLY by Navbar notification bell
// //   // =========================================================

// //   const [bellNotifications, setBellNotifications] =
// //     useState([]);

// //   const [bellUnreadCount, setBellUnreadCount] =
// //     useState(0);


// //   // =========================================================
// //   // WEBSOCKET STATUS
// //   // =========================================================

// //   const [connected, setConnected] =
// //     useState(false);


// //   // =========================================================
// //   // GET LOGGED-IN USER
// //   // =========================================================

// //   const getCurrentUser = () => {

// //     try {

// //       const storedUser =
// //         localStorage.getItem("user");

// //       if (!storedUser) {
// //         return null;
// //       }

// //       return JSON.parse(storedUser);

// //     } catch (error) {

// //       console.error(
// //         "Failed to read user from localStorage:",
// //         error
// //       );

// //       return null;
// //     }
// //   };


// //   // =========================================================
// //   // LOAD EXISTING NOTIFICATIONS
// //   // =========================================================

// //   const loadNotifications =
// //     useCallback(async () => {

// //       try {

// //         const response =
// //           await axiosInstance.get(
// //             "/notifications"
// //           );

// //         const result =
// //           response.data;

// //         const data =
// //           result?.data || [];


// //         // =====================================================
// //         // FULL NOTIFICATION HISTORY
// //         // =====================================================

// //         setNotifications(data);


// //         // =====================================================
// //         // FULL PAGE UNREAD COUNT
// //         // =====================================================

// //         const unread =
// //           data.filter(
// //             (notification) =>
// //               notification.status ===
// //               "UNREAD"
// //           ).length;


// //         setUnreadCount(unread);


// //         // =====================================================
// //         // BELL NOTIFICATIONS
// //         //
// //         // Check whether user previously clicked
// //         // "Clear all" in this browser session.
// //         // =====================================================

// //         const bellClearedAt =
// //           sessionStorage.getItem(
// //             "foodbridge_bell_cleared_at"
// //           );


// //         let bellData = data;


// //         if (bellClearedAt) {

// //           const clearTime =
// //             new Date(
// //               bellClearedAt
// //             ).getTime();


// //           bellData =
// //             data.filter(
// //               (notification) => {

// //                 const notificationTime =
// //                   new Date(
// //                     notification.createdAt
// //                   ).getTime();

// //                 return (
// //                   notificationTime >
// //                   clearTime
// //                 );
// //               }
// //             );
// //         }


// //         setBellNotifications(
// //           bellData
// //         );


// //         // =====================================================
// //         // BELL UNREAD COUNT
// //         // =====================================================

// //         const bellUnread =
// //           bellData.filter(
// //             (notification) =>
// //               notification.status ===
// //               "UNREAD"
// //           ).length;


// //         setBellUnreadCount(
// //           bellUnread
// //         );


// //       } catch (error) {

// //         console.error(
// //           "Failed to load notifications:",
// //           error
// //         );
// //       }

// //     }, []);


// //   // =========================================================
// //   // INITIALIZE
// //   // =========================================================

// //   useEffect(() => {

// //     const user =
// //       getCurrentUser();


// //     if (!user?.id) {

// //       console.log(
// //         "Notification WebSocket: user not available"
// //       );

// //       return;
// //     }


// //     // =======================================================
// //     // LOAD EXISTING NOTIFICATIONS
// //     // =======================================================

// //     loadNotifications();


// //     // =======================================================
// //     // CONNECT WEBSOCKET
// //     // =======================================================

// //     connectWebSocket({

// //       userId: user.id,


// //       // =====================================================
// //       // REAL-TIME NOTIFICATION
// //       // =====================================================

// //       onNotification: (
// //         notification
// //       ) => {

// //         console.log(
// //           "🔔 New notification received:",
// //           notification
// //         );


// //         // ===================================================
// //         // ADD TO FULL NOTIFICATION HISTORY
// //         // ===================================================

// //         setNotifications(
// //           (previous) => {

// //             const exists =
// //               previous.some(
// //                 (item) =>
// //                   item.id ===
// //                   notification.id
// //               );


// //             if (exists) {
// //               return previous;
// //             }


// //             return [
// //               notification,
// //               ...previous,
// //             ];
// //           }
// //         );


// //         // ===================================================
// //         // FULL PAGE UNREAD COUNT
// //         // ===================================================

// //         setUnreadCount(
// //           (previous) =>
// //             previous + 1
// //         );


// //         // ===================================================
// //         // ADD TO BELL
// //         // ===================================================

// //         setBellNotifications(
// //           (previous) => {

// //             const exists =
// //               previous.some(
// //                 (item) =>
// //                   item.id ===
// //                   notification.id
// //               );


// //             if (exists) {
// //               return previous;
// //             }


// //             return [
// //               notification,
// //               ...previous,
// //             ];
// //           }
// //         );


// //         // ===================================================
// //         // BELL UNREAD COUNT
// //         // ===================================================

// //         setBellUnreadCount(
// //           (previous) =>
// //             previous + 1
// //         );
// //       },


// //       // =====================================================
// //       // CONNECTED
// //       // =====================================================

// //       onConnected: () => {

// //         console.log(
// //           "✅ Notification WebSocket connected"
// //         );

// //         setConnected(true);
// //       },


// //       // =====================================================
// //       // ERROR
// //       // =====================================================

// //       onError: () => {

// //         setConnected(false);
// //       },

// //     });


// //     // =======================================================
// //     // CLEANUP
// //     // =======================================================

// //     return () => {

// //       disconnectWebSocket();

// //       setConnected(false);
// //     };

// //   }, [loadNotifications]);


// //   // =========================================================
// //   // MARK AS READ
// //   // =========================================================

// //   const markAsRead = async (
// //     notificationId
// //   ) => {

// //     try {

// //       const response =
// //         await axiosInstance.patch(
// //           `/notifications/${notificationId}/read`
// //         );


// //       const result =
// //         response.data;


// //       const updatedNotification =
// //         result?.data;


// //       // =====================================================
// //       // UPDATE FULL HISTORY
// //       // =====================================================

// //       setNotifications(
// //         (previous) =>
// //           previous.map(
// //             (notification) =>
// //               notification.id ===
// //               notificationId
// //                 ? updatedNotification
// //                 : notification
// //           )
// //       );


// //       // =====================================================
// //       // UPDATE BELL
// //       // =====================================================

// //       setBellNotifications(
// //         (previous) =>
// //           previous.map(
// //             (notification) =>
// //               notification.id ===
// //               notificationId
// //                 ? updatedNotification
// //                 : notification
// //           )
// //       );


// //       // =====================================================
// //       // FULL PAGE UNREAD COUNT
// //       // =====================================================

// //       setUnreadCount(
// //         (previous) =>
// //           Math.max(
// //             previous - 1,
// //             0
// //           )
// //       );


// //       // =====================================================
// //       // BELL UNREAD COUNT
// //       // =====================================================

// //       setBellUnreadCount(
// //         (previous) =>
// //           Math.max(
// //             previous - 1,
// //             0
// //           )
// //       );


// //     } catch (error) {

// //       console.error(
// //         "Failed to mark notification as read:",
// //         error
// //       );
// //     }
// //   };


// //   // =========================================================
// //   // MARK ALL AS READ
// //   // =========================================================

// //   const markAllAsRead = async () => {

// //     try {

// //       await axiosInstance.patch(
// //         "/notifications/read-all"
// //       );


// //       const now =
// //         new Date().toISOString();


// //       // =====================================================
// //       // UPDATE FULL HISTORY
// //       // =====================================================

// //       setNotifications(
// //         (previous) =>
// //           previous.map(
// //             (notification) => ({
// //               ...notification,
// //               status: "READ",
// //               readAt:
// //                 notification.readAt ||
// //                 now,
// //             })
// //           )
// //       );


// //       // =====================================================
// //       // UPDATE BELL
// //       // =====================================================

// //       setBellNotifications(
// //         (previous) =>
// //           previous.map(
// //             (notification) => ({
// //               ...notification,
// //               status: "READ",
// //               readAt:
// //                 notification.readAt ||
// //                 now,
// //             })
// //           )
// //       );


// //       setUnreadCount(0);

// //       setBellUnreadCount(0);


// //     } catch (error) {

// //       console.error(
// //         "Failed to mark all notifications as read:",
// //         error
// //       );
// //     }
// //   };


// //   // =========================================================
// //   // CLEAR BELL ONLY
// //   // =========================================================
// //   //
// //   // IMPORTANT:
// //   //
// //   // This DOES NOT modify:
// //   //
// //   // notifications
// //   //
// //   // Therefore /notifications page remains untouched.
// //   //
// //   // It ONLY clears:
// //   //
// //   // bellNotifications
// //   // bellUnreadCount
// //   //
// //   // =========================================================

// //   const clearBellNotifications = () => {

// //     const clearTime =
// //       new Date().toISOString();


// //     // Save timestamp in browser session.
// //     //
// //     // This means refreshing the page during the
// //     // same browser session will NOT immediately
// //     // bring the cleared notifications back.

// //     sessionStorage.setItem(
// //       "foodbridge_bell_cleared_at",
// //       clearTime
// //     );


// //     // Clear ONLY bell

// //     setBellNotifications([]);

// //     setBellUnreadCount(0);
// //   };


// //   // =========================================================
// //   // CONTEXT VALUE
// //   // =========================================================

// //   const value = {

// //     // -------------------------------------------------------
// //     // FULL NOTIFICATION PAGE
// //     // -------------------------------------------------------

// //     notifications,

// //     unreadCount,


// //     // -------------------------------------------------------
// //     // NAVBAR BELL
// //     // -------------------------------------------------------

// //     bellNotifications,

// //     bellUnreadCount,


// //     // -------------------------------------------------------
// //     // WEBSOCKET
// //     // -------------------------------------------------------

// //     connected,


// //     // -------------------------------------------------------
// //     // ACTIONS
// //     // -------------------------------------------------------

// //     markAsRead,

// //     markAllAsRead,

// //     clearBellNotifications,


// //     // -------------------------------------------------------
// //     // REFRESH
// //     // -------------------------------------------------------

// //     refreshNotifications:
// //       loadNotifications,
// //   };


// //   return (

// //     <NotificationContext.Provider
// //       value={value}
// //     >

// //       {children}

// //     </NotificationContext.Provider>

// //   );
// // };


// // // ===========================================================
// // // CUSTOM HOOK
// // // ===========================================================

// // export const useNotifications = () => {

// //   const context =
// //     useContext(
// //       NotificationContext
// //     );


// //   if (!context) {

// //     throw new Error(
// //       "useNotifications must be used inside NotificationProvider"
// //     );
// //   }


// //   return context;
// // };

// /*
//  * FoodBridge - NotificationContext
//  *
//  * FIX:
//  * Notifications load immediately after authentication becomes
//  * available. WebSocket is registered before the initial API load,
//  * with a small polling fallback so the bell does not need refresh.
//  *
//  * Timestamp handling:
//  * - createdAt is always the notification creation time.
//  * - updatedAt is never used as a createdAt fallback.
//  * - timezone-less Spring LocalDateTime values are treated as IST.
//  *
//  * The provider waits for AuthContext restoration, then:
//  *   1. Loads existing notifications
//  *   2. Connects the notification WebSocket
//  *   3. Keeps the full history and navbar bell in sync
//  *
//  * Existing API endpoints, notification actions, and clear-bell behavior
//  * are preserved.
//  */

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";

// import {
//   connectWebSocket,
//   disconnectWebSocket,
// } from "../services/websocketService";

// import axiosInstance from "../api/axiosInstance";
// import { useAuth } from "./AuthContext";


// const NotificationContext = createContext(null);

// // =========================================================
// // BACKEND TIMESTAMP NORMALIZATION
// // =========================================================
// // Spring LocalDateTime may arrive without a timezone.
// // FoodBridge server timestamps are treated as UTC when no
// // timezone/offset is present. Explicit Z/offset values are kept.

// function parseNotificationDate(value) {

//   if (!value) {
//     return null;
//   }

//   if (value instanceof Date) {
//     return Number.isNaN(value.getTime())
//       ? null
//       : value;
//   }

//   const valueString =
//     String(value).trim();

//   if (!valueString) {
//     return null;
//   }


//   // =========================================================
//   // EXPLICIT TIMEZONE
//   // =========================================================
//   //
//   // Examples:
//   // 2026-08-17T14:30:00Z
//   // 2026-08-17T20:00:00+05:30
//   //
//   // These already contain timezone information, so keep them
//   // exactly as supplied by the backend.
//   // =========================================================

//   if (
//     /Z$/i.test(valueString) ||
//     /[+-]\d{2}:?\d{2}$/.test(valueString)
//   ) {

//     const parsed =
//       new Date(valueString);

//     return Number.isNaN(
//       parsed.getTime()
//     )
//       ? null
//       : parsed;
//   }


//   // =========================================================
//   // SPRING LocalDateTime
//   // =========================================================
//   //
//   // Example:
//   // 2026-08-17T20:00:00
//   //
//   // Your FoodBridge timestamps are being returned without a
//   // timezone. Treat this value as IST (+05:30), NOT UTC.
//   //
//   // Appending "Z" here would shift the displayed time by
//   // approximately 5 hours 30 minutes in India.
//   // =========================================================

//   const match =
//     valueString.match(
//       /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,9}))?)?$/
//     );


//   if (match) {

//     const [
//       ,
//       year,
//       month,
//       day,
//       hour,
//       minute,
//       second = "00",
//       fraction = "",
//     ] = match;


//     const milliseconds =
//       fraction
//         ? Number(
//             fraction
//               .padEnd(3, "0")
//               .slice(0, 3)
//           )
//         : 0;


//     // Convert IST LocalDateTime -> UTC timestamp.
//     const utcTime =
//       Date.UTC(
//         Number(year),
//         Number(month) - 1,
//         Number(day),
//         Number(hour),
//         Number(minute),
//         Number(second),
//         milliseconds
//       ) -
//       5.5 * 60 * 60 * 1000;


//     const parsed =
//       new Date(utcTime);


//     return Number.isNaN(
//       parsed.getTime()
//     )
//       ? null
//       : parsed;
//   }


//   // =========================================================
//   // FALLBACK
//   // =========================================================

//   const parsed =
//     new Date(valueString);

//   return Number.isNaN(
//     parsed.getTime()
//   )
//     ? null
//     : parsed;
// }

// function normalizeNotification(notification) {

//   if (!notification) {
//     return notification;
//   }


//   // =========================================================
//   // CREATED TIME
//   // =========================================================
//   //
//   // IMPORTANT:
//   // createdAt means when the notification was CREATED.
//   //
//   // Do NOT fall back to updatedAt here.
//   // updatedAt can change later when the notification is read
//   // or otherwise modified.
//   // =========================================================

//   const created =
//     notification.createdAt ??
//     notification.created_at ??
//     notification.timestamp ??
//     notification.time ??
//     null;


//   // =========================================================
//   // UPDATED TIME
//   // =========================================================

//   const updated =
//     notification.updatedAt ??
//     notification.updated_at ??
//     notification.createdAt ??
//     notification.created_at ??
//     null;


//   return {

//     ...notification,

//     createdAt:
//       parseNotificationDate(created)
//         ?.toISOString() ??
//       notification.createdAt ??
//       null,

//     updatedAt:
//       parseNotificationDate(updated)
//         ?.toISOString() ??
//       notification.updatedAt ??
//       null,

//   };
// }

// function notificationKey(notification) {
//   return (
//     notification?.id ??
//     notification?._id ??
//     `${notification?.type}-${notification?.createdAt}-${notification?.message}`
//   );
// }

// function mergeNotifications(current = [], incoming = []) {

//   const map = new Map();

//   [...current, ...incoming].forEach((item) => {

//     if (!item) return;

//     map.set(
//       notificationKey(item),
//       item
//     );
//   });

//   return Array.from(map.values()).sort((a, b) => {

//     const aTime =
//       parseNotificationDate(a.createdAt)?.getTime() ?? 0;

//     const bTime =
//       parseNotificationDate(b.createdAt)?.getTime() ?? 0;

//     return bTime - aTime;
//   });
// }


// export const NotificationProvider = ({
//   children,
// }) => {

//   // =========================================================
//   // AUTHENTICATION STATE
//   // =========================================================

//   const {
//     user,
//     token,
//     isAuthenticated,
//     loading: authLoading,
//   } = useAuth();


//   // =========================================================
//   // FULL NOTIFICATION HISTORY
//   // Used by /notifications page
//   // =========================================================

//   const [notifications, setNotifications] =
//     useState([]);

//   const [unreadCount, setUnreadCount] =
//     useState(0);


//   // =========================================================
//   // BELL NOTIFICATIONS
//   // Used ONLY by Navbar notification bell
//   // =========================================================

//   const [bellNotifications, setBellNotifications] =
//     useState([]);

//   const [bellUnreadCount, setBellUnreadCount] =
//     useState(0);


//   // =========================================================
//   // WEBSOCKET STATUS
//   // =========================================================

//   const [connected, setConnected] =
//     useState(false);


//   // =========================================================
//   // LOAD EXISTING NOTIFICATIONS
//   // =========================================================

//   const loadNotifications =
//     useCallback(async () => {

//       try {

//         const response =
//           await axiosInstance.get(
//             "/notifications"
//           );

//         const result =
//           response.data;

//         const rawData =
//           Array.isArray(result?.data)
//             ? result.data
//             : [];

//         const data =
//           rawData.map(normalizeNotification);


//         // =====================================================
//         // FULL NOTIFICATION HISTORY
//         // =====================================================

//         setNotifications((previous) =>
//           mergeNotifications(
//             previous,
//             data
//           )
//         );


//         // =====================================================
//         // FULL PAGE UNREAD COUNT
//         // =====================================================

//         const unread =
//           data.filter(
//             (notification) =>
//               notification.status ===
//               "UNREAD"
//           ).length;


//         setUnreadCount(unread);


//         // =====================================================
//         // BELL NOTIFICATIONS
//         //
//         // Check whether user previously clicked
//         // "Clear all" in this browser session.
//         // =====================================================

//         const bellClearedAt =
//           sessionStorage.getItem(
//             "foodbridge_bell_cleared_at"
//           );


//         let bellData = data;


//         if (bellClearedAt) {

//           const clearTime =
//             new Date(
//               bellClearedAt
//             ).getTime();


//           bellData =
//             data.filter(
//               (notification) => {

//                 const notificationTime =
//                   parseNotificationDate(
//                     notification.createdAt
//                   )?.getTime() ?? 0;

//                 return (
//                   notificationTime >
//                   clearTime
//                 );
//               }
//             );
//         }


//         setBellNotifications((previous) =>
//           mergeNotifications(
//             [],
//             bellData
//           )
//         );


//         // =====================================================
//         // BELL UNREAD COUNT
//         // =====================================================

//         const bellUnread =
//           bellData.filter(
//             (notification) =>
//               notification.status ===
//               "UNREAD"
//           ).length;


//         setBellUnreadCount(
//           bellUnread
//         );


//       } catch (error) {

//         console.error(
//           "Failed to load notifications:",
//           error
//         );
//       }

//     }, []);


//   // =========================================================
//   // INITIALIZE
//   // =========================================================
//   //
//   // IMPORTANT:
//   // Wait for AuthContext to restore the session first.
//   // This prevents notifications from being skipped immediately
//   // after login when the NotificationProvider mounts before the
//   // authenticated user/token is available.
//   // =========================================================

//   useEffect(() => {

//     // -------------------------------------------------------
//     // WAIT FOR AUTHENTICATION RESTORATION
//     // -------------------------------------------------------

//     if (authLoading) {
//       return;
//     }

//     // -------------------------------------------------------
//     // USER IS NOT AUTHENTICATED
//     // -------------------------------------------------------

//     if (!isAuthenticated || !token || !user?.id) {

//       console.log(
//         "Notification: user not authenticated"
//       );

//       setNotifications([]);
//       setUnreadCount(0);

//       setBellNotifications([]);
//       setBellUnreadCount(0);

//       setConnected(false);

//       return;
//     }

//     // -------------------------------------------------------
//     // CONNECT WEBSOCKET FIRST
//     // -------------------------------------------------------
//     // Register the live listener before the HTTP request so a
//     // notification cannot arrive during loading and get lost.

//     connectWebSocket({

//       userId: user.id,

//       // =====================================================
//       // REAL-TIME NOTIFICATION
//       // =====================================================

//       onNotification: (notification) => {

//         console.log(
//           "🔔 New notification received:",
//           notification
//         );

//         const normalized =
//           normalizeNotification(notification);

//         // ---------------------------------------------------
//         // ADD TO FULL NOTIFICATION HISTORY
//         // ---------------------------------------------------

//         setNotifications((previous) =>
//           mergeNotifications(
//             previous,
//             [normalized]
//           )
//         );

//         // ---------------------------------------------------
//         // ADD TO BELL
//         // ---------------------------------------------------

//         setBellNotifications((previous) =>
//           mergeNotifications(
//             previous,
//             [normalized]
//           )
//         );

//         // ---------------------------------------------------
//         // UPDATE UNREAD COUNTS ONLY FOR UNREAD NOTIFICATIONS
//         // ---------------------------------------------------
//         // ---------------------------------------------------

//         if (normalized.status === "UNREAD") {

//           setUnreadCount(
//             (previous) =>
//               previous + 1
//           );

//           setBellUnreadCount(
//             (previous) =>
//               previous + 1
//           );
//         }
//       },

//       // =====================================================
//       // CONNECTED
//       // =====================================================

//       onConnected: () => {

//         console.log(
//           "✅ Notification WebSocket connected"
//         );

//         setConnected(true);
//       },

//       // =====================================================
//       // ERROR
//       // =====================================================

//       onError: () => {

//         console.error(
//           "❌ Notification WebSocket error"
//         );

//         setConnected(false);
//       },

//     });

//     // -------------------------------------------------------
//     // LOAD EXISTING NOTIFICATIONS
//     // -------------------------------------------------------

//     loadNotifications();

//     // -------------------------------------------------------
//     // BACKUP REFRESH
//     // -------------------------------------------------------
//     // WebSocket is primary; polling self-heals missed events.

//     const refreshTimer =
//       window.setInterval(() => {
//         loadNotifications();
//       }, 15000);

//     // -------------------------------------------------------
//     // CLEANUP
//         // -------------------------------------------------------

//     return () => {

//       window.clearInterval(refreshTimer);

//       disconnectWebSocket();

//       setConnected(false);
//     };

//   }, [
//     authLoading,
//     isAuthenticated,
//     token,
//     user,
//     loadNotifications,
//   ]);


//   // =========================================================
//   // MARK AS READ
//   // =========================================================

//   const markAsRead = async (
//     notificationId
//   ) => {

//     try {

//       const response =
//         await axiosInstance.patch(
//           `/notifications/${notificationId}/read`
//         );


//       const result =
//         response.data;


//       const updatedNotification =
//         normalizeNotification(
//           result?.data
//         );


//       // =====================================================
//       // UPDATE FULL HISTORY
//       // =====================================================

//       setNotifications(
//         (previous) =>
//           previous.map(
//             (notification) =>
//               notification.id ===
//               notificationId
//                 ? updatedNotification
//                 : notification
//           )
//       );


//       // =====================================================
//       // UPDATE BELL
//       // =====================================================

//       setBellNotifications(
//         (previous) =>
//           previous.map(
//             (notification) =>
//               notification.id ===
//               notificationId
//                 ? updatedNotification
//                 : notification
//           )
//       );


//       // =====================================================
//       // FULL PAGE UNREAD COUNT
//       // =====================================================

//       if (updatedNotification?.status !== "UNREAD") {

//         setUnreadCount(
//           (previous) =>
//             Math.max(
//               previous - 1,
//               0
//             )
//         );


//         // ===================================================
//         // BELL UNREAD COUNT
//         // ===================================================

//         setBellUnreadCount(
//           (previous) =>
//             Math.max(
//               previous - 1,
//               0
//             )
//         );
//       }


//     } catch (error) {

//       console.error(
//         "Failed to mark notification as read:",
//         error
//       );
//     }
//   };


//   // =========================================================
//   // MARK ALL AS READ
//   // =========================================================

//   const markAllAsRead = async () => {

//     try {

//       await axiosInstance.patch(
//         "/notifications/read-all"
//       );


//       const now =
//         new Date().toISOString();


//       // =====================================================
//       // UPDATE FULL HISTORY
//       // =====================================================

//       setNotifications(
//         (previous) =>
//           previous.map(
//             (notification) => ({
//               ...notification,
//               status: "READ",
//               readAt:
//                 notification.readAt ||
//                 now,
//             })
//           )
//       );


//       // =====================================================
//       // UPDATE BELL
//       // =====================================================

//       setBellNotifications(
//         (previous) =>
//           previous.map(
//             (notification) => ({
//               ...notification,
//               status: "READ",
//               readAt:
//                 notification.readAt ||
//                 now,
//             })
//           )
//       );


//       setUnreadCount(0);

//       setBellUnreadCount(0);


//     } catch (error) {

//       console.error(
//         "Failed to mark all notifications as read:",
//         error
//       );
//     }
//   };


//   // =========================================================
//   // CLEAR BELL ONLY
//   // =========================================================
//   //
//   // IMPORTANT:
//   //
//   // This DOES NOT modify:
//   //
//   // notifications
//   //
//   // Therefore /notifications page remains untouched.
//   //
//   // It ONLY clears:
//   //
//   // bellNotifications
//   // bellUnreadCount
//   //
//   // =========================================================

//   const clearBellNotifications = () => {

//     const clearTime =
//       new Date().toISOString();


//     // Save timestamp in browser session.
//     //
//     // This means refreshing the page during the
//     // same browser session will NOT immediately
//     // bring the cleared notifications back.

//     sessionStorage.setItem(
//       "foodbridge_bell_cleared_at",
//       clearTime
//     );


//     // Clear ONLY bell

//     setBellNotifications([]);

//     setBellUnreadCount(0);
//   };


//   // =========================================================
//   // CONTEXT VALUE
//   // =========================================================

//   const value = {

//     // -------------------------------------------------------
//     // FULL NOTIFICATION PAGE
//     // -------------------------------------------------------

//     notifications,

//     unreadCount,


//     // -------------------------------------------------------
//     // NAVBAR BELL
//     // -------------------------------------------------------

//     bellNotifications,

//     bellUnreadCount,


//     // -------------------------------------------------------
//     // WEBSOCKET
//     // -------------------------------------------------------

//     connected,


//     // -------------------------------------------------------
//     // ACTIONS
//     // -------------------------------------------------------

//     markAsRead,

//     markAllAsRead,

//     clearBellNotifications,


//     // -------------------------------------------------------
//     // REFRESH
//     // -------------------------------------------------------

//     refreshNotifications:
//       loadNotifications,
//   };


//   return (

//     <NotificationContext.Provider
//       value={value}
//     >

//       {children}

//     </NotificationContext.Provider>

//   );
// };


// // ===========================================================
// // CUSTOM HOOK
// // ===========================================================

// export const useNotifications = () => {

//   const context =
//     useContext(
//       NotificationContext
//     );


//   if (!context) {

//     throw new Error(
//       "useNotifications must be used inside NotificationProvider"
//     );
//   }


//   return context;
// };




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

  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? null
      : value;
  }

  const valueString = String(value).trim();

  if (!valueString) {
    return null;
  }

  // Backend timestamps with an explicit timezone.
  // These are already unambiguous and should be parsed as-is.
  if (
    /(?:Z|[+-]\d{2}:?\d{2})$/i.test(valueString)
  ) {
    const parsed = new Date(valueString);

    return Number.isNaN(parsed.getTime())
      ? null
      : parsed;
  }

  // Spring LocalDateTime without timezone.
  // FoodBridge backend stores these timestamps as UTC.
  // Example: 2026-08-17T16:30:00 -> 2026-08-17T16:30:00Z
  const match = valueString.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,9}))?)?$/
  );

  if (match) {
    const parsed = new Date(`${valueString}Z`);

    return Number.isNaN(parsed.getTime())
      ? null
      : parsed;
  }

  // Fallback for any other valid date representation.
  const parsed = new Date(valueString);

  return Number.isNaN(parsed.getTime())
    ? null
    : parsed;
}

function normalizeNotification(notification) {

  if (!notification) {
    return notification;
  }


  // =========================================================
  // CREATED TIME
  // =========================================================
  //
  // IMPORTANT:
  // createdAt means when the notification was CREATED.
  //
  // Do NOT fall back to updatedAt here.
  // updatedAt can change later when the notification is read
  // or otherwise modified.
  // =========================================================

  const created =
    notification.createdAt ??
    notification.created_at ??
    notification.timestamp ??
    notification.time ??
    null;


  // =========================================================
  // UPDATED TIME
  // =========================================================

  const updated =
    notification.updatedAt ??
    notification.updated_at ??
    notification.createdAt ??
    notification.created_at ??
    null;


  return {

    ...notification,

    createdAt:
      parseNotificationDate(created)
        ?.toISOString() ??
      notification.createdAt ??
      null,

    updatedAt:
      parseNotificationDate(updated)
        ?.toISOString() ??
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

        if (normalized.status === "UNREAD") {

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
        normalizeNotification(
          result?.data
        );


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

      if (updatedNotification?.status !== "UNREAD") {

        setUnreadCount(
          (previous) =>
            Math.max(
              previous - 1,
              0
            )
        );


        // ===================================================
        // BELL UNREAD COUNT
        // ===================================================

        setBellUnreadCount(
          (previous) =>
            Math.max(
              previous - 1,
              0
            )
        );
      }


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
