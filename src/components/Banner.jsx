"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    src: "/product-sneaker.jpg",
    alt: "Premium sneaker",
    className:
      "w-52 h-64 sm:w-60 sm:h-72 lg:w-72 lg:h-[22rem] left-[8%] top-[10%] rotate-[-6deg] z-30",
  },
  {
    src: "/product-phone.jpg",
    alt: "Modern smartphone",
    className:
      "w-32 h-44 sm:w-36 sm:h-52 lg:w-44 lg:h-60 right-[4%] top-[3%] rotate-[7deg] z-20",
  },
  {
    src: "/product-watch.jpg",
    alt: "Premium watch",
    className:
      "w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 right-[8%] bottom-[9%] rotate-[-8deg] z-30",
  },
  {
    src: "/product-bag.jpg",
    alt: "Fashion bag",
    className:
      "w-32 h-36 sm:w-36 sm:h-44 lg:w-44 lg:h-52 left-[0%] bottom-[2%] rotate-[6deg] z-20",
  },
];

const BannerPage = () => {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-[#f7f7f5]">
      {/* Subtle background details */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white blur-3xl" />

        <div className="absolute bottom-[-250px] left-[-150px] h-[450px] w-[450px] rounded-full bg-neutral-200/50 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-full w-px bg-black/[0.035]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-14 lg:py-16">
        {/* Small brand line */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-black" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-700">
              TradeNest
            </span>
          </div>

          <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-neutral-400 sm:block">
            Everything in one place
          </span>
        </div>

        {/* Hero */}
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* LEFT CONTENT */}
          <div className="relative z-40 max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
              Discover • Shop • Enjoy
            </p>

            <h1 className="text-[3.4rem] font-black leading-[0.88] tracking-[-0.055em] text-[#001E59] sm:text-6xl md:text-7xl lg:text-[6.2rem]">
              Find what
              <br />
              <span className="text-[#147DFF]">fits you.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg">
              Discover products from different sellers, explore new styles, and
              find something made for you.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#001E59] px-8 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#147DFF]"
              >
                Shop Now
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/categories"
                className="inline-flex h-14 w-full items-center justify-center rounded-full border border-neutral-300 bg-[#ffffff] px-8 text-sm font-bold text-[#001E59] backdrop-blur-sm transition-all duration-300 hover:border-neutral-950 hover:bg-[#E8F1FF] sm:w-auto group-hover:translate-x-1 hover:-translate-y-1"
              >
                Explore Categories
              </Link>
            </div>

            {/* Minimal brand detail */}
            <div className="mt-12 flex items-center gap-5">
              <div className="h-px w-12 bg-neutral-300" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Curated for everyday life
              </span>
            </div>
          </div>

          {/* RIGHT PRODUCT EDITORIAL */}
          <div className="relative mx-auto h-[500px] w-full max-w-[620px] sm:h-[560px] lg:h-[600px]">
            {/* Main editorial background */}
            <div className="absolute left-[12%] top-[8%] h-[78%] w-[70%] rounded-[3rem] bg-neutral-200/70" />

            {/* Soft circle */}
            <div className="absolute left-[17%] top-[13%] h-[65%] w-[65%] rounded-full border border-black/[0.05]" />

            {/* Product images */}
            {products.map((product) => (
              <div
                key={product.alt}
                className={`absolute overflow-hidden rounded-[1.5rem] border-[6px] border-white bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] transition-transform duration-500 hover:scale-[1.04] ${product.className}`}
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
            ))}

            {/* Small floating label */}
            <div className="absolute bottom-[16%] left-[30%] z-40 hidden rounded-full border border-white/80 bg-white/85 px-5 py-3 shadow-xl backdrop-blur-md sm:block">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-800">
                  New collection
                </span>
              </div>
            </div>

            {/* Decorative typography */}
            <div className="absolute bottom-[4%] right-[3%] z-10 select-none text-[5rem] font-black leading-none tracking-[-0.08em] text-black/[0.035] sm:text-[7rem]">
              TN
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-black/[0.06]" />
    </section>
  );
};

export default BannerPage;
