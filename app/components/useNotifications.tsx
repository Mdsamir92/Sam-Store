"use client";

import { useEffect, useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  

const fetchNotifications = async () => {
  try {
    const res = await fetch("/api/notifications", {
      credentials: "include",
    });

    // ❌ Unauthorized / error case
    if (!res.ok) {
      setNotifications([]);
      return;
    }

    const data = await res.json();

    // ✅ Ensure array
    setNotifications(Array.isArray(data) ? data : []);
  } catch (err) {
    setNotifications([]); // ✅ fallback
  }
};


  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
    });

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAll = async () => {
    await fetch("/api/notifications/clear", {
      method: "DELETE",
    });
    setNotifications([]);
  };

  // const unreadCount = notifications.filter((n) => !n.isRead).length;
  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0;


  return {
    notifications,
    unreadCount,
    markAsRead,
    clearAll,
  };
}
