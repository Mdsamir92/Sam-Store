"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/app/components/Stepper";
import CartStep from "@/app/components/CartStep";
import ShippingStep from "@/app/components/ShippingStep";
import PaymentStep from "@/app/components/PaymentStep";

import useCartStore from "@/app/store/cartStore";
import { useOrderStore } from "@/app/store/orderStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useSession, signOut } from "next-auth/react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { cart, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();

  const { data: session, status } = useSession();



  // 🔒 extra safety (optional)
  // if (!session) return null;

  const [placingOrder, setPlacingOrder] = useState(false);

  // const placeOrder = (paymentMethod: "cod" | "upi" | "card") => {
  //   addOrder({
  //     id: "ORD" + Date.now(),
  //     items: cart,
  //     total: getTotal(),
  //     paymentMethod,
  //     status: "Placed",
  //     createdAt: Date.now(),
  //   });

  //   clearCart();
  //   router.push("/order-success");
  // };

  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);

  const placeOrder = async (paymentMethod: "cod" | "upi" | "card") => {
    if (placingOrder) return; // 🔒 DOUBLE CLICK BLOCK

    setPlacingOrder(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: getTotal(),
          paymentMethod,
          shippingAddress,
        }),
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      clearCart();
      router.push("/order-success");
    } catch (error) {
      alert("Order failed, please try again");
      setPlacingOrder(false); // 🔓 allow retry
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl mt-12 font-bold text-center mb-8">Checkout</h1>

      <Stepper step={step} />

      {step === 1 && <CartStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <ShippingStep onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <PaymentStep
          onBack={() => setStep(2)}
          onPlaceOrder={placeOrder}
          loading={placingOrder}
        />
      )}
    </section>
  );
}
