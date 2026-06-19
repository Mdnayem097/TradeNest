"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // একটিভ রুট ট্র্যাক করার জন্য ইমপোর্ট করা হয়েছে
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiHeart, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname(); // বর্তমান পেজের পাথ/ইউআরএল নেওয়ার জন্য
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // একটিভ লিংকের স্টাইল ডাইনামিক করার জন্য একটি হেল্পার ফাংশন
  const linkStyle = (path) => {
    const isActive = pathname === path;
    return `font-medium transition-colors ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-slate-700 hover:text-blue-600"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="relative block h-10 w-36 md:w-40">
            <Image
              src="/TradeNest-Logo.png"
              alt="TradeNest Logo"
              fill
              priority
              sizes="(max-width: 768px) 144px, 160px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={linkStyle("/")}>
              Home
            </Link>
            <Link href="/products" className={linkStyle("/products")}>
              Products
            </Link>
            <Link href="/categories" className={linkStyle("/categories")}>
              Categories
            </Link>
            <Link href="/about" className={linkStyle("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkStyle("/contact")}>
              Contact
            </Link>
          </div>

          {/* Right Side (Actions) */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle (সব ডিভাইসের জন্য মেইন ন্যাভবারে রাখা হয়েছে) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Desktop-only Auth/Profile Section */}
            <div className="hidden lg:flex items-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  {/* Wishlist */}
                  <Link
                    href="/wishlist"
                    className="relative rounded-xl border border-slate-200 p-2 hover:bg-slate-100"
                  >
                    <FiHeart size={20} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      3
                    </span>
                  </Link>

                  {/* Profile */}
                  <div ref={dropdownRef} className="relative">
                    <button onClick={() => setProfileOpen(!profileOpen)}>
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt="profile"
                          className="h-10 w-10 rounded-full border object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                          <FiUser />
                        </div>
                      )}
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-2 shadow-xl">
                        <div className="border-b p-3">
                          <h3 className="font-semibold">{user.name}</h3>
                        </div>

                        <Link
                          href="/dashboard"
                          className="block rounded-lg p-3 hover:bg-slate-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block rounded-lg p-3 hover:bg-slate-100"
                        >
                          Wishlist
                        </Link>
                        <Link
                          href="/profile"
                          className="block rounded-lg p-3 hover:bg-slate-100"
                        >
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full rounded-lg p-3 text-left text-red-500 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button (মেনু বাটনের আগেই থিম টগল থাকবে) */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-slate-700 p-1"
            >
              {mobileMenu ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t bg-white lg:hidden">
          <div className="space-y-4 p-4">
            {/* মোবাইল মেনুর লিংকেও একটিভ ক্লাস যুক্ত করা হয়েছে */}
            <Link
              href="/"
              className={`block ${pathname === "/" ? "text-blue-600 font-semibold" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block ${pathname === "/products" ? "text-blue-600 font-semibold" : ""}`}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={`block ${pathname === "/categories" ? "text-blue-600 font-semibold" : ""}`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`block ${pathname === "/about" ? "text-blue-600 font-semibold" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block ${pathname === "/contact" ? "text-blue-600 font-semibold" : ""}`}
            >
              Contact
            </Link>

            {!user ? (
              <div className="flex gap-3 pt-2">
                <Link href="/login" className="rounded-xl border px-4 py-2">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="space-y-3 border-t pt-3">
                <div className="font-semibold">{user.displayName}</div>
                <Link href="/dashboard" className="block">
                  Dashboard
                </Link>
                <Link href="/wishlist" className="block">
                  Wishlist
                </Link>
                <Link href="/profile" className="block">
                  Profile Settings
                </Link>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
