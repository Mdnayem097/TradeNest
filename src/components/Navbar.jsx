"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiShoppingCart,
  FiLogOut,
  FiLayout,
  FiSettings,
  FiTrash2,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("user", user);
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalPrice } =
    useCart();

  const isDashboard = pathname?.startsWith("/dashboard");

  const handleCartClick = () => {
    if (window.innerWidth >= 1024) {
      setCartOpen((prev) => !prev);
    } else {
      router.push("/cart");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setProfileOpen(false);
          setMobileMenu(false);
          router.push("/");
        },
      },
    });
  };

  if (isDashboard) return null;

  const getLinkStyle = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? "text-blue-600"
        : "text-slate-600 hover:text-slate-900"
    }`;

  const getMobileLinkStyle = (path) =>
    `block px-4 py-3 rounded-lg font-medium text-base transition-colors ${
      pathname === path
        ? "bg-blue-50 text-blue-600"
        : "text-slate-700 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* BRAND LOGO */}
          <Link href="/" className="flex flex-shrink-0 items-center">
            <Image
              src="/TradeNest-Logo.png"
              alt="TradeNest"
              width={140}
              height={38}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={getLinkStyle("/")}>
              Home
            </Link>
            <Link href="/products" className={getLinkStyle("/products")}>
              Products
            </Link>
            <Link href="/categories" className={getLinkStyle("/categories")}>
              Categories
            </Link>
            <Link href="/about" className={getLinkStyle("/about")}>
              About
            </Link>
            <Link href="/contact" className={getLinkStyle("/contact")}>
              Contact
            </Link>
          </div>

          {/* RIGHT SIDE UTILITIES */}
          <div className="flex items-center gap-3">
            {/* CART (Responsive Behavior) */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={handleCartClick}
                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition focus:outline-none"
              >
                <FiShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* DESKTOP CART MODAL WITH PRODUCT IMAGES */}
              {cartOpen && (
                <div className="hidden lg:block absolute right-0 mt-2 w-96 rounded-xl border border-slate-100 bg-white shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <p className="font-semibold text-slate-800 text-sm">
                      Shopping Cart ({cartItems.length})
                    </p>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-3 space-y-3">
                    {cartItems.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-8">
                        Your cart is empty
                      </p>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 p-2 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition"
                        >
                          {/* 1. PRODUCT IMAGE */}
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                            <Image
                              src={item.imageUrl}
                              fill
                              sizes="48px"
                              priority
                              className="object-cover"
                              alt={item.title}
                            />
                          </div>

                          {/* 2. TITLE & PRICE */}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-800 truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-blue-600 font-bold mt-0.5">
                              ৳{item.price}
                            </p>
                          </div>

                          {/* 3. QUANTITY CONTROLS */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="flex items-center border border-slate-200 bg-white rounded-md overflow-hidden">
                              <button
                                onClick={() => decreaseQty(item._id)}
                                className="px-1.5 py-0.5 bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold text-slate-800 min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQty(item._id)}
                                className="px-1.5 py-0.5 bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
                              >
                                +
                              </button>
                            </div>

                            {/* REMOVE BUTTON */}
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-slate-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-md transition"
                              aria-label="Remove item"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2.5 px-1">
                        <span>Total:</span>
                        <span className="text-blue-600 text-sm">
                          ৳{totalPrice}
                        </span>
                      </div>
                        <Link
                          href="/checkout"
                          onClick={() => setCartOpen(false)}
                          className="block text-center w-full bg-blue-600 text-white text-xs py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
                        >
                          Checkout Now
                        </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* USER PROFILE */}
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition focus:outline-none"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      width={32}
                      height={32}
                      className="rounded-full border border-slate-200 object-cover"
                      priority
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-100 bg-white shadow-lg py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-50">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/${user.role}`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <FiLayout size={16} className="text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <FiSettings size={16} className="text-slate-400" />
                      Settings
                    </Link>
                    <div className="border-t border-slate-50 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition focus:outline-none"
            >
              {mobileMenu ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-inner">
          <Link
            href="/"
            onClick={() => setMobileMenu(false)}
            className={getMobileLinkStyle("/")}
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenu(false)}
            className={getMobileLinkStyle("/products")}
          >
            Products
          </Link>
          <Link
            href="/categories"
            onClick={() => setMobileMenu(false)}
            className={getMobileLinkStyle("/categories")}
          >
            Categories
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenu(false)}
            className={getMobileLinkStyle("/about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenu(false)}
            className={getMobileLinkStyle("/contact")}
          >
            Contact
          </Link>

          {!user && (
            <div className="pt-4 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className="block text-center py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenu(false)}
                className="block text-center py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
