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
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mt-10">
        {/* BACK BUTTON */}
        <button
          disabled={loading}
          onClick={onBack}
          className={`
      w-full sm:w-auto
      px-4 py-3 rounded-lg border font-medium
      transition
      ${
        loading
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "text-gray-700 border-gray-400 hover:bg-gray-100"
      }
    `}
        >
          ← Back
        </button>

        {/* PLACE ORDER BUTTON */}
        <button
          disabled={loading}
          onClick={() => onPlaceOrder(method)}
          className={`
      w-full sm:w-auto
      px-6 py-3 rounded-xl
      text-white font-semibold
      flex items-center justify-center gap-2
      transition-all duration-300
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
      }
    `}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <span>🛒</span>
              <span className="text-sm sm:text-base">Place Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PaymentStep;
