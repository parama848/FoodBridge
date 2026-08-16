// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNotifications } from "../../context/NotificationContext";

// function formatTime(dateString) {
//   if (!dateString) {
//     return "";
//   }

//   const date = new Date(dateString);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const now = new Date();

//   const difference =
//     Math.floor((now.getTime() - date.getTime()) / 1000);

//   if (difference < 60) {
//     return "Just now";
//   }

//   const minutes = Math.floor(difference / 60);

//   if (minutes < 60) {
//     return `${minutes}m ago`;
//   }

//   const hours = Math.floor(minutes / 60);

//   if (hours < 24) {
//     return `${hours}h ago`;
//   }

//   const days = Math.floor(hours / 24);

//   if (days < 7) {
//     return `${days}d ago`;
//   }

//   return date.toLocaleDateString();
// }

// function getNotificationColor(type) {
//   switch (type) {
//     case "NEW_DONATION":
//       return "bg-emerald-400";

//     case "DONATION_ACCEPTED":
//       return "bg-blue-400";

//     case "DONATION_PICKED_UP":
//       return "bg-yellow-400";

//     case "DONATION_DELIVERED":
//       return "bg-green-400";

//     case "DONATION_EXPIRED":
//       return "bg-red-400";

//     case "FOUNDATION_VERIFIED":
//       return "bg-emerald-400";

//     case "FOUNDATION_REJECTED":
//       return "bg-red-400";

//     default:
//       return "bg-gray-400";
//   }
// }

// export default function NotificationBell() {

//   const [open, setOpen] = useState(false);

//   const {
//     notifications = [],
//     unreadCount = 0,
//     markAsRead,
//   } = useNotifications();


//   // =========================================================
//   // LATEST NOTIFICATIONS
//   // =========================================================

//   const latestNotifications =
//     notifications.slice(0, 6);


//   // =========================================================
//   // HANDLE NOTIFICATION CLICK
//   // =========================================================

//   const handleNotificationClick = async (
//     notification
//   ) => {

//     if (
//       notification.status === "UNREAD" &&
//       markAsRead
//     ) {
//       try {
//         await markAsRead(notification.id);
//       } catch (error) {
//         console.error(
//           "Failed to mark notification as read:",
//           error
//         );
//       }
//     }

//     setOpen(false);
//   };


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <div className="relative">

//       {/* =====================================================
//           NOTIFICATION BUTTON
//       ===================================================== */}

//       <button
//         type="button"
//         onClick={() =>
//           setOpen((previous) => !previous)
//         }
//         className="
//           relative
//           flex
//           h-10
//           w-10
//           items-center
//           justify-center
//           rounded-xl
//           border
//           border-white/10
//           text-gray-400
//           transition
//           hover:border-white/20
//           hover:bg-white/[0.05]
//           hover:text-white
//         "
//         aria-label="Notifications"
//         title="Notifications"
//       >

//         {/* Bell */}

//         <svg
//           width="18"
//           height="18"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.8"
//         >
//           <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

//           <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//         </svg>


//         {/* =================================================
//             UNREAD BADGE
//         ================================================= */}

//         {unreadCount > 0 && (

//           <span
//             className="
//               absolute
//               -right-1
//               -top-1
//               flex
//               min-h-[18px]
//               min-w-[18px]
//               items-center
//               justify-center
//               rounded-full
//               bg-red-500
//               px-1
//               text-[9px]
//               font-bold
//               text-white
//               ring-2
//               ring-[#050505]
//             "
//           >
//             {unreadCount > 9
//               ? "9+"
//               : unreadCount}
//           </span>

//         )}

//       </button>


//       {/* =====================================================
//           DROPDOWN
//       ===================================================== */}

//       {open && (

//         <div
//           className="
//             absolute
//             right-0
//             top-12
//             z-[100]
//             w-[350px]
//             overflow-hidden
//             rounded-2xl
//             border
//             border-white/10
//             bg-[#090909]
//             shadow-2xl
//           "
//         >

//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               border-b
//               border-white/10
//               px-4
//               py-4
//             "
//           >

//             <div>

//               <h3 className="text-sm font-semibold text-white">
//                 Notifications
//               </h3>

