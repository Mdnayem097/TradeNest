"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiUsers,
  FiShield,
  FiTruck,
  FiTarget,
  FiEye,
  FiArrowUpRight,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

export default function AboutPage() {
  const features = [
    {
      icon: <FiShield size={28} strokeWidth={1.7} />,
      title: "Trusted Marketplace",
      description:
        "Every seller is verified to create a safer and more reliable shopping experience for our customers.",
    },
    {
      icon: <FiTruck size={28} strokeWidth={1.7} />,
      title: "Fast Delivery",
      description:
        "Quick and secure delivery with order tracking designed to keep your shopping journey simple.",
    },
    {
      icon: <FiUsers size={28} strokeWidth={1.7} />,
      title: "Community Driven",
      description:
        "A marketplace built to connect buyers and sellers through meaningful and trusted transactions.",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Products",
    },
    {
      number: "2K+",
      label: "Sellers",
    },
    {
      number: "15K+",
      label: "Customers",
    },
    {
      number: "99%",
      label: "Satisfaction",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-hidden bg-[#f7f7f5]"
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-7 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500 shadow-sm sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                About TradeNest
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-7xl">
              Where people
              <br />
              <span className="text-neutral-400">buy, sell & connect.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
              TradeNest brings buyers and sellers together in one modern
              marketplace, making online shopping simpler, safer, and more
              accessible.
            </p>

            {/* Hero CTA */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-neutral-950 px-7 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-xl"
              >
                Explore Marketplace
                <FiArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/categories"
                className="inline-flex h-14 items-center justify-center rounded-full border border-neutral-200 bg-white px-7 text-sm font-bold text-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
            <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-950 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.12)] sm:rounded-[40px] sm:p-3">
              <div className="relative min-h-[260px] overflow-hidden rounded-[26px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black sm:min-h-[360px] sm:rounded-[32px]">
                {/* Decorative glows */}
                <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

                {/* Center content */}
                <div className="relative flex min-h-[260px] flex-col items-center justify-center px-6 text-center sm:min-h-[360px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-neutral-950 shadow-2xl sm:h-20 sm:w-20">
                    <FiShoppingBag
                      size={30}
                      strokeWidth={1.7}
                      className="sm:hidden"
                    />

                    <FiShoppingBag
                      size={36}
                      strokeWidth={1.7}
                      className="hidden sm:block"
                    />
                  </div>

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
                    The TradeNest Community
                  </p>

                  <h2 className="mt-3 max-w-xl text-2xl font-black tracking-tight text-white sm:text-4xl">
                    One marketplace.
                    <br />
                    Endless possibilities.
                  </h2>
                </div>

                {/* Floating cards */}
                <div className="absolute left-4 top-5 hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:block">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    Built for
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    Everyone
                  </p>
                </div>

                <div className="absolute bottom-5 right-4 hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:block">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    Marketplace
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    Made Simple
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ====================================================== */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            {/* Text */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
                Who We Are
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] text-neutral-950 sm:text-5xl">
                Building a better way to
                <span className="text-neutral-400"> shop online.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                TradeNest is a modern multi-vendor marketplace where buyers can
                discover quality products while sellers get the opportunity to
                grow their businesses.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                We believe online shopping should feel safe, transparent, and
                enjoyable. That's why we focus on creating a simple experience
                built around trust, accessibility, and great products.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Simple Shopping",
                  "Trusted Sellers",
                  "Modern Marketplace",
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 shadow-sm"
                  >
                    <FiCheck size={13} className="text-blue-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Mission / Vision */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-blue-100/60 to-purple-100/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-9">
                {/* Mission */}
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <FiTarget size={25} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
                      Our Mission
                    </p>

                    <h3 className="mt-2 text-xl font-black text-neutral-950">
                      Empower every transaction.
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      To empower businesses and give customers a seamless,
                      secure, and accessible shopping experience.
                    </p>
                  </div>
                </div>

                <div className="my-8 h-px bg-neutral-100" />

                {/* Vision */}
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <FiEye size={25} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
                      Our Vision
                    </p>

                    <h3 className="mt-2 text-xl font-black text-neutral-950">
                      Connect people everywhere.
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      To build a trusted digital marketplace that connects
                      buyers and sellers and makes commerce more accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
              Why TradeNest
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl">
              Designed around
              <span className="text-neutral-400"> trust.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Everything we build is focused on making marketplace interactions
              easier, safer, and more enjoyable.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-[30px] border border-neutral-200 bg-[#f7f7f5] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-neutral-300 hover:bg-white hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] sm:p-8"
              >
                {/* Number */}
                <span className="absolute right-7 top-6 text-[11px] font-bold tracking-[0.2em] text-neutral-200 transition-colors duration-300 group-hover:text-neutral-300">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-neutral-950 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-neutral-950 group-hover:text-white group-hover:shadow-lg">
                  {feature.icon}
                </div>

                <h3 className="mt-8 text-xl font-black tracking-tight text-neutral-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {feature.description}
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs font-bold text-neutral-400 transition-colors duration-300 group-hover:text-neutral-950">
                  <span>Learn more</span>
                  <FiArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-neutral-950 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[32px] bg-neutral-950 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            {/* Background glows */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-10 max-w-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                  TradeNest By The Numbers
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Growing together.
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-0">
                {stats.map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-2 sm:px-6 ${
                      index !== 0
                        ? "sm:border-l sm:border-white/10"
                        : ""
                    }`}
                  >
                    <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      {item.number}
                    </p>

                    <p className="mt-2 text-xs font-medium text-neutral-500 sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 px-6 py-16 text-center text-white sm:px-10 sm:py-20">
          {/* Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl">
              <FiShoppingBag size={29} strokeWidth={1.7} />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-100 sm:text-xs">
              Your next discovery awaits
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Ready to explore TradeNest?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Discover products, connect with sellers, and find something that
              fits your world.
            </p>

            <Link
              href="/products"
              className="group mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-50 hover:shadow-2xl"
            >
              Explore Products

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </motion.main>
  );
}