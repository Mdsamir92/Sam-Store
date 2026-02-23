"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const categories = [
    { label: "All", value: "all" },
    { label: "T-Shirt", value: "tshirt" },
    { label: "Shirt", value: "shirt" },
    { label: "Jeans", value: "jeans" },
    { label: "Jacket", value: "jacket" },
  ];

  const handleCategory = (value: string) => {
    if (value === "all") {
      router.push("/", { scroll: false });
    } else {
      router.push(`/?category=${value}`, { scroll: false });
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex gap-4 flex-wrap justify-center bg-white px-6 py-4 rounded-2xl shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 border
              ${
                activeCategory === cat.value
                  ? "bg-gray-900 text-white border-gray-900 scale-105 shadow-md"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