//               <p className="mt-1 text-[11px] text-gray-500">
//                 {unreadCount > 0
//                   ? `${unreadCount} unread notification${
//                       unreadCount === 1 ? "" : "s"
//                     }`
//                   : "You're all caught up"}
//               </p>

//             </div>


//             <Link
//               to="/notifications"
//               onClick={() => setOpen(false)}
//               className="
//                 text-xs
//                 font-medium
//                 text-emerald-400
//                 transition
//                 hover:text-emerald-300
//               "
//             >
//               View all
//             </Link>

//           </div>


//           {/* =================================================
//               NOTIFICATION LIST
//           ================================================= */}

//           {latestNotifications.length > 0 ? (

//             <div
//               className="
//                 max-h-[380px]
//                 overflow-y-auto
//               "
//             >

//               {latestNotifications.map(
//                 (notification) => (

//                   <Link
//                     key={notification.id}
//                     to="/notifications"
//                     onClick={() =>
//                       handleNotificationClick(
//                         notification
//                       )
//                     }
//                     className={`
//                       block
//                       border-b
//                       border-white/[0.06]
//                       px-4
//                       py-4
//                       transition
//                       hover:bg-white/[0.04]
//                       ${
//                         notification.status ===
//                         "UNREAD"
//                           ? "bg-white/[0.025]"
//                           : ""
//                       }
//                     `}
//                   >

//                     <div className="flex gap-3">

//                       {/* Status dot */}

//                       <div
//                         className={`
//                           mt-1.5
//                           h-2
//                           w-2
//                           shrink-0
//                           rounded-full
//                           ${getNotificationColor(
//                             notification.type
//                           )}
//                         `}
//                       />


//                       <div className="min-w-0 flex-1">

//                         {/* Title */}

//                         <p
//                           className={`
//                             text-sm
//                             ${
//                               notification.status ===
//                               "UNREAD"
//                                 ? "font-semibold text-white"
//                                 : "font-medium text-gray-300"
//                             }
//                           `}
//                         >
//                           {notification.title}
//                         </p>


//                         {/* Message */}

//                         <p
//                           className="
//                             mt-1
//                             line-clamp-2
//                             text-xs
//                             leading-5
//                             text-gray-500
//                           "
//                         >
//                           {notification.message}
//                         </p>


//                         {/* Time */}

//                         <p
//                           className="
//                             mt-2
//                             text-[10px]
//                             text-gray-600
//                           "
//                         >
//                           {formatTime(
//                             notification.createdAt
//                           )}
//                         </p>

//                       </div>

//                     </div>

//                   </Link>

//                 )
//               )}

//             </div>

//           ) : (

//             /* =================================================
//                EMPTY STATE
//             ================================================= */

//             <div
//               className="
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 px-6
//                 py-12
//                 text-center
//               "
//             >

//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-white/[0.04]
//                   text-gray-500
//                 "
//               >

//                 <svg
//                   width="22"
//                   height="22"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.7"
//                 >
//                   <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

//                   <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//                 </svg>

//               </div>


//               <p className="mt-4 text-sm font-medium text-gray-300">
//                 No notifications
//               </p>

//               <p className="mt-1 text-xs text-gray-600">
//                 New activity will appear here.
//               </p>

//             </div>

//           )}


//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div
//             className="
//               border-t
//               border-white/10
//               px-4
//               py-3
//               text-center
//             "
//           >

//             <Link
//               to="/notifications"
//               onClick={() => setOpen(false)}
//               className="
//                 text-xs
//                 font-medium
//                 text-gray-400
//                 transition
//                 hover:text-white
//               "
//             >
//               View all notifications
//             </Link>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

import { useNotifications } from "../../context/NotificationContext";


// =========================================================
// FORMAT NOTIFICATION TIME
// =========================================================

