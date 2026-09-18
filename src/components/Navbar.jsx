"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiLogOut,
  FiLayout,
  FiSettings,
  FiTrash2,
  FiArrowUpRight,
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

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const isDashboard = pathname?.startsWith("/dashboard");

  const handleCartClick = () => {
    if (window.innerWidth >= 1024) {
      setCartOpen((prev) => !prev);
      setProfileOpen(false);
    } else {
      router.push("/cart");
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-[72px] items-center justify-between">
          {/* ================= BRAND ================= */}
          <Link
            href="/"
            className="group relative flex shrink-0 items-center"
          >
            <Image
              src="/TradeNest-Logo.png"
              alt="TradeNest"
              width={150}
              height={42}
              priority
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-3.5 py-2 text-[13px] font-semibold"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      active
                        ? "text-neutral-950"
                        : "text-neutral-500 group-hover:text-neutral-950"
                    }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-neutral-950 transition-all duration-300 ${
                      active
                        ? "w-5"
                        : "w-0 group-hover:w-5"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-2">
            {/* ================= CART ================= */}
            <div
              className="relative"
              ref={cartRef}
            >
              <button
                onClick={handleCartClick}
                aria-label="Shopping cart"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 hover:shadow-sm"
              >
                <FiShoppingCart
                  size={18}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-105"
                />

                {cartItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-neutral-950 px-1 text-[9px] font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* ================= CART DROPDOWN ================= */}
              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[52px] hidden w-[390px] overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] lg:block"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                          Your Cart
                        </p>

                        <h3 className="mt-1 text-sm font-bold text-neutral-950">
                          Shopping Cart
                          <span className="ml-1 text-neutral-400">
                            ({cartItems.length})
                          </span>
                        </h3>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-50 text-neutral-500">
                        <FiShoppingCart size={16} />
                      </div>
                    </div>

                    {/* Products */}
                    <div className="max-h-[300px] overflow-y-auto p-3">
                      {cartItems.length === 0 ? (
                        <div className="px-5 py-12 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50 text-neutral-400">
                            <FiShoppingCart size={21} />
                          </div>

                          <p className="mt-4 text-sm font-semibold text-neutral-800">
                            Your cart is empty
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            Add something you love.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {cartItems.map((item) => (
                            <div
                              key={item._id}
                              className="group flex gap-3 rounded-2xl border border-transparent p-2.5 transition-all duration-300 hover:border-neutral-100 hover:bg-neutral-50"
                            >
                              {/* Image */}
                              <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                <Image
                                  src={
                                    item.imageUrl ||
                                    "/placeholder.png"
                                  }
                                  fill
                                  sizes="58px"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  alt={item.title}
                                />
                              </div>

                              {/* Info */}
                              <div className="min-w-0 flex-1 py-0.5">
                                <p className="truncate text-xs font-bold text-neutral-900">
                                  {item.title}
                                </p>

                                <p className="mt-1 text-xs font-bold text-neutral-950">
                                  ৳{item.price}
                                </p>

                                {/* Quantity */}
                                <div className="mt-2 flex items-center">
                                  <div className="flex h-7 items-center overflow-hidden rounded-lg border border-neutral-200 bg-white">
                                    <button
                                      onClick={() =>
                                        decreaseQty(item._id)
                                      }
                                      className="flex h-full w-7 items-center justify-center text-xs font-bold text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                                    >
                                      −
                                    </button>

                                    <span className="flex h-full min-w-[28px] items-center justify-center border-x border-neutral-100 text-[10px] font-bold text-neutral-900">
                                      {item.quantity}
                                    </span>

                                    <button
                                      onClick={() =>
                                        increaseQty(item._id)
                                      }
                                      className="flex h-full w-7 items-center justify-center text-xs font-bold text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() =>
                                  removeFromCart(item._id)
                                }
                                aria-label="Remove item"
                                className="flex h-7 w-7 shrink-0 items-center justify-center self-start rounded-lg text-neutral-300 transition-all duration-300 hover:bg-red-50 hover:text-red-500"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-neutral-100 bg-neutral-50/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-medium text-neutral-500">
                            Total
                          </span>

                          <span className="text-base font-black text-neutral-950">
                            ৳{totalPrice}
                          </span>
                        </div>

                        <Link
                          href="/checkout"
                          onClick={() => setCartOpen(false)}
                          className="group flex h-11 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
                        >
                          Checkout Now

                          <FiArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= USER ================= */}
            {!user ? (
              <div className="hidden items-center gap-1.5 sm:flex">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-[13px] font-semibold text-neutral-600 transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-950"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="group flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
                >
                  Get Started

                  <FiArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            ) : (
              <div
                className="relative"
                ref={profileRef}
              >
                <button
                  onClick={() => {
                    setProfileOpen((prev) => !prev);
                    setCartOpen(false);
                  }}
                  aria-label="Open profile menu"
                  className="group flex items-center gap-2 rounded-full border border-transparent p-1 transition-all duration-300 hover:border-neutral-200 hover:bg-neutral-50"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      width={34}
                      height={34}
                      priority
                      className="h-[34px] w-[34px] rounded-full border border-neutral-200 object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <span className="hidden max-w-[90px] truncate pr-1 text-xs font-bold text-neutral-800 lg:block">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-[52px] w-64 overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)]"
                    >
                      {/* User Info */}
                      <div className="border-b border-neutral-100 px-4 py-4">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <Image
                              src={user.image}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full border border-neutral-200 object-cover"
                              alt="Profile"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white">
                              {user.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-neutral-950">
                              {user.name}
                            </p>

                            <p className="truncate text-[11px] text-neutral-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="p-2">
                        <Link
                          href={`/dashboard/${user.role}`}
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-950"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500 transition-colors group-hover:bg-white group-hover:text-neutral-950">
                              <FiLayout size={15} />
                            </span>

                            Dashboard
                          </span>

                          <FiArrowUpRight
                            size={14}
                            className="text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950"
                          />
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-950"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500 transition-colors group-hover:bg-white group-hover:text-neutral-950">
                              <FiSettings size={15} />
                            </span>

                            Settings
                          </span>

                          <FiArrowUpRight
                            size={14}
                            className="text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950"
                          />
                        </Link>

                        <div className="my-1.5 border-t border-neutral-100" />

                        <button
                          onClick={handleLogout}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-50"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 transition-colors group-hover:bg-red-100">
                            <FiLogOut size={15} />
                          </span>

                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              onClick={() => {
                setMobileMenu((prev) => !prev);
                setProfileOpen(false);
                setCartOpen(false);
              }}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 md:hidden"
            >
              {mobileMenu ? (
                <FiX size={20} />
              ) : (
                <FiMenu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-neutral-100 bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenu(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                        active
                          ? "bg-neutral-950 text-white"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
                      }`}
                    >
                      {link.label}

                      <FiArrowUpRight
                        size={15}
                        className={
                          active
                            ? "text-white/70"
                            : "text-neutral-300"
                        }
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Cart */}
              <button
                onClick={() => {
                  router.push("/cart");
                  setMobileMenu(false);
                }}
                className="mt-3 flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-100"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                    <FiShoppingCart size={16} />
                  </span>

                  Shopping Cart
                </span>

                {cartItems.length > 0 && (
                  <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-[10px] font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Mobile Auth */}
              {!user && (
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-100 pt-4">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenu(false)}
                    className="flex h-11 items-center justify-center rounded-full border border-neutral-200 text-sm font-bold text-neutral-700 transition-all hover:bg-neutral-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileMenu(false)}
                    className="flex h-11 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white transition-all hover:bg-neutral-800"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}