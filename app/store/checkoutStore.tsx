import { create } from "zustand";

interface ShippingAddress {
  fullName: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
}

interface CheckoutStore {
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (data: ShippingAddress) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  shippingAddress: null,
  setShippingAddress: (data) => set({ shippingAddress: data }),
}));
