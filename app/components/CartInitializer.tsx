// 'use client'

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import useCartStore from "@/app/store/cartStore";

// export default function CartInitializer() {
//   const { data: session } = useSession();
//   const setUserCart = useCartStore((s) => s.setUserCart);

//   useEffect(() => {
//     if (session?.user?.id) {
//       setUserCart(session.user.id); // 🔥 magic line
//     }
//   }, [session?.user?.id]);

//   return null;
// }
