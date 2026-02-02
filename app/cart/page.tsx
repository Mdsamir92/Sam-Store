"use client";

import Link from "next/link";

function Cartpage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart 🛒</h1>

      {/* CART TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* ITEM 1 */}
            <tr className="border-t">
              <td className="p-3 flex items-center gap-6">
                <Link href="/product/1">
                  <img
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/m/u/a/s-ts58-vebnor-original-imahgky5gwhkhtny.jpeg?q=70"
                    alt="product"
                    className="w-20 h-20 rounded object-contain"
                  />
                </Link>
                <div>
                  <p className="font-semibold">Men Printed T-Shirt</p>
                  <p className="text-sm text-gray-500">Size: M</p>
                  <p className="text-sm text-gray-500">Color: Blue</p>
                </div>
              </td>

              <td className="p-3 text-center">₹1799</td>

              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button className="bg-gray-200 px-3 rounded">−</button>
                  <span className="font-semibold">1</span>
                  <button className="bg-gray-200 px-3 rounded">+</button>
                </div>
              </td>

              <td className="p-3 text-center font-semibold">₹1799</td>

              <td className="p-3 text-center">
                <button className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-black">
                  Remove
                </button>
              </td>
            </tr>

            {/* ITEM 2 */}
            <tr className="border-t">
              <td className="p-3 flex items-center gap-6">
                <Link href="/product/1">
                  <img
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/t/o/m-polo-8016-kajaru-original-imahefhyrsazsbga.jpeg?q=70"
                    alt="product"
                    className="w-20 h-20 rounded object-contain"
                  />
                </Link>
                <div>
                  <p className="font-semibold">Men Casual T-Shirt</p>
                  <p className="text-sm text-gray-500">Size: L</p>
                  <p className="text-sm text-gray-500">Color: Pink</p>
                </div>
              </td>

              <td className="p-3 text-center">₹1499</td>

              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button className="bg-gray-200 px-3 rounded">−</button>
                  <span className="font-semibold">2</span>
                  <button className="bg-gray-200 px-3 rounded">+</button>
                </div>
              </td>

              <td className="p-3 text-center font-semibold">₹2998</td>

              <td className="p-3 text-center">
                <button className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-black">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-8 flex justify-end">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-87.5">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>3</span>
          </div>

          <div className="flex justify-between mb-4 font-semibold">
            <span>Total Price</span>
            <span className="text-indigo-600 text-lg">₹4797</span>
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;




