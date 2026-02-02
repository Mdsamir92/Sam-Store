"use client";

import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "@/app/components/useNotifications";
import { timeAgo } from "@/app/components/TimeAgo";

function NotificationBell() {
  const { notifications, unreadCount, markAsRead, clearAll } =
    useNotifications();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* BELL */}
      <FiBell
        className="w-6 h-6 cursor-pointer text-gray-700"
        onClick={() => setOpen(!open)}
      />

      {/* BADGE */}
      {unreadCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full cursor-pointer animate-bounce"
          onClick={() => setOpen(!open)}
        >
          {unreadCount}
        </span>
      )}

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl z-50">
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h4 className="font-semibold text-sm">Notifications</h4>

            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm font-medium cursor-pointer text-red-500 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`px-4 py-3 border-b last:border-none transition
                    ${!n.isRead ? "bg-gray-50" : "opacity-60"}
                  `}
                >
                  <div className="flex justify-between items-start gap-3">
                    {/* TEXT CONTENT (NO READ ACTION HERE) */}
                    <div>
                      <p
                        className={`text-sm ${
                          !n.isRead
                            ? "font-semibold text-gray-900 "
                            : "font-normal text-red-700"
                        }`}
                      >
                        {n.title}
                      </p>
                      <p className="text-xs text-red-900">{n.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>

                    {/* MARK AS READ BUTTON */}
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-sm font-medium cursor-pointer text-blue-600 hover:underline whitespace-nowrap"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
