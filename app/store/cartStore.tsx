import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, "qty">) => void;
  increaseQty: (id: number, size?: string, color?: string) => void;
  decreaseQty: (id: number, size?: string, color?: string) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotal: () => number; // ✅ ADD THIS
}

const useCartStore = create<CartStore>()(
  persist(
    (set,get) => ({
      cart: [],

      /* ➕ ADD TO CART */
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (p) =>
              p.id === item.id &&
              p.selectedSize === item.selectedSize &&
              p.selectedColor === item.selectedColor
          );

          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p === existing ? { ...p, qty: p.qty + 1 } : p
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, qty: 1 }],
          };
        }),

      /* ➕ INCREASE */
      increaseQty: (id, size, color) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        })),

      /* ➖ DECREASE */
      decreaseQty: (id, size, color) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id &&
              item.selectedSize === size &&
              item.selectedColor === color
                ? { ...item, qty: item.qty - 1 }
                : item
            )
            .filter((item) => item.qty > 0),
        })),

      /* ❌ REMOVE */
      removeFromCart: (id, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        })),

      clearCart: () => set({ cart: [] }),
      getTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;

