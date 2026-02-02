import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    items: [
      {
        title: String,
        image: String,
        price: Number,
        qty: Number,
        selectedSize: String,
        selectedColor: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      pincode: String,
      address: String,
      city: String,
      state: String,
    },

    total: Number,
    paymentMethod: String,

    status: {
      type: String,
      default: "Placed",
    },
    
    deliveredAt: {
      type: Date, // ✅ NEW
    },
  },
  { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", orderSchema);
