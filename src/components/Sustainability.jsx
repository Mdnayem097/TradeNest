"use client";

import {
  FiTrash2,
  FiRefreshCw,
  FiGlobe,
  FiWind,
  FiArrowUpRight,
} from "react-icons/fi";

const SustainabilityImpact = () => {
  const data = [
    {
      title: "Less Waste",
      desc: "Every reused product helps reduce unnecessary landfill waste.",
      icon: FiTrash2,
      color: "text-rose-600 bg-rose-50",
      accent: "from-rose-400 to-pink-400",
    },
    {
      title: "Circular Economy",
      desc: "Products get a second life instead of being discarded.",
      icon: FiRefreshCw,
      color: "text-blue-600 bg-blue-50",
      accent: "from-blue-400 to-indigo-400",
    },
    {
      title: "Eco Friendly",
      desc: "Second-hand shopping encourages smarter resource use.",
      icon: FiWind,
      color: "text-emerald-600 bg-emerald-50",
      accent: "from-emerald-400 to-teal-400",
    },
    {
      title: "Global Impact",
      desc: "Together we can create a more sustainable future.",
      icon: FiGlobe,
      color: "text-purple-600 bg-purple-50",
      accent: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-white blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FiWind size={15} />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
              Sustainable Marketplace
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
            Sustainability
            <span className="text-neutral-400"> Impact</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Buying and selling second-hand products helps extend
            product lifecycles, reduce waste, and encourage more
            conscious consumption.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {/* LEFT */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                >
                  {/* Number */}
                  <span className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-neutral-300">
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <h3 className="text-base font-bold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-neutral-500">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                    <FiArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 overflow-hidden transition-all duration-500 group-hover:w-full">
                    <div
                      className={`h-full w-full bg-gradient-to-r ${item.accent}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden rounded-[30px] border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-7 shadow-[0_15px_50px_rgba(16,185,129,0.08)] sm:p-9">
            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-300/30 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-teal-200/20 blur-[80px]" />

            {/* Top */}
            <div className="relative flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-emerald-600 shadow-sm backdrop-blur-md">
                <FiGlobe size={28} strokeWidth={1.3} />
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                  Positive Impact
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600">
                Our mission
              </p>

              <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-neutral-950 sm:text-4xl">
                Save the
                <span className="block text-neutral-400">
                  Planet.
                </span>
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-600">
                Every reused product can stay useful for longer.
                By making second-hand buying and selling easier,
                TradeNest encourages a more circular marketplace.
              </p>
            </div>

            {/* Bottom cards */}
            <div className="relative mt-8 grid grid-cols-2 gap-3">
              {/* Reuse */}
              <div className="group rounded-2xl border border-white/90 bg-white/75 p-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <FiRefreshCw size={16} />
                </div>

                <p className="mt-3 text-sm font-bold text-neutral-900">
                  Reuse
                </p>

                <p className="mt-1 text-[10px] text-neutral-500">
                  Extend product life
                </p>
              </div>

              {/* Conscious */}
              <div className="group rounded-2xl border border-white/90 bg-white/75 p-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <FiWind size={16} />
                </div>

                <p className="mt-3 text-sm font-bold text-neutral-900">
                  Conscious
                </p>

                <p className="mt-1 text-[10px] text-neutral-500">
                  Shop more responsibly
                </p>
              </div>
            </div>

            {/* Bottom message */}
            <div className="relative mt-6 flex items-center gap-3 border-t border-emerald-900/10 pt-5">
              <FiWind
                size={16}
                className="shrink-0 text-emerald-600"
              />

              <p className="text-xs leading-5 text-neutral-500">
                Small choices can create meaningful change.
              </p>

              <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                <FiArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityImpact;