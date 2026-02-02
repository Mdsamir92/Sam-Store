"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import useCartStore from "@/app/store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [showSizeChart, setShowSizeChart] = useState(false);

  // ✅ MOVE HOOKS UP
  const [activeColor, setActiveColor] = useState<any>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const addToCart = useCartStore((state: any) => state.addToCart);

  // FETCH PRODUCT
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        console.log(data.product);
        setLoading(false);

      })
      .catch(() => setLoading(false));
  }, [id]);

  // SET DEFAULT COLOR
  useEffect(() => {
    if (product?.colors?.length) {
      setActiveColor(product.colors[0]);
    }
  }, [product]);

  // ✅ RETURNS AFTER ALL HOOKS
  if (loading) {
    return <div className="p-10 flex items-center justify-center text-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 mt-12 grid md:grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="bg-gray-50 rounded-2xl p-6 flex justify-center">
        <img
          src={activeColor?.image || product.image}
          className="max-h-112 object-contain"
          alt={product.title}
        />
      </div>

      {/* INFO */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <FiStar
              key={i}
              className={
                i <= (product.rating ?? 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}

          <span className="text-sm text-gray-500">
            ({product.ratingCount ?? 0} ratings)
          </span>
        </div>

        {/* PRICE */}
        <div className="flex gap-3 mt-4">
          <span className="text-2xl font-bold">₹{product.price}</span>
          {product.oldPrice && (
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* COLORS */}
        {product.colors?.length > 0 && (
          <div className="mt-6">
            <p className="font-medium mb-2">Select Color</p>

            <div className="flex gap-3">
              {product.colors.map((c: any) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    activeColor?.name === c.name
                      ? "ring-2 ring-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: c.hex || "#ddd",
                  }}
                  title={c.name} // 👈 hover pe bhi dikhega
                />
              ))}
            </div>

            {/* 👇 SELECTED COLOR NAME */}
            {activeColor && (
              <p className="mt-2 text-sm text-gray-700">
                Selected Color:{" "}
                <span className="font-semibold capitalize">
                  {activeColor.name}
                </span>
              </p>
            )}
          </div>
        )}

        {/* featres  */}
        {product.features?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {product.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* SIZES */}
        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between ">
              <p className="font-semibold text-lg">Select Size</p>

              <button
                onClick={() => setShowSizeChart(true)}
                className="font-semibold text-lg text-blue-600 cursor-pointer hover:underline"
              >
                Size Chart
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className={`px-4 py-2 rounded border transition
          ${
            activeSize === s
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-black"
          }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ADD TO CART */}
        <button
          onClick={() =>
            addToCart({
              id: product._id,
              title: product.title,
              price: product.price,
              image: activeColor?.image || product.image,
              selectedSize: activeSize,
              selectedColor: activeColor?.name,
            })
          }
          className="mt-8 w-full justify-center cursor-pointer py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full font-semibold flex items-center gap-2"
        >
          Add to Cart <FiShoppingCart />
        </button>
      </div>

      {showSizeChart && (
        <>
          {/* OVERLAY */}
          <div
            onClick={() => setShowSizeChart(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* SIZE CHART MODAL */}
          {showSizeChart && (
            <>
              {/* OVERLAY */}
              <div
                onClick={() => setShowSizeChart(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />

              {/* MODAL */}
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
                  {/* HEADER */}
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Size Chart</h3>
                    <button
                      onClick={() => setShowSizeChart(false)}
                      className="text-2xl font-bold text-gray-500 hover:text-black"
                    >
                      ✕
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="grid md:grid-cols-2 gap-6 p-6 max-h-[75vh] overflow-y-auto">
                    {/* LEFT : SIZE TABLE */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="border px-3 py-2">Size</th>
                            <th className="border px-3 py-2">Chest</th>
                            <th className="border px-3 py-2">Brand Size</th>
                            <th className="border px-3 py-2">Shoulder</th>
                            <th className="border px-3 py-2">Length</th>
                            <th className="border px-3 py-2">Sleeve</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["S", "36", "S", "16", "26", "33"],
                            ["M", "38", "M", "17", "27", "33"],
                            ["L", "40", "L", "18", "28", "33"],
                            ["XL", "42", "XL", "19", "29", "33"],
                            ["XXL", "44", "XXL", "20", "29", "33"],
                          ].map((row, i) => (
                            <tr key={i} className="text-center">
                              {row.map((cell, idx) => (
                                <td key={idx} className="border px-3 py-2">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* RIGHT : MEASURING INFO */}
                    <div className="text-sm text-gray-700 space-y-3">
                      <h4 className="font-semibold text-base">
                        Measuring T-Shirt Size
                      </h4>

                      <p>
                        <strong>Shoulder:</strong> Measure the shoulder at the
                        back, from edge to edge with arms relaxed.
                      </p>

                      <p>
                        <strong>Chest:</strong> Measure around the body under
                        the arms at the fullest part of the chest.
                      </p>

                      <p>
                        <strong>Sleeve:</strong> Measure from the shoulder seam
                        through the outer arm to the cuff/hem.
                      </p>

                      <p>
                        <strong>Length:</strong> Measure from the highest point
                        of the shoulder seam to the bottom hem.
                      </p>

                      {/* DIAGRAM */}
                      <img
                        src="https://rukminim2.flixcart.com/www/240/240/prod/images/sizechart/t_shirt-half_sleeve-men_s-round_neck-d3fa68ae.jpg?q=90"
                        alt="Size measurement guide"
                        className="mt-4 w-full max-w-xs"
                      />

                      <p className="text-xs text-gray-400">
                        * Measurements may vary slightly by brand & fabric.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
