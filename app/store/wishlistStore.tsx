import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  _id: string;
  title: string;
  image: string;
  price: number;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (item) => {
        const exists = get().wishlist.find((p) => p._id === item._id);

        if (exists) {
          set({
            wishlist: get().wishlist.filter((p) => p._id !== item._id),
          });
        } else {
          set({ wishlist: [...get().wishlist, item] });
        }
      },

      removeFromWishlist: (id) =>
        set({
          wishlist: get().wishlist.filter((p) => p._id !== id),
        }),

      isInWishlist: (id) => get().wishlist.some((p) => p._id === id),
    }),
    {
      name: "wishlist-storage", // localStorage key
    }
  )
);

export default useWishlistStore;
