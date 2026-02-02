"use client";

import useWishlistStore from "@/app/store/wishlistStore";
import Link from "next/link";

export default function WishlistPage() {
    
  const { wishlist, removeFromWishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        ❤️ Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {wishlist.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4">
            <Link href={`/product/${p._id}`}>
              <img src={p.image} className="w-full h-56 object-contain" />
            </Link>

            <h3 className="font-semibold mt-3">{p.title}</h3>
            <p className="text-yellow-600 font-bold">₹{p.price}</p>

            <button
              onClick={() => removeFromWishlist(p._id)}
              className="mt-3 text-sm text-red-500"
            >
              Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
