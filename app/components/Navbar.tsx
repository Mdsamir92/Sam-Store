"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  FiHeart,
  FiHome,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiPackage,
} from "react-icons/fi";
import useCartStore from "@/app/store/cartStore";
import { useSearchStore } from "@/app/store/searchStore";

import { useRouter } from "next/navigation";
import useWishlistStore from "@/app/store/wishlistStore";
import NotificationBell from "@/app/components/Notifications";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const cart = useCartStore((state) => state.cart);

  const wishlist = useWishlistStore((state) => state.wishlist);

  const wishlistCount = wishlist.length;

  const { query, setQuery, results, setResults, clear } = useSearchStore();

  const { clearCart } = useCartStore();

  const router = useRouter();

  const totalItems = cart.length;

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      clear();
      return;
    }

    const res = await fetch(`/api/products`);
    const data = await res.json();

    const filtered = data.filter(
      (p: any) =>
        p.title.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // 👈 limit suggestions
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-white shadow-xl fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center">
                🛍️
              </div>
              <Link href={"/"}>
                <span className="font-bold md:text-lg text-sm">
                  Sam<span className="text-yellow-400">Store</span>
                </span>
              </Link>
            </div>

            {/* SEARCH BAR */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products..."
                className="md:w-90 w-40 md:px-4 px-2 py-2 rounded-full bg-gray-100
               focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              {/* CLEAR BUTTON */}
              {query && (
                <button
                  onClick={clear}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                 text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              )}

              {/* SEARCH DROPDOWN */}
              {query && results.length > 0 && (
                <div
                  className="absolute left-0 mt-2 w-full bg-white
                 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {results.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        router.push(`/product/${p._id}`);
                        clear();
                      }}
                      className="flex items-center gap-3 px-4 py-3
                     hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={p.image}
                        className="w-14 h-14 rounded object-contain"
                        alt={p.title}
                      />
                      <div>
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-gray-500">₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* DESKTOP ICONS */}
              <div className="hidden md:flex items-center gap-5 text-gray-700">
                <Link href={"/"}>
                  <FiHome className="text-xl cursor-pointer hover:text-yellow-500" />
                </Link>
                <Link href="/wishlist" className="relative">
                  <FiHeart className="text-xl hover:text-yellow-500" />
                  {wishlistCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-xs bg-red-500 text-white
                 rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <NotificationBell />

                <div className="relative cursor-pointer">
                  <Link href={"/checkout"}>
                    <FiShoppingCart className="text-xl hover:text-yellow-500" />
                    {/* totalItems */}
                    {totalItems > 0 && (
                      <span
                        className="absolute -top-2 -right-2 text-xs bg-yellow-400
                     text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>

                {!session ? (
                  <Link href="/login">
                    <button className="flex items-center gap-2 text-lg cursor-pointer font-medium">
                      <FiUser />
                      Sign in
                    </button>
                  </Link>
                ) : (
                  <div className="relative ">
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="rounded-full cursor-pointer"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <FiUser />
                        </div>
                      )}
                      <span>{session.user?.name}</span>
                    </button>

                    {open && (
                      <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border">
                        <Link
                          href="/profile/edit"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href={"/orders"}
                          className="w-full text-left px-4 py-2 text-green-400
                                     hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => setOpen(false)}
                        >
                          My Order
                        </Link>

                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/login" });
                            clearCart();
                          }}
                          className="w-full text-left px-4 py-2 text-red-500
                                     hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE HAMBURGER (RIGHT SIDE) */}
              <div className="md:hidden flex items-center gap-4">
                {/* CART */}
                <Link href="/checkout" className="relative">
                  <FiShoppingCart className="text-2xl" />
                  {totalItems > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-white
        rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* MENU */}
                <button onClick={() => setDrawer(true)} className="text-2xl">
                  <FiMenu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <>
        {/* OVERLAY */}
        <div
          onClick={() => setDrawer(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300
      ${drawer ? "opacity-100 visible" : "opacity-0 invisible"}`}
        />

        {/* DRAWER */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white z-50
    shadow-2xl flex flex-col transform transition-transform duration-300
    ${drawer ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Menu</span>
            </div>
            <FiX
              className="text-xl cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setDrawer(false)}
            />
          </div>

          {/* USER CARD */}
          {session ? (
            <div className="mx-4 mt-5 p-4  bg-gray-50 flex items-center gap-3">
              {session.user?.image ? (
                <div className="w-14 h-14 rounded-full overflow-hidden border ">
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center">
                  <FiUser />
                </div>
              )}

              <div className="leading-tight">
                <p className="font-semibold text-sm">{session.user?.name}</p>
                <p className="text-xs text-gray-500 truncate w-40">
                  {session.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setDrawer(false)}
              className="mx-4 mt-5 px-4 py-3 rounded-xl bg-yellow-400 text-center font-semibold"
            >
              Sign in
            </Link>
          )}

          {/* NAV LINKS */}
          <div className="mt-6 flex flex-col px-3 gap-1">
            <Link
              href="/"
              className="drawer-item"
              onClick={() => setDrawer(false)}
            >
              <FiHome /> Home
            </Link>
            <Link
              href="/wishlist"
              className="drawer-item"
              onClick={() => setDrawer(false)}
            >
              <FiHeart /> Wishlist
            </Link>
        

            <Link
              href="/profile/edit"
              className="drawer-item "
              onClick={() => setDrawer(false)}
            >
              <FiUser />
              My Profile
            </Link>

            <Link
              href="/orders"
              className="drawer-item"
              onClick={() => setDrawer(false)}
            >
              <FiPackage />
              My Order
            </Link>
          </div>

          {/* LOGOUT */}
          {session && (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/login" });
                clearCart();
              }}
              className="mt-auto mx-4 mb-5 flex items-center justify-center gap-2
        border border-red-200 text-red-600 rounded-xl py-3 font-medium
        hover:bg-red-50 transition"
            >
              <FiLogOut /> Logout
            </button>
          )}
        </div>
      </>
    </>
  );
}
