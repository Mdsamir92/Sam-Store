"use client";

import useCartStore from "@/app/store/cartStore";
import Link from "next/link";

function CartStep({ onNext }: { onNext: () => void }) {
  
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const discount = 200;
  const shipping = 50;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const total = cart.length === 0 ? 0 : subtotal - discount + shipping;

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-10">
      {/* LEFT – CART ITEMS */}
      <div className="md:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
        <h2 className="font-semibold text-lg mb-4 sm:mb-6">Cart Items</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty 🛒</p>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6
                         mb-6 border-b pb-6"
            >
              <Link
                href={`/product/${item.id}`}
              >
                <img
                  src={item.image}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto sm:mx-0"
                  alt={item.title}
                />
              </Link>

              {/* INFO */}
              <div className="flex-1 text-center sm:text-left">
                <p className="font-medium">{item.title}</p>

                {(item.selectedSize || item.selectedColor) && (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.selectedSize && `Size: ${item.selectedSize}`}{" "}
                    {item.selectedColor && `| Color: ${item.selectedColor}`}
                  </p>
                )}

                <p className="font-semibold mt-1">₹{item.price}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* QTY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      decreaseQty(
                        item.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                    }
                    className="w-8 h-8 cursor-pointer rounded-md bg-gray-900 text-white
                               hover:bg-black transition"
                  >
                    −
                  </button>

                  <span className="w-6 text-center font-semibold">
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(
                        item.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                    }
                    className="w-8 h-8 cursor-pointer rounded-md bg-gray-900 text-white
                               hover:bg-black transition"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedSize,
                      item.selectedColor
                    )
                  }
                  className="text-lg cursor-pointer font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT – SUMMARY */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 h-fit">
        <h2 className="font-semibold text-lg mb-4">Cart Details</h2>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-2 text-green-600 text-sm sm:text-base">
          <span>Discount</span>
          <span>-₹{cart.length ? discount : 0}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm sm:text-base">
          <span>Shipping</span>
          <span>₹{cart.length ? shipping : 0}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={onNext}
          className={`w-full py-3 rounded-lg text-sm sm:text-base cursor-pointer
            ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

export default CartStep;
