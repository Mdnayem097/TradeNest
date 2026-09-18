"use client";

import {
  FiMonitor,
  FiHome,
  FiTruck,
  FiSmartphone,
  FiArrowUpRight,
} from "react-icons/fi";
import Link from "next/link";

const PopularCategories = () => {
  const categories = [
    {
      name: "Electronics",
      icon: <FiMonitor size={27} strokeWidth={1.8} />,
      number: "01",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      accent: "bg-blue-600",
      glow: "bg-blue-400",
    },
    {
      name: "Furniture",
      icon: <FiHome size={27} strokeWidth={1.8} />,
      number: "02",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      accent: "bg-emerald-600",
      glow: "bg-emerald-400",
    },
    {
      name: "Vehicles",
      icon: <FiTruck size={27} strokeWidth={1.8} />,
      number: "03",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      accent: "bg-orange-600",
      glow: "bg-orange-400",
    },
    {
      name: "Mobile Phones",
      icon: <FiSmartphone size={27} strokeWidth={1.8} />,
      number: "04",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      accent: "bg-purple-600",
      glow: "bg-purple-400",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-white blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-white blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ================= HEADER ================= */}
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              Explore TradeNest
            </p>

            <h2 className="text-4xl font-black tracking-[-0.03em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Shop by Category
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Find what you are looking for faster by exploring our
              most popular categories.
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex w-fit items-center gap-3 text-sm font-bold text-neutral-950"
          >
            <span className="border-b border-neutral-950 pb-1">
              View all categories
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-sm text-white transition-all duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="group relative min-h-[300px] overflow-hidden rounded-[30px] border border-neutral-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-neutral-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)] sm:p-8"
            >
              {/* Soft colored glow */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${category.glow} opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20`}
              />

              {/* Top number */}
              <span className="absolute right-6 top-6 text-[11px] font-bold tracking-[0.2em] text-neutral-300 transition-colors duration-300 group-hover:text-neutral-400">
                {category.number}
              </span>

              {/* Large background number */}
              <span className="pointer-events-none absolute -bottom-8 -right-3 select-none text-[145px] font-black leading-none text-neutral-50 transition-all duration-700 group-hover:translate-x-2 group-hover:text-neutral-100">
                {category.number}
              </span>

              {/* Icon */}
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${category.iconBg} ${category.iconColor} shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}
              >
                {category.icon}
              </div>

              {/* Content */}
              <div className="relative mt-16">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                  Category
                </p>

                <h3 className="text-xl font-bold tracking-tight text-neutral-950 transition-transform duration-300 group-hover:translate-x-1">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Browse products
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all duration-500 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white group-hover:shadow-lg">
                <FiArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>

              {/* Premium accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 overflow-hidden transition-all duration-500 group-hover:w-full">
                <div
                  className={`h-full w-full ${category.accent}`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;