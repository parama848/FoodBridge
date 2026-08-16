import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Package,
  Truck,
  Utensils,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";


function getNotificationIcon(type) {
  switch (type) {
    case "NEW_DONATION":
      return <Utensils size={18} />;

    case "DONATION_ACCEPTED":
      return <Check size={18} />;

    case "DONATION_PICKED_UP":
      return <Truck size={18} />;

    case "DONATION_DELIVERED":
      return <Package size={18} />;

    case "DONATION_EXPIRED":
      return <Clock size={18} />;

    case "FOUNDATION_VERIFIED":
      return <ShieldCheck size={18} />;

    case "FOUNDATION_REJECTED":
      return <ShieldX size={18} />;

    default:
      return <Bell size={18} />;
  }
}


function getNotificationColor(type) {
  switch (type) {
    case "NEW_DONATION":
      return "bg-emerald-400/10 text-emerald-400";

    case "DONATION_ACCEPTED":
      return "bg-blue-400/10 text-blue-400";

    case "DONATION_PICKED_UP":
      return "bg-yellow-400/10 text-yellow-400";

    case "DONATION_DELIVERED":
      return "bg-green-400/10 text-green-400";

    case "DONATION_EXPIRED":
      return "bg-red-400/10 text-red-400";

    case "FOUNDATION_VERIFIED":
      return "bg-emerald-400/10 text-emerald-400";

    case "FOUNDATION_REJECTED":
      return "bg-red-400/10 text-red-400";

    default:
      return "bg-gray-400/10 text-gray-400";
  }
}


function formatDate(dateString) {

  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default function Notifications() {

  const {
    notifications = [],
    unreadCount = 0,
    markAsRead,
    markAllAsRead,
  } = useNotifications();


  // =========================================================
  // LOAD / REFRESH
  // =========================================================

  useEffect(() => {
    // NotificationContext is responsible for
    // loading notifications from the backend.
  }, []);


  // =========================================================
  // MARK AS READ
  // =========================================================

  const handleMarkAsRead = async (
    notification
  ) => {

    if (
      notification.status !== "UNREAD" ||
      !markAsRead
    ) {
      return;
    }

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
  };


  // =========================================================
  // MARK ALL AS READ
  // =========================================================

  const handleMarkAllAsRead = async () => {

    if (
      unreadCount === 0 ||
      !markAllAsRead
    ) {
      return;
    }

    try {

      await markAllAsRead();

    } catch (error) {

      console.error(
        "Failed to mark all notifications as read:",
        error
      );

    }
  };


  return (

    <main
      className="
        min-h-[calc(100vh-5rem)]
        bg-[#050505]
        px-5
        py-10
        text-white
        sm:px-6
        lg:px-8
      "
    >

      <div className="mx-auto max-w-4xl">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-emerald-400
              "
            >
              <Bell size={15} />

              Notifications

            </div>


            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              Your notifications
            </h1>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              "
            >
              Stay updated with your FoodBridge activity.
            </p>

          </div>


          {/* =================================================
              MARK ALL
          ================================================= */}

          {unreadCount > 0 && (

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-300
                transition
                hover:border-emerald-400/30
                hover:bg-emerald-400/10
                hover:text-emerald-400
              "
            >

              <CheckCheck size={16} />

              Mark all as read

            </button>

          )}

        </div>


        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div
          className="
            mb-5
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            px-5
            py-4
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-gray-600">
                Total notifications
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {notifications.length}
              </p>

            </div>


            <div>

              <p className="text-right text-xs uppercase tracking-wider text-gray-600">
                Unread
              </p>

              <p className="mt-1 text-right text-xl font-semibold text-emerald-400">
                {unreadCount}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            NOTIFICATION LIST
        ===================================================== */}

        {notifications.length > 0 ? (

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#090909]
            "
          >

            {notifications.map(
              (notification, index) => {

                const unread =
                  notification.status ===
                  "UNREAD";

                return (

                  <div
                    key={notification.id}
                    className={`
                      border-b
                      border-white/[0.07]
                      p-5
                      transition
                      last:border-b-0
                      hover:bg-white/[0.025]
                      ${
                        unread
                          ? "bg-white/[0.02]"
                          : ""
                      }
                    `}
                  >

                    <div className="flex gap-4">


                      {/* =================================================
                          ICON
                      ================================================= */}

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${getNotificationColor(
                            notification.type
                          )}
                        `}
                      >
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>


                      {/* =================================================
                          CONTENT
                      ================================================= */}

                      <div className="min-w-0 flex-1">

                        <div
                          className="
                            flex
                            flex-col
                            gap-2
                            sm:flex-row
                            sm:items-start
                            sm:justify-between
                          "
                        >

                          <div>

                            <div className="flex items-center gap-2">

                              {unread && (

                                <span
                                  className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-400
                                  "
                                />

                              )}

                              <h2
                                className={`
                                  text-sm
                                  ${
                                    unread
                                      ? "font-semibold text-white"
                                      : "font-medium text-gray-300"
                                  }
                                `}
                              >
                                {notification.title}
                              </h2>

                            </div>


                            <p
                              className="
                                mt-2
                                text-sm
                                leading-6
                                text-gray-500
                              "
                            >
                              {notification.message}
                            </p>

                          </div>


                          {/* =================================================
                              STATUS
                          ================================================= */}

                          <span
                            className={`
                              shrink-0
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-wider
                              ${
                                unread
                                  ? "text-emerald-400"
                                  : "text-gray-600"
                              }
                            `}
                          >
                            {unread
                              ? "Unread"
                              : "Read"}
                          </span>

                        </div>


                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div
                          className="
                            mt-4
                            flex
                            flex-wrap
                            items-center
                            gap-4
                          "
                        >

                          <span
                            className="
                              text-[11px]
                              text-gray-600
                            "
                          >
                            {formatDate(
                              notification.createdAt
                            )}
                          </span>


                          {notification.referenceId && (

                            <span
                              className="
                                text-[11px]
                                text-gray-600
                              "
                            >
                              Reference #{notification.referenceId}
                            </span>

                          )}


                          {unread && (

                            <button
                              type="button"
                              onClick={() =>
                                handleMarkAsRead(
                                  notification
                                )
                              }
                              className="
                                ml-auto
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-gray-400
                                transition
                                hover:text-emerald-400
                              "
                            >

                              <Check size={14} />

                              Mark as read

                            </button>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        ) : (

          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div
            className="
              flex
              min-h-[400px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-[#090909]
              px-6
              text-center
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white/[0.04]
                text-gray-600
              "
            >

              <Bell size={28} />

            </div>


            <h2
              className="
                mt-5
                text-lg
                font-semibold
                text-gray-300
              "
            >
              No notifications yet
            </h2>


            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-gray-600
              "
            >
              When there is activity on your FoodBridge
              account, you'll see notifications here.
            </p>


            <Link
              to="/home"
              className="
                mt-6
                rounded-xl
                border
                border-white/10
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-400
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              Back to Home
            </Link>

          </div>

        )}

      </div>

    </main>
  );
}