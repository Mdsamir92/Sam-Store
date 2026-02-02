"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Categories from "@/app/components/Categories";
import ProductCard from "@/app/components/ProductCard";
import PriceFilter from "@/app/components/PriceFilter";
import { useSearchStore } from "@/app/store/searchStore";

function ProductList() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const [price, setPrice] = useState(5000);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


   const { query } = useSearchStore();

  // 🔥 FETCH PRODUCTS FROM DB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
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

const filteredProducts = products.filter((product) => {
  const matchCategory =
    activeCategory === "all" ? true : product.category === activeCategory;

  const matchPrice = product.price <= price;

  const matchSearch =
    query.trim() === ""
      ? true
      : product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase());

  return matchCategory && matchPrice && matchSearch;
});

  return (
    <section className="max-w-350 mx-auto px-6 py-16">
      <Categories />

      <div className="grid md:grid-cols-4 gap-10 mt-10">
        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <PriceFilter price={price} setPrice={setPrice} />
        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500">
              No products found for this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;


