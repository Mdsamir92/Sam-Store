import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Order {
  _id: string;
  items: any[];
  total: number;
  paymentMethod?: "cod" | "upi" | "card";
  status?:
    | "Placed"
    | "Shipped"
    | "Delivered"
    | "Cancel Requested"
    | "Cancelled";

  createdAt: number;
  deliveredAt?: string; // ✅ ADD THIS
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void; // ✅ ADD THIS
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      // ✅ FIX
      setOrders: (orders) => set({ orders }),

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
    }
  )
);
