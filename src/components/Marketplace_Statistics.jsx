"use client";

import {
  FiPackage,
  FiUsers,
  FiUserCheck,
  FiShoppingBag,
  FiArrowUpRight,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Products",
    value: "25K+",
    number: "01",
    Icon: FiPackage,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
    glow: "bg-blue-500",
  },
  {
    title: "Total Sellers",
    value: "1.2K+",
    number: "02",
    Icon: FiUserCheck,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    glow: "bg-emerald-500",
  },
  {
    title: "Total Buyers",
    value: "10K+",
    number: "03",
    Icon: FiUsers,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
    glow: "bg-purple-500",
  },
  {
    title: "Completed Orders",
    value: "50K+",
    number: "04",
    Icon: FiShoppingBag,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
    glow: "bg-orange-500",
  },
];

export default function MarketplaceStats() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-white blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
              TradeNest at a glance
            </p>

            <h2 className="text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Marketplace
              <span className="block text-neutral-400">
                in numbers.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              A growing community of buyers, sellers, products,
              and successful transactions.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-semibold text-neutral-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            Platform activity
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.Icon;

            return (
              <div
                key={item.title}
                className="group relative min-h-[255px] overflow-hidden rounded-[30px] border border-neutral-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-2 hover:border-neutral-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)] sm:p-8"
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${item.glow} opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-10`}
                />

                {/* Large background number */}
                <span className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[145px] font-black leading-none tracking-[-0.08em] text-neutral-50 transition-all duration-700 group-hover:translate-x-2 group-hover:text-neutral-100">
                  {item.number}
                </span>

                {/* Top row */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.text} shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 transition-all duration-500 group-hover:border-neutral-900 group-hover:bg-neutral-950 group-hover:text-white">
                    <FiArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-[42px]">
                    {item.value}
                  </h3>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 overflow-hidden transition-all duration-500 group-hover:w-full">
                  <div
                    className={`h-full w-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}