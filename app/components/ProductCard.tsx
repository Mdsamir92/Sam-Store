"use client";

import useWishlistStore from "@/app/store/wishlistStore";
import Link from "next/link";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

import { FaHeart } from "react-icons/fa";
function ProductCard({ product }: any) {
    const { toggleWishlist, isInWishlist } = useWishlistStore();

    const liked = isInWishlist(product._id);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative bg-gray-50 aspect-4/5 flex items-center justify-center p-4 cursor-pointer">
        {/* IMAGE */}
        {/* <Link href={`/product/${product._id}`}> */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        {/* </Link> */}

        {/* ❤️ HEART ICON */}
        <button
          onClick={() =>
            toggleWishlist({
              _id: product._id,
              title: product.title,
              image: product.image,
              price: product.price,
            })
          }
          className="absolute top-3 right-3 z-10"
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FiHeart className="text-gray-500 text-xl hover:text-red-500" />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-1 mt-2 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={
                i < (product.rating || 0) ? "fill-yellow-400" : "text-gray-300"
              }
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({product.ratingCount || 0})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-lg font-bold">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <Link href={`/product/${product._id}`}>
          <button
            className="mt-5 w-full flex items-center justify-center gap-2
              bg-yellow-400 hover:bg-yellow-500 text-black
              font-semibold py-2.5 rounded-full transition cursor-pointer"
          >
            <FiShoppingCart />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
