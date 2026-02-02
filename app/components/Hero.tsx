// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section
//       className="relative overflow-hidden bg-linear-to-br from-yellow-50 via-white to-gray-50
//     py-24"
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
//           {/* LEFT CONTENT */}
//           <div>
//             <span
//               className="inline-flex items-center mb-5 px-4 py-1.5 text-sm font-medium
//                              bg-yellow-100 text-yellow-700 rounded-full"
//             >
//               ✨ New Season Arrivals
//             </span>

//             <h1
//               className="text-4xl md:text-5xl lg:text-6xl font-bold
//                            leading-tight text-gray-900"
//             >
//               Discover Your <br />
//               <span className="text-yellow-400">Perfect Style</span>
//             </h1>

//             <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed">
//               Shop the latest trends in fashion, footwear, and accessories.
//               Elevate your look with premium-quality products.
//             </p>

//             {/* CTA */}
//             <div className="mt-10 flex items-center gap-4">
//               <Link
//                 href="/shop"
//                 className="md:px-8 px-4 md:py-3 py-2 text-sm rounded-full bg-yellow-400
//                            text-black font-semibold hover:bg-yellow-500
//                            transition shadow-md"
//               >
//                 Shop Now
//               </Link>

//               <Link
//                 href="/categories"
//                 className="md:px-8 px-4 md:py-3 py-2 text-sm rounded-full border border-gray-300
//                            font-semibold hover:bg-gray-100 transition"
//               >
//                 Explore
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative">
//             {/* GLOW */}
//             <div
//               className="absolute -top-16 -right-16 w-96 h-96
//                             bg-yellow-300 rounded-full blur-3xl opacity-30"
//             />

//             {/* IMAGE CARD */}
//             <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
//               <img
//                 src="https://rukminim1.flixcart.com/www/1070/750/promos/30/08/2023/85837403-84fa-49b6-a23d-9c878b810d45.jpg?q=80"
//                 alt="Shopping Banner"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    {
      badge: "🔥 Trending Now",
      title: "Discover Your",
      highlight: "Perfect Style",
      desc: "Shop the latest trends in fashion, footwear, and accessories crafted for comfort & confidence.",
      points: [
        "✔ Premium quality fabrics",
        "✔ Easy returns & fast delivery",
        "✔ New arrivals every week",
      ],
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=60",
      cta1: "Shop Now",
      cta2: "Explore",
    },
    {
      badge: "✨ Best Sellers",
      title: "Upgrade Your",
      highlight: "Wardrobe",
      desc: "Handpicked shirts, jeans & essentials designed to match every occasion.",
      points: [
        "✔ Office & casual wear",
        "✔ Affordable premium styles",
        "✔ Loved by thousands",
      ],
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=60",
      cta1: "View Collection",
      cta2: "Trending",
    },
    {
      badge: "🆕 Just Launched",
      title: "New Season",
      highlight: "New Arrivals",
      desc: "Fresh styles, modern fits and exclusive designs just for you.",
      points: [
        "✔ Limited edition styles",
        "✔ Perfect fit guarantee",
        "✔ Refresh your look",
      ],
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60",
      cta1: "Shop New",
      cta2: "Explore",
    },
  ];

  return (
    <div className="max-w-8xl mx-auto mt-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="
    flex flex-col-reverse
    md:grid md:grid-cols-2
    gap-8
    items-center
    px-4 md:px-16
    py-10 md:py-16
    bg-lienar-to-r from-white to-yellow-50
  "
            >
              {/* 🔹 LEFT CONTENT */}
              <div className="text-left">
                {/* BADGE */}
                <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                  {slide.badge}
                </span>

                <h1 className="text-2xl md:text-5xl font-extrabold leading-snug">
                  {slide.title} <br />
                  <span className="text-yellow-500">{slide.highlight}</span>
                </h1>

                <p className="text-gray-600 mt-3 text-sm md:text-base max-w-lg mx-auto md:mx-0">
                  {slide.desc}
                </p>

                {/* POINTS */}
                <ul className="mt-4 space-y-1 text-sm text-gray-700">
                  {slide.points.map((p, idx) => (
                    <li key={idx}>✅ {p.replace("✔ ", "")}</li>
                  ))}
                </ul>

                {/* CTA */}
                <div
                  className="
        mt-6
        flex flex-col sm:flex-row
        gap-3
        justify-center md:justify-start
      "
                >
                  <button
                    className="
          w-full sm:w-auto
          bg-yellow-400 hover:bg-yellow-500 transition
          text-black font-semibold
          px-7 py-3
          rounded-full shadow-md
        "
                  >
                    {slide.cta1}
                  </button>

                  <button
                    className="
          w-full sm:w-auto
          border border-gray-300
          px-7 py-3
          rounded-full
          hover:bg-gray-100 transition
        "
                  >
                    {slide.cta2}
                  </button>
                </div>
              </div>

              {/* 🔹 IMAGE (SHOW ON MOBILE TOO) */}
              <div className="w-full">
                <img
                  src={slide.image}
                  alt="banner"
                  className="
          w-full
          h-55 sm:h-75 md:h-105
          object-cover
          rounded-2xl
          shadow-lg
        "
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
