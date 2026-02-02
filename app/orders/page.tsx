"use client";

import {useState, useEffect } from "react";
import { useOrderStore, Order } from "@/app/store/orderStore";
import { useSearchStore } from "@/app/store/searchStore";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const setOrders = useOrderStore((state) => state.setOrders);

  // search order using zustand
  const { query } = useSearchStore();

const filteredOrders = query
  ? orders.filter(
      (order) =>
        // 🔎 match by ORDER STATUS
        order.status?.toLowerCase().includes(query.toLowerCase()) ||
        // 🔎 match by ANY PRODUCT TITLE
        order.items.some((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
    )
  : orders;


  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  useEffect(() => {
    fetch("/api/orders/my")
      .then((res) => res.json())
      .then((data: Order[]) => setOrders(data));
  }, [setOrders]);

  const requestCancel = async (orderId: string) => {
    const res = await fetch(`/api/orders/${orderId}/cancel`, {
      method: "PATCH",
      body: JSON.stringify({ action: "request" }),
    });

    if (res.ok) {
      // ✅ Zustand compatible update
      const updatedOrders: Order[] = orders.map((order) =>
        order._id === orderId ? { ...order, status: "Cancel Requested" } : order
      );

      setOrders(updatedOrders); // ✅ NO ERROR
    }
  };


  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="bg-white rounded-lg shadow-sm border">
        {filteredOrders.map((order) => (
          <div key={order._id} className="border-b last:border-b-0 p-4 md:p-6">
            {/* ORDER ROW */}
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* LEFT: PRODUCTS */}
              <div className="flex gap-4 flex-1">
                {/* FIRST ITEM IMAGE */}
                <img
                  src={order.items[0]?.image}
                  alt={order.items[0]?.title}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="space-y-2 flex-1">
                  {/* TITLE */}
                  <p className="font-medium text-gray-900 line-clamp-2">
                    {order.items[0]?.title}
                  </p>

                  {/* SIZE / COLOR / QTY */}
                  <p className="text-xs text-gray-600">
                    Size: {order.items[0]?.selectedSize ?? "-"} | Color:{" "}
                    {order.items[0]?.selectedColor ?? "-"} | Qty:{" "}
                    {order.items[0]?.qty}
                  </p>

                  {/* ORDER ID */}
                  <p className="text-xs text-gray-400">Order ID: {order._id}</p>

                  {/* EXPAND BUTTON */}
                  {order.items.length > 1 && (
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      {expandedOrders.includes(order._id)
                        ? "Hide items"
                        : `+ ${order.items.length - 1} more item(s)`}
                    </button>
                  )}

                  {/* EXPANDED ITEMS */}
                  {expandedOrders.includes(order._id) && (
                    <div className="mt-3 space-y-3">
                      {order.items.slice(1).map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-3 pl-4 border-l">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 object-cover rounded-md border"
                          />

                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              Size: {item.selectedSize ?? "-"} | Color:{" "}
                              {item.selectedColor ?? "-"} | Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CENTER: STATUS */}
              <div className="min-w-48 space-y-1">
                {/* STATUS LINE */}
                <div
                  className={`flex items-center gap-2 font-semibold
      ${
        order.status === "Delivered"
          ? "text-green-700 text-base"
          : order.status === "Cancelled"
          ? "text-red-600"
          : order.status === "Cancel Requested"
          ? "text-yellow-600"
          : "text-blue-600"
      }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                  {order.status}
                </div>

                {/* STATUS MESSAGE */}
                {order.status === "Delivered" && (
                  <p className="text-xs text-gray-500 py-2">
                    Your item has been delivered successfully
                  </p>
                )}

                {/* DATES */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-medium text-gray-600">Ordered:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  {/* DOWN ARROW */}
                  <div className="flex justify-center text-gray-400 text-sm">
                    ▼
                  </div>

                  {order.status === "Delivered" && order.deliveredAt && (
                    <div className="text-green-600">
                      <span className="font-medium">Delivered:</span>{" "}
                      {new Date(order.deliveredAt).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* CANCEL STATES */}
                {order.status === "Placed" && (
                  <button
                    onClick={() => requestCancel(order._id)}
                    className="pt-1 text-xs text-red-500 font-medium hover:underline"
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === "Cancel Requested" && (
                  <p className="pt-1 text-xs text-yellow-600">
                    Cancellation pending approval
                  </p>
                )}
              </div>

              {/* RIGHT: PRICE */}
              <div className="text-right min-w-30">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{order.total}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
