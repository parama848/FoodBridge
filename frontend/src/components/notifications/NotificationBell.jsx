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
          border-[#D9E1ED]
          text-[#17233D]
          transition
          hover:border-[#BFD0EA]
          hover:bg-[#F2F6FF]
          hover:text-[#111827]
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
              text-[#111827]
              ring-2
              ring-white
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
            border-[#D9E1ED]
            bg-white
            shadow-[0_12px_32px_rgba(23,35,61,0.12)]
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
              border-[#D9E1ED]
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
                  text-[#111827]
                "
              >
                Notifications
              </h3>


              <p
                className="
                  mt-1
                  text-[11px]
                  text-[#334155]
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
                    text-[#334155]
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
                  text-[#1557D6]
                  transition
                  hover:text-[#0F46B5]
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
                      border-[#E7ECF3]
                      px-4
                      py-4
                      transition
                      hover:bg-[#F5F8FC]

                      ${
                        notification.status ===
                        "UNREAD"

                          ? "bg-[#F8FAFD]"

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

                                ? "font-bold text-[#111827]"

                                : "font-semibold text-[#111827]"
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
                            text-[#334155]
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
                            text-[#475569]
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
                  bg-[#F5F8FC]
                  text-[#334155]
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
                  text-[#111827]
                "
              >
                No notifications
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  text-[#475569]
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
              border-[#D9E1ED]
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
                text-[#17233D]
                transition
                hover:text-[#111827]
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