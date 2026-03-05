"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchStore } from "@/app/store/searchStore";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PRODUCTS FROM DB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);


// search product using zustand 
  const { query } = useSearchStore();

 const filteredProducts = products.filter( (p) =>
     p.title.toLowerCase().includes(query.toLowerCase()) ||
     p.category.toLowerCase().includes(query.toLowerCase()) ||
     String(p.rating).includes(query) || // ✅ FIX
     String(p.price).includes(query) || // ✅ FIX
     String(p.ratingCount).includes(query) // optional
   
 );

 const handleDeleteProduct = async (id: string): Promise<void> => {
   const ok = confirm("Are you sure you want to delete this product?");
   if (!ok) return;

   try {
     const res = await fetch(`/api/admin/products/${id}`, {
       method: "DELETE",
     });

     if (res.ok) {
       alert("Product deleted ✅");
       setProducts((prev) => prev.filter((x) => x._id !== id));
     } else {
       alert("Delete failed ❌");
     }
   } catch (error) {
     console.error("Delete error:", error);
     alert("Something went wrong ❌");
   }
 };


  // ✅ RETURNS AFTER ALL HOOKS
  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center text-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-360 mt-12 mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>

        <Link href="/admin/orders" className="px-4 py-2  rounded-lg">
          <h1 className="text-2xl font-bold">All Orders</h1>
        </Link>
        <Link
          href="/admin/add-product"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Features</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">
                  <Link href={`/product/${p._id}`}>
                    <img
                      src={p.image}
                      className=" h-32 object-cover rounded-lg"
                    />
                  </Link>
                </td>

                <td className="p-3 font-medium">{p.title}</td>

                <td className="p-3">
                  ₹{p.price}
                  {p.oldPrice && (
                    <span className="ml-2 line-through text-gray-400">
                      ₹{p.oldPrice}
                    </span>
                  )}
                </td>

                <td className="p-3 capitalize">{p.category}</td>
                <td className="p-3 capitalize">{p.description}</td>
                <td className="p-3 capitalize">{p.features}</td>

                <td className="p-3">
                  ⭐ {p.rating} ({p.ratingCount})
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {/* EDIT */}
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="px-3 py-1 text-xs rounded-md
                 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
