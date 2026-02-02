"use client";

import { useState } from "react";
import { FiCreditCard, FiSmartphone, FiTruck } from "react-icons/fi";

interface Props {
  onBack: () => void;
  onPlaceOrder: (method: "cod" | "upi" | "card") => void;
  loading: boolean;
}


function PaymentStep({ onBack, onPlaceOrder,loading }: any) {
  const [method, setMethod] = useState<"card" | "upi" | "cod">("cod");

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <FiCreditCard /> Credit / Debit Card
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          <FiSmartphone /> UPI
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          <FiTruck /> Cash on Delivery
        </label>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-10">
        <button
          disabled={loading}
          onClick={onBack}
          className={`
    px-4 py-2 rounded-lg border font-medium
    ${
      loading
        ? "text-gray-400 border-gray-300 cursor-not-allowed"
        : "text-gray-700 border-gray-400 hover:bg-gray-100"
    }
  `}
        >
          ← Back
        </button>

        {/* <button
          onClick={() => onPlaceOrder(method)} // 🔥 MAIN CHANGE
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
        >
          Place Order
        </button> */}
        <button
          disabled={loading}
          onClick={() => onPlaceOrder(method)}
          className={`
      px-8 py-2  rounded-xl text-white font-semibold
    flex items-center justify-center gap-2
    transition-all duration-300
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
    }
  `}
        >
          {loading ? (
            <>
              {/* 🔄 Spinner */}
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <p className="text-white text-lg bg-black px-6 py-2 rounded-xl cursor-pointer">
                {" "}
                <span>🛒</span>Place Order
              </p>{" "}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PaymentStep;
