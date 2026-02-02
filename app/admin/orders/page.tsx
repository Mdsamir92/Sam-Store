"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  title: string;
  image: string;
  price: number;
  qty: number;
  selectedSize?: string; // ✅ FIX
  selectedColor?: string; // ✅ Fix
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
}

interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  deliveredAt?: string; // ✅ ADD THIS
  paymentMethod: string;
  userId: {
    username: string;
    email: string;
  };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  const ADMIN_STATUSES = ["Placed", "Shipped", "Delivered"] as const;

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Optimistic UI update
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      alert("Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  const cancelRequests = orders.filter((o) => o.status === "Cancel Requested");

const normalOrders = orders.filter((o) => o.status !== "Cancelled");


const approveCancel = async (orderId: string) => {
  const res = await fetch(`/api/orders/${orderId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "approve" }), // ✅ REQUIRED
  });

  if (!res.ok) {
    alert("Approve failed");
    return;
  }

 setOrders((prev) => prev.filter((o) => o._id !== orderId));

};

const deleteOrder = async (orderId: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    // UI se order hata do
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  } catch (error) {
    alert("Failed to delete order");
  }
};


  return (
    <div className="max-w-360 mx-auto  py-12 mt-12">
      <h1 className="text-3xl font-bold mb-8">Admin • Orders</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm">
          {/* ===== TABLE HEAD ===== */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Order Id</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Shipping</th>
              <th className="px-6 py-4 text-left">Products</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4 text-center">Payment</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* ===== TABLE BODY ===== */}
          <tbody className="divide-y">
            {normalOrders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition align-top"
              >
                <td className="px-4 py-5">
                  <p className="text-sm font-semibold">{order._id}</p>
                </td>
                {/* CUSTOMER */}
                <td className="px-6 py-5">
                  <p className="font-semibold">{order.userId?.username}</p>
                  <p className="text-xs text-gray-500">{order.userId?.email}</p>
                </td>

                {/* SHIPPING */}
                <td className="px-6 py-5 text-xs text-gray-700">
                  {order.shippingAddress ? (
                    <>
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress.fullName}
                      </p>
                      <p>📞 {order.shippingAddress.phone}</p>
                      <p className="line-clamp-3">
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </p>
                    </>
                  ) : (
                    <span className="text-gray-400">No address</span>
                  )}
                </td>

                {/* PRODUCTS */}
                <td className="px-6 py-5">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />

                        <div className="space-y-0.5">
                          <p className="font-medium line-clamp-1">
                            {item.title}
                          </p>

                          <p className="text-xs text-gray-500">
                            Qty: {item.qty}
                          </p>

                          {/* SIZE & COLOR */}
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex gap-2 text-xs text-gray-600">
                              {item.selectedSize && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                              {item.selectedColor && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* TOTAL */}
                <td className="px-6 py-5 text-center font-semibold">
                  ₹{order.total}
                </td>

                {/* PAYMENT */}
                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.paymentMethod === "COD"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>

                {/* STATUS */}
                {/* <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "Placed"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </td> */}
                {/* STATUS */}
                <td className="px-6 py-5 text-center">
                  {order.status === "Cancel Requested" ? (
                    <button
                      onClick={() => approveCancel(order._id)}
                      className="px-4 py-1 cursor-pointer bg-red-600 text-white rounded-lg text-sm"
                    >
                      Approve Cancel
                    </button>
                  ) : (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="px-3 py-1 rounded-lg text-sm bg-yellow-100"
                    >
                      {ADMIN_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* DATE */}
                {/* <td className="px-6 py-5 text-right text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td> */}
                <td className="px-6 py-5 text-right text-xs text-gray-500 space-y-1">
                  {/* ORDER DATE – always show */}
                  <div>
                    <span className="font-medium text-gray-600">
                      Ordered on:
                    </span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </div>

                  {/* DELIVERED DATE – only when delivered */}
                  {order.status === "Delivered" && order.deliveredAt && (
                    <div className="text-green-600">
                      <span className="font-medium">Delivered on:</span>{" "}
                      {new Date(order.deliveredAt).toLocaleString()}
                    </div>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5 text-center">
                  {/* <button
                    disabled={order.status === "Delivered"}
                    onClick={() => deleteOrder(order._id)}
                    className={`p-2 rounded-lg 
             ${
          order.status === "Delivered"
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-red-100 text-red-600"
            }`}
                  >
                  Delete
                  </button> */}
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                    title="Delete Order"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CANCEL REQUESTS SECTION ================= */}
      {/* {cancelRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            🔴 Cancel Requests
          </h2>

          <div className="space-y-4">
            {cancelRequests.map((order) => (
              <div
                key={order._id}
                className="border border-red-300 bg-red-50 rounded-xl
                     p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    {order.userId?.username} requested cancellation
                  </p>
                </div>

                <button
                  onClick={() => approveCancel(order._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Approve Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
