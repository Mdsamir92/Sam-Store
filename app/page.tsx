import HeroCarousel from "@/app/components/Hero";
import ProductList from "@/app/components/ProductList";
import { Suspense } from "react";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      <Suspense
        fallback={<div className="py-10 text-center">Loading products...</div>}
      >
        <ProductList />
      </Suspense>
    </div>
  );
}
