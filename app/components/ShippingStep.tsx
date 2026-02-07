"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
 import { useCheckoutStore } from "@/app/store/checkoutStore";
/* ---------------- ZOD SCHEMA ---------------- */
const shippingSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone number"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  address: z.string().min(10, "Address is too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

function ShippingStep({ onNext, onBack }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
  });

 

  const setShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress
  );

 

  const onSubmit = (data: ShippingFormData) => {
    setShippingAddress(data); // ✅ SAVE IN STORE
    onNext();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8"
    >
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-2">Shipping Address</h2>
      <p className="text-gray-500 mb-8">Please enter your delivery details</p>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="10-digit mobile number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium mb-1">Pincode</label>
          <input
            {...register("pincode")}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="Postal code"
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.pincode.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="House no, street, area"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            {...register("city")}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="City"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            {...register("state")}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gray-900"
            placeholder="State"
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>
      </div>

{/* ACTION BUTTONS */}
<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
  
  {/* BACK */}
  <button
    type="button"
    onClick={onBack}
    className="
      w-full sm:w-auto
      text-gray-600 font-medium
      text-center sm:text-left
      hover:underline
    "
  >
    ← Back to Cart
  </button>

  {/* CONTINUE */}
  <button
    type="submit"
    disabled={!isValid}
    className={`
      w-full sm:w-auto
      px-6 py-3 rounded-lg
      font-semibold
      transition
      ${
        isValid
          ? "bg-gray-900 text-white hover:bg-black"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
  >
    Continue to Payment →
  </button>

</div>

    </form>
  );
}

export default ShippingStep;
