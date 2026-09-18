"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-[#071217] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20">

          {/* BRAND */}
          <div>
            {/* Logo */}
            <div className="h-11 w-44 sm:h-12 sm:w-48">
              <Link
                href="/"
                className="relative block h-full w-full"
              >
                <Image
                  src="/TradeNest-Logo.png"
                  alt="TradeNest Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 192px"
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Buy Smart. Sell Easy. Save More. TradeNest connects
              buyers and sellers through a trusted second-hand
              marketplace.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2.5">
              {[
                {
                  icon: <FiFacebook size={17} />,
                  label: "Facebook",
                },
                {
                  icon: <FiTwitter size={17} />,
                  label: "Twitter",
                },
                {
                  icon: <FiInstagram size={17} />,
                  label: "Instagram",
                },
                {
                  icon: <FiLinkedin size={17} />,
                  label: "LinkedIn",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-8">

            {/* Quick Links */}
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                Explore
              </p>

              <div className="space-y-3.5">
                <Link
                  href="/"
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Home
                  <FiArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>

                <Link
                  href="/products"
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Products
                  <FiArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>

                <Link
                  href="/categories"
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Categories
                  <FiArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>

                <Link
                  href="/about"
                  className="group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  About Us
                  <FiArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                Categories
              </p>

              <div className="space-y-3.5 text-sm">
                <Link
                  href="/products?category=Electronics"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  Electronics
                </Link>

                <Link
                  href="/products?category=Furniture"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  Furniture
                </Link>

                <Link
                  href="/products?category=Vehicles"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  Vehicles
                </Link>

                <Link
                  href="/products?category=Fashion"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  Fashion
                </Link>

                <Link
                  href="/products?category=Mobile%20Phones"
                  className="block text-white/60 transition-colors hover:text-white"
                >
                  Mobiles
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                Contact
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:mdnayemswe@gmail.com"
                  className="block break-all text-sm leading-6 text-white/60 transition-colors hover:text-white"
                >
                  mdnayemswe@gmail.com
                </a>

                <a
                  href="tel:+8801767148518"
                  className="block text-sm text-white/60 transition-colors hover:text-white"
                >
                  +880 1767148518
                </a>

                <p className="text-sm text-white/60">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 sm:mt-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-white/30 sm:text-sm">
              © 2026 TradeNest. All Rights Reserved.
            </p>

            <div className="flex items-center gap-5 text-xs sm:gap-7 sm:text-sm">
              <Link
                href="/privacy"
                className="text-white/35 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-white/35 transition-colors hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Tiny brand line */}
        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/5" />

          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/15">
            TradeNest Marketplace
          </span>

          <span className="h-px flex-1 bg-white/5" />
        </div>
      </div>
    </footer>
  );
}