function formatTime(dateString) {

  if (!dateString) {
    return "";
  }


  const date = new Date(dateString);


  if (Number.isNaN(date.getTime())) {
    return "";
  }


  const now = new Date();


  const difference =
    Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );


  // -------------------------------------------------------
  // JUST NOW
  // -------------------------------------------------------

  if (difference < 60) {
    return "Just now";
  }


  // -------------------------------------------------------
  // MINUTES
  // -------------------------------------------------------

  const minutes =
    Math.floor(difference / 60);


  if (minutes < 60) {
    return `${minutes}m ago`;
  }


  // -------------------------------------------------------
  // HOURS
  // -------------------------------------------------------

  const hours =
    Math.floor(minutes / 60);


  if (hours < 24) {
    return `${hours}h ago`;
  }


  // -------------------------------------------------------
  // DAYS
  // -------------------------------------------------------

  const days =
    Math.floor(hours / 24);


  if (days < 7) {
    return `${days}d ago`;
  }


  return date.toLocaleDateString();
}


// =========================================================
// NOTIFICATION DOT COLOR
// =========================================================

function getNotificationColor(type) {

  switch (type) {

    case "NEW_DONATION":
      return "bg-emerald-400";


    case "DONATION_ACCEPTED":
      return "bg-blue-400";


    case "DONATION_PICKED_UP":
      return "bg-yellow-400";


    case "DONATION_DELIVERED":
      return "bg-green-400";


    case "DONATION_EXPIRED":
      return "bg-red-400";


    case "FOUNDATION_VERIFIED":
      return "bg-emerald-400";


    case "FOUNDATION_REJECTED":
      return "bg-red-400";


    case "DELIVERY_UPDATED":
      return "bg-purple-400";


    default:
      return "bg-gray-400";
  }
}


// =========================================================
// NOTIFICATION BELL
// =========================================================

export default function NotificationBell() {

  const [open, setOpen] =
    useState(false);


  const {

    // -----------------------------------------------------
    // IMPORTANT:
    // These are ONLY for the Navbar bell.
    // -----------------------------------------------------

    bellNotifications = [],

    bellUnreadCount = 0,


    // -----------------------------------------------------
    // Mark notification as read
    // -----------------------------------------------------

    markAsRead,


    // -----------------------------------------------------
    // Clear ONLY Navbar bell
    // -----------------------------------------------------

    clearBellNotifications,

  } = useNotifications();


  // =========================================================
  // SHOW ONLY LATEST 6 IN BELL
  // =========================================================

  const latestNotifications =
    bellNotifications.slice(0, 6);


  // =========================================================
  // HANDLE NOTIFICATION CLICK
  // =========================================================

  const handleNotificationClick = async (
    notification
  ) => {

    // -------------------------------------------------------
    // Mark unread notification as read
    // -------------------------------------------------------

    if (
      notification.status === "UNREAD" &&
      markAsRead
    ) {

      try {

        await markAsRead(
          notification.id
        );

      } catch (error) {

        console.error(
          "Failed to mark notification as read:",
          error
        );
      }
    }


    // -------------------------------------------------------
    // Close dropdown
    // -------------------------------------------------------

    setOpen(false);
  };


  // =========================================================
  // CLEAR ALL FROM BELL
  // =========================================================
  //
  // IMPORTANT:
  //
  // This does NOT delete notifications.
  //
  // This does NOT clear the /notifications page.
  //
  // It only clears the Navbar bell.
  //
  // =========================================================

  const handleClearAll = () => {

    if (!clearBellNotifications) {
      return;
    }


    clearBellNotifications();


    // Close dropdown after clearing

    setOpen(false);
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="relative">


      {/* =====================================================
          NOTIFICATION BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) =>
              !previous
          )
        }
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          text-gray-400
          transition
          hover:border-white/20
          hover:bg-white/[0.05]
          hover:text-white
        "
        aria-label="Notifications"
        title="Notifications"
      >

        {/* =================================================
            BELL ICON
        ================================================= */}

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >

          <path
            d="
              M18 8
              a6 6 0 0 0-12 0
              c0 7-3 7-3 9
              h18
              c0-2-3-2-3-9
            "
          />

          <path
            d="
              M13.73 21
              a2 2 0 0 1-3.46 0
            "
          />

        </svg>


        {/* =================================================
            UNREAD BADGE
        ================================================= */}

        {bellUnreadCount > 0 && (

          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-[18px]
              min-w-[18px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[9px]
              font-bold
              text-white
              ring-2
              ring-[#050505]
            "
          >

            {bellUnreadCount > 9
              ? "9+"
              : bellUnreadCount}

          </span>

        )}

      </button>


      {/* =====================================================
          DROPDOWN
      ===================================================== */}

      {open && (

        <div
          className="
            absolute
            right-0
            top-12
            z-[100]
            w-[350px]
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#090909]
            shadow-2xl
          "
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-4
              py-4
            "
          >

            {/* ---------------------------------------------
                TITLE
            --------------------------------------------- */}

            <div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Notifications
              </h3>


              <p
                className="
                  mt-1
                  text-[11px]
                  text-gray-500
                "
              >

                {bellUnreadCount > 0

                  ? `${bellUnreadCount} unread notification${
                      bellUnreadCount === 1
                        ? ""
                        : "s"
                    }`

                  : "You're all caught up"

                }

              </p>

            </div>


            {/* ---------------------------------------------
                HEADER ACTIONS
            --------------------------------------------- */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              {/* ===========================================
                  CLEAR ALL
              =========================================== */}

              {bellNotifications.length > 0 && (

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="
                    text-xs
                    font-medium
                    text-gray-500
                    transition
                    hover:text-red-400
                  "
                >
                  Clear all
                </button>

              )}


              {/* ===========================================
                  VIEW ALL
              =========================================== */}

              <Link
                to="/notifications"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  text-xs
                  font-medium
                  text-emerald-400
                  transition
                  hover:text-emerald-300
                "
              >
                View all
              </Link>

            </div>

          </div>


          {/* =================================================
              NOTIFICATION LIST
          ================================================= */}

          {latestNotifications.length > 0 ? (

            <div
              className="
                max-h-[380px]
                overflow-y-auto
              "
            >

              {latestNotifications.map(
                (notification) => (

                  <Link
                    key={notification.id}
                    to="/notifications"
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className={`
                      block
                      border-b
                      border-white/[0.06]
                      px-4
                      py-4
                      transition
                      hover:bg-white/[0.04]

                      ${
                        notification.status ===
                        "UNREAD"

                          ? "bg-white/[0.025]"

                          : ""
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        gap-3
                      "
                    >

                      {/* ===================================
                          STATUS DOT
                      =================================== */}

                      <div
                        className={`
                          mt-1.5
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          ${getNotificationColor(
                            notification.type
                          )}
                        `}
                      />


                      {/* ===================================
                          CONTENT
                      =================================== */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        {/* ---------------------------------
                            TITLE
                        --------------------------------- */}

                        <p
                          className={`
                            text-sm

                            ${
                              notification.status ===
                              "UNREAD"

                                ? "font-semibold text-white"

                                : "font-medium text-gray-300"
                            }
                          `}
                        >
                          {notification.title}
                        </p>


                        {/* ---------------------------------
                            MESSAGE
                        --------------------------------- */}

                        <p
                          className="
                            mt-1
                            line-clamp-2
                            text-xs
                            leading-5
                            text-gray-500
                          "
                        >
                          {notification.message}
                        </p>


                        {/* ---------------------------------
                            TIME
                        --------------------------------- */}

                        <p
                          className="
                            mt-2
                            text-[10px]
                            text-gray-600
                          "
                        >
                          {formatTime(
                            notification.createdAt
                          )}
                        </p>

                      </div>

                    </div>

                  </Link>

                )
              )}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                px-6
                py-12
                text-center
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.04]
                  text-gray-500
                "
              >

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >

                  <path
                    d="
                      M18 8
                      a6 6 0 0 0-12 0
                      c0 7-3 7-3 9
                      h18
                      c0-2-3-2-3-9
                    "
                  />

                  <path
                    d="
                      M13.73 21
                      a2 2 0 0 1-3.46 0
                    "
                  />

                </svg>

              </div>


              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-gray-300
                "
              >
                No notifications
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  text-gray-600
                "
              >
                New activity will appear here.
              </p>

            </div>

          )}


          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              border-t
              border-white/10
              px-4
              py-3
              text-center
            "
          >

            <Link
              to="/notifications"
              onClick={() =>
                setOpen(false)
              }
              className="
                text-xs
                font-medium
                text-gray-400
                transition
                hover:text-white
              "
            >
              View all notifications
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}