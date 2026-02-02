import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: String },
    description: { type: String },

    sizes: [String],
    features: [String],

    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    image: { type: String, required: true },

    colors: [
      {
        name: String,
        hex: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
