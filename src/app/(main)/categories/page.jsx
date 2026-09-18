"use client";

import Link from "next/link";
import {
  FiMonitor,
  FiShoppingBag,
  FiHome,
  FiTruck,
  FiActivity,
  FiBookOpen,
  FiArrowUpRight,
} from "react-icons/fi";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Vehicles",
  "Sports",
  "Books",
];

const categoryData = {
  Electronics: {
    icon: <FiMonitor size={30} strokeWidth={1.7} />,
    color: "from-blue-500 to-cyan-400",
    products: 120,
    description: "Tech, gadgets & everyday electronics",
  },
  Fashion: {
    icon: <FiShoppingBag size={30} strokeWidth={1.7} />,
    color: "from-pink-500 to-rose-400",
    products: 85,
    description: "Style, clothing & fashion essentials",
  },
  "Home & Living": {
    icon: <FiHome size={30} strokeWidth={1.7} />,
    color: "from-emerald-500 to-green-400",
    products: 64,
    description: "Furniture, decor & home essentials",
  },
  Vehicles: {
    icon: <FiTruck size={30} strokeWidth={1.7} />,
    color: "from-orange-500 to-amber-400",
    products: 42,
    description: "Cars, bikes & vehicle essentials",
  },
  Sports: {
    icon: <FiActivity size={30} strokeWidth={1.7} />,
    color: "from-purple-500 to-indigo-400",
    products: 57,
    description: "Sports gear & active lifestyle",
  },
  Books: {
    icon: <FiBookOpen size={30} strokeWidth={1.7} />,
    color: "from-yellow-500 to-orange-400",
    products: 94,
    description: "Books, learning & reading",
  },
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5]">
      {/* =========================================
          HERO
      ========================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-100/60 blur-[110px]" />

        <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-100/50 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 shadow-sm sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                TradeNest Marketplace
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-[-0.05em] text-neutral-950 sm:text-5xl lg:text-7xl">
              Shop by
              <span className="text-neutral-400"> Category.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
              Explore carefully organized categories and discover
              products from sellers across the TradeNest marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CATEGORY SECTION
      ========================================== */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
                Explore Collection
              </p>

              <h2 className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                Find what you need
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-neutral-500 sm:text-right">
              Choose a category to explore products that match
              your needs.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const item = categoryData[category];

              return (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative min-h-[330px] overflow-hidden rounded-[30px] border border-neutral-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-neutral-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.10)] sm:p-8"
                >
                  {/* Large Background Glow */}
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${item.color} opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-20`}
                  />

                  {/* Number */}
                  <span className="absolute right-7 top-6 text-[11px] font-bold tracking-[0.25em] text-neutral-200 transition-colors duration-300 group-hover:text-neutral-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Giant Number */}
                  <span className="pointer-events-none absolute -bottom-10 -right-3 select-none text-[150px] font-black leading-none text-neutral-50 transition-all duration-700 group-hover:translate-x-2 group-hover:text-neutral-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-[20px] bg-gradient-to-br ${item.color} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-xl`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="relative mt-14">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                      Category
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-tight text-neutral-950 transition-transform duration-300 group-hover:translate-x-1">
                      {category}
                    </h3>

                    <p className="mt-2 max-w-[240px] text-sm leading-6 text-neutral-500">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between sm:left-8 sm:right-8">
                    <div>
                      <span className="text-sm font-bold text-neutral-950">
                        {item.products}+
                      </span>

                      <span className="ml-1 text-xs text-neutral-400">
                        Products
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-all duration-500 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white group-hover:shadow-lg">
                      <FiArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 overflow-hidden transition-all duration-500 group-hover:w-full">
                    <div
                      className={`h-full w-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================== */}
      <section className="relative px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-neutral-950 px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
          {/* Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
              Everything in one place
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to explore TradeNest?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
              Browse the complete marketplace and discover
              products from different categories.
            </p>

            <Link
              href="/products"
              className="group mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-100 hover:shadow-2xl"
            >
              View All Products

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowUpRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}