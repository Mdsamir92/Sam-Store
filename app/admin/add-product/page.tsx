"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ColorInput {
  name: string;
  hex: string;
  image: File | null;
}

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    category: "",
    description: "",
    sizes: "",
    features: "",
    rating: "",
    ratingCount: "",
  });

  const [colors, setColors] = useState<ColorInput[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  /* ================= HELPERS ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addColor = () => {
    setColors([...colors, { name: "", hex: "", image: null }]);
  };

  const updateColor = (index: number, field: keyof ColorInput, value: any) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: value };
    setColors(updated);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!mainImage) {
      alert("Main image required");
      return;
    }

    setLoading(true);

    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("price", form.price);
    fd.append("oldPrice", form.oldPrice);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("rating", form.rating || "0");
    fd.append("ratingCount", form.ratingCount || "0");

    // convert to arrays
    fd.append(
      "sizes",
      JSON.stringify(form.sizes.split(",").map((s) => s.trim()))
    );
    fd.append(
      "features",
      JSON.stringify(form.features.split(",").map((f) => f.trim()))
    );

    fd.append("image", mainImage);

    // colors (images will be handled server-side)
    fd.append(
      "colors",
      JSON.stringify(
        colors.map((c) => ({
          name: c.name,
          hex: c.hex,
        }))
      )
    );

    colors.forEach((c, i) => {
      if (c.image) {
        fd.append(`colorImage_${i}`, c.image);
      }
    });

    const res = await fetch("/api/admin/add-products", {
      method: "POST",
      body: fd,
    });

    setLoading(false);

    if (res.ok) {
      alert("Product Added Successfully ✅");

      setForm({
        title: "",
        price: "",
        oldPrice: "",
        category: "",
        description: "",
        sizes: "",
        features: "",
        rating: "",
        ratingCount: "",
      });

      setColors([]);
      setMainImage(null);

      router.push("/"); // ✅ redirect to home
    } else {
      alert("Something went wrong ❌");
    }
  };


  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMainImage(file);

    // preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


  const inputStyle =
    "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black";

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto p-8 mt-16 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <input
            name="title"
            value={form.title}
            placeholder="Product title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <input
            name="category"
            value={form.category}
            placeholder="tshirt / jeans"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Price</label>
          <input
            name="price"
            placeholder="₹1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
            value={form.price}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Old Price</label>
          <input
            name="oldPrice"
            placeholder="₹2000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
            value={form.oldPrice}
          />
        </div>
      </div>

      {/* RATING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="text-sm font-medium mb-1 block">Rating</label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Rating Count</label>
          <input
            name="ratingCount"
            type="number"
            value={form.ratingCount}
            onChange={handleChange}
            className="input"
            placeholder="Rating count"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea
          name="description"
          rows={4}
          placeholder="Product description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                   focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleChange}
          value={form.description}
        />
      </div>

      {/* SIZES & FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="text-sm font-medium mb-1 block">Sizes</label>
          <input
            name="sizes"
            placeholder="S,M,L,XL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
            value={form.sizes}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Features</label>
          <input
            name="features"
            placeholder="Cotton, Slim Fit"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
            value={form.features}
          />
        </div>
      </div>

      {/* MAIN IMAGE */}
      {/* <div className="mt-6">
        <label className="text-sm font-medium mb-1 block">Main Image</label>
        <input
          type="file"
          className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:bg-black file:text-white"
          onChange={(e) => setMainImage(e.target.files?.[0]!)}
        />
      </div> */}
      {/* MAIN IMAGE */}
      <div className="mt-6">
        <label className="text-sm font-medium mb-1 block">Main Image</label>

        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:bg-black file:text-white"
          onChange={handleMainImageChange}
        />

        {/* PREVIEW */}
        {mainImagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Preview</p>
            <img
              src={mainImagePreview}
              alt="Main preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* ================= COLOR VARIANTS ================= */}
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Color Variants</h2>

          <button
            type="button"
            onClick={addColor}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            + Add Color
          </button>
        </div>

        {colors.length === 0 && (
          <p className="text-sm text-gray-500">
            No colors added yet. Click “Add Color”.
          </p>
        )}
      </div>

      {colors.map((c, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 items-center"
        >
          {/* Color Name */}
          <input
            placeholder="Color name (e.g. Blue)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                 focus:outline-none focus:ring-2 focus:ring-black"
            value={c.name}
            onChange={(e) => updateColor(i, "name", e.target.value)}
          />

          <input
            value={c.hex ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              // basic hex validation (optional but recommended)
              if (/^#?[0-9a-fA-F]{0,6}$/.test(val)) {
                updateColor(i, "hex", val.startsWith("#") ? val : `#${val}`);
              }
            }}
            placeholder="#704532"
            className="input"
          />

          {/* PICK COLOR BUTTON */}
          <label className="relative cursor-pointer">
            <span className="block w-full text-center px-3 py-2 bg-black text-white rounded-lg text-sm">
              Pick Color
            </span>

            {/* HIDDEN COLOR PICKER */}
            <input
              type="color"
              className="absolute inset-0 opacity-0 cursor-pointer"
              value={c.hex || "#000000"}
              onChange={(e) => updateColor(i, "hex", e.target.value)}
            />
          </label>

          {/* COLOR PREVIEW */}
          <div
            className="w-10 h-10 rounded-lg border"
            style={{ backgroundColor: c.hex || "#fff" }}
            title={c.hex}
          />

          {/* COLOR IMAGE */}
          <input
            type="file"
            className="text-sm"
            onChange={(e) => updateColor(i, "image", e.target.files?.[0])}
          />

          {/* REMOVE */}
          <button
            onClick={() => removeColor(i)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-10 w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl text-lg font-semibold"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
}
