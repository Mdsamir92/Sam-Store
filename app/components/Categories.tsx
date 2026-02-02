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
    <div className="flex gap-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleCategory(cat.value)}
          className={`px-5 py-2 rounded-full border font-medium transition
            ${
              activeCategory === cat.value
                ? "bg-gray-900 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default Categories;
