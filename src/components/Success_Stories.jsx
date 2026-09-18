"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiUsers,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";

export default function SuccessStories() {
  const stats = [
    {
      value: "12K+",
      label: "Happy Buyers",
      icon: <FiUsers />,
    },
    {
      value: "25M+",
      label: "Successful Deals",
      icon: <FiShoppingBag />,
    },
    {
      value: "5K+",
      label: "Verified Sellers",
      icon: <FiShield />,
    },
  ];

  return (
    <section className="w-full px-4 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[28px] bg-[#071b21] text-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] sm:rounded-[34px]">

        {/* Background image */}
        <div
          className="absolute inset-y-0 right-0 w-[58%] sm:w-[55%]"
          style={{
            backgroundImage:
              "url('/TradeNest-Optinoal-Image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 48%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 48%, black 100%)",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071b21] via-[#071b21]/95 to-[#071b21]/15" />

        {/* Soft glow */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="relative z-10 px-6 py-8 sm:px-9 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-14">

          {/* Top label */}
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/45">
              TradeNest Community
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.035em] sm:text-4xl md:text-[44px]">
              Real people.
              <span className="block text-white/45">
                Real connections.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-xs leading-6 text-white/50 sm:text-sm">
              A marketplace built for people to discover,
              trade, and connect with confidence.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-7 grid max-w-[680px] grid-cols-3 border-y border-white/10">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative px-3 py-4 sm:px-5 sm:py-5 ${
                  index !== stats.length - 1
                    ? "border-r border-white/10"
                    : ""
                }`}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-cyan-200 transition-all duration-300 group-hover:bg-cyan-300/10">
                  {stat.icon}
                </div>

                <div className="text-xl font-black tracking-tight sm:text-2xl">
                  {stat.value}
                </div>

                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[10px] leading-5 text-white/30 sm:text-xs">
              Buy, sell, discover and connect — all in one
              growing marketplace.
            </p>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold text-[#071b21] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-lg"
            >
              Explore Marketplace

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#071b21] text-white transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowUpRight size={12} />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
      </div>
    </section>
  );
}