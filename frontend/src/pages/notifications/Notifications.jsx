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
      return "bg-[#EAF1FF] text-[#1557D6]";

    case "DONATION_ACCEPTED":
      return "bg-[#EAF1FF] text-[#1557D6]";

    case "DONATION_PICKED_UP":
      return "bg-[#FFF6DF] text-[#B7791F]";

    case "DONATION_DELIVERED":
      return "bg-[#EAF8F2] text-[#16845A]";

    case "DONATION_EXPIRED":
      return "bg-[#FFF0F2] text-[#C83E4D]";

    case "FOUNDATION_VERIFIED":
      return "bg-[#EAF1FF] text-[#1557D6]";

    case "FOUNDATION_REJECTED":
      return "bg-[#FFF0F2] text-[#C83E4D]";

    default:
      return "bg-gray-400/10 text-[#17233D]";
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

const notificationStyles = `
@keyframes notificationCardIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.notification-card {
    animation: notificationCardIn .38s ease-out both;
}

.notification-card:hover {
    transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
    .notification-card {
        animation: none !important;
        transition: none !important;
    }
}
`;

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

  const handleMarkAsRead = async (notification) => {
    if (notification.status !== "UNREAD" || !markAsRead) {
      return;
    }

    try {
      await markAsRead(notification.id);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // =========================================================
  // MARK ALL AS READ
  // =========================================================

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0 || !markAllAsRead) {
      return;
    }

    try {
      await markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return (
    <>
      <style>{notificationStyles}</style>

      <main
        className="
        min-h-[calc(100vh-5rem)]
        bg-[#F8FAFD]
        px-5
        py-10
        text-[#17233D]
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
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#1557D6]
              "
              >
                <Bell size={15} />
                Notifications
              </div>

              <h1
                className="
                text-3xl
                font-extrabold
                tracking-tight
                text-[#17233D]
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
                text-[#17233D]
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
                border-[#E1E6EE]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#17233D]
                transition
                hover:border-[#9FB8E8]
                hover:bg-[#EAF1FF]
                hover:text-[#1557D6]
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
            border-[#E1E6EE]
            bg-[#F8FAFD]
            px-5
            py-4
          "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#17233D]">
                  Total notifications
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#17233D]">
                  {notifications.length}
                </p>
              </div>

              <div>
                <p className="text-right text-xs font-bold uppercase tracking-wider text-[#17233D]">
                  Unread
                </p>

                <p className="mt-1 text-right text-xl font-extrabold text-[#1557D6]">
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
              border-[#E1E6EE]
              bg-white
              shadow-[0_6px_24px_rgba(23,35,61,0.05)]
            "
            >
              {notifications.map((notification, index) => {
                const unread = notification.status === "UNREAD";

                return (
                  <div
                    key={notification.id}
                    className={`
                      notification-card border-b
                      border-[#E6EAF0]
                      p-5 transition-all duration-200
                      transition
                      last:border-b-0
                      hover:bg-[#F8FAFD]
                      ${unread ? "bg-[#F2F6FF]" : ""}
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
                          ${getNotificationColor(notification.type)}
                        `}
                      >
                        {getNotificationIcon(notification.type)}
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
                                    bg-[#1557D6]
                                  "
                                />
                              )}

                              <h2
                                className={`
                                  text-sm
                                  ${
                                    unread
                                      ? "font-semibold text-[#17233D]"
                                      : "font-semibold text-black"
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
        text-[#17233D]
    "
                            >
                              {(() => {
                                const message = notification.message || "";

                                // Detect the foundation name after "by"
                                const match =
                                  message.match(/^(.*?\sby\s)(.+)$/i);

                                if (!match) {
                                  return message;
                                }

                                return (
                                  <>
                                    {match[1]}
                                    <strong className="font-bold text-[#111827]">
                                      {match[2]}
                                    </strong>
                                  </>
                                );
                              })()}
                            </p>
                          </div>

                          {/* =================================================
                              STATUS
                          ================================================= */}

                          <span
                            title={unread ? "Unread" : "Read"}
                            aria-label={unread ? "Unread" : "Read"}
                            className={`
                              inline-flex
                              shrink-0
                              items-center
                              justify-center
                              ${unread ? "text-[#9AA4B3]" : "text-[#1557D6]"}
                            `}
                          >
                            <CheckCheck size={18} strokeWidth={2.5} />
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
                              text-[#17233D]
                            "
                          >
                            {formatDate(notification.createdAt)}
                          </span>

                          {/* {notification.referenceId && (

                            <span
                              className="
                                text-[11px]
                                text-[#17233D]
                              "
                            >
                              Reference #{notification.referenceId}
                            </span>

                          )} */}

                          {unread && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(notification)}
                              className="
                                ml-auto
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-[#17233D]
                                transition
                                hover:text-[#1557D6]
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
              })}
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
              border-[#E1E6EE]
              bg-white
              px-6
              shadow-[0_6px_24px_rgba(23,35,61,0.05)]
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
                bg-[#F2F6FF]
                text-[#17233D]
              "
              >
                <Bell size={28} />
              </div>

              <h2
                className="
                mt-5
                text-lg
                font-semibold
                text-[#17233D]
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
                text-[#17233D]
              "
              >
                When there is activity on your FoodBridge account, you'll see
                notifications here.
              </p>

              <Link
                to="/home"
                className="
                mt-6
                rounded-xl
                border
                border-[#E1E6EE]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#17233D]
                transition
                hover:bg-[#F2F6FF]
                hover:text-[#17233D]
              "
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
