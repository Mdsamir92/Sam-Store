import Link from "next/link";
import { FiCheckCircle, FiShoppingBag, FiArrowRight } from "react-icons/fi";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div
        className="
          bg-white rounded-3xl shadow-2xl
          p-10 max-w-md w-full text-center
          animate-fadeIn
        "
      >
        {/* ✅ SUCCESS ICON */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-green-100 blur-2xl" />
          </div>

          <div className="relative bg-green-50 rounded-full p-4">
            <FiCheckCircle className="text-green-500 text-7xl animate-ping" />
          </div>
        </div>

        {/* ✅ TITLE */}
        <h1 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully 🎉
        </h1>

        {/* ✅ SUBTEXT */}
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          Thank you for shopping with us. Your order has been confirmed and will
          be processed shortly.
        </p>

        {/* ✅ ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/orders"
            className="
              flex items-center justify-center gap-2
              w-full py-3 rounded-xl
               font-semibold
              bg-linear-to from-indigo-600 to-blue-600
              hover:from-indigo-700 hover:to-blue-700
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            <FiShoppingBag />
            View My Orders
            <FiArrowRight />
          </Link>

          <Link
            href="/"
            className="
              w-full py-3 rounded-xl
              border border-gray-300
              text-gray-700 font-semibold
              hover:bg-gray-100
              transition-all duration-300
            "
          >
            Continue Shopping
          </Link>
        </div>

        {/* ✅ FOOTER NOTE */}
        <p className="mt-6 text-xs text-gray-400">
          You will receive order updates via email & notifications.
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;
