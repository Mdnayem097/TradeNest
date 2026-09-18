"use client";

import Link from "next/link";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiSend,
  FiArrowUpRight,
} from "react-icons/fi";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-100/60 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-10 h-[450px] w-[450px] rounded-full bg-purple-100/50 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500 shadow-sm sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Contact TradeNest
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black leading-tight tracking-[-0.05em] text-neutral-950 sm:text-5xl lg:text-7xl">
              Let's start a
              <span className="text-neutral-400"> conversation.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
              Have a question, feedback, or need assistance? Our team is here to
              help make your TradeNest experience better.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            {/* =================================================
                CONTACT INFO
            ================================================== */}
            <div className="relative overflow-hidden rounded-[32px] bg-neutral-950 p-7 text-white sm:p-9 lg:p-10">
              {/* Glows */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                  Get In Touch
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                  We're here to help.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  Whether you're a buyer or seller, reach out to us whenever you
                  need support. We'll do our best to get you the answers you
                  need.
                </p>

                {/* Contact Details */}
                <div className="mt-10 space-y-4">
                  {/* Address */}
                  <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300 transition-transform duration-300 group-hover:scale-105">
                      <FiMapPin size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Address
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 transition-transform duration-300 group-hover:scale-105">
                      <FiMail size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Email
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-white">
                        support@tradenest.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-purple-300 transition-transform duration-300 group-hover:scale-105">
                      <FiPhone size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Phone
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        +880 1767 148518
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300 transition-transform duration-300 group-hover:scale-105">
                      <FiClock size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Business Hours
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        Sat - Thu : 9:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-10 border-t border-white/10 pt-7">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                    Follow TradeNest
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      aria-label="Facebook"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white hover:text-neutral-950"
                    >
                      <FiFacebook size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label="Twitter"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white hover:text-neutral-950"
                    >
                      <FiTwitter size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label="Instagram"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white hover:text-neutral-950"
                    >
                      <FiInstagram size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}
            <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-9 lg:p-10">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-50 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
                      Send Us A Message
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                      How can we help?
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
                      Fill out the form below and our team will get back to you
                      as soon as possible.
                    </p>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white sm:flex">
                    <FiSend size={19} />
                  </div>
                </div>

                <form className="mt-9 space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-bold text-neutral-700"
                      >
                        Your Name
                      </label>

                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="h-13 w-full rounded-2xl border border-neutral-200 bg-[#fafafa] px-4 text-sm font-medium text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-bold text-neutral-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-13 w-full rounded-2xl border border-neutral-200 bg-[#fafafa] px-4 text-sm font-medium text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="h-13 w-full rounded-2xl border border-neutral-200 bg-[#fafafa] px-4 text-sm font-medium text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-bold text-neutral-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-2xl border border-neutral-200 bg-[#fafafa] px-4 py-4 text-sm font-medium text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-neutral-950 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-xl"
                  >
                    Send Message
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                      <FiArrowUpRight size={15} />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP
      ====================================================== */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
                Find Us
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                TradeNest Location
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <FiMapPin size={16} />
              Dhaka, Bangladesh
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-2 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-3">
            <div className="overflow-hidden rounded-[26px]">
              <iframe
                title="TradeNest Location - Dhaka Bangladesh"
                src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                className="h-[350px] w-full grayscale transition-all duration-700 group-hover:grayscale-0 sm:h-[450px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-neutral-950 px-6 py-14 text-center sm:px-10 sm:py-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
            TradeNest Marketplace
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
            Looking for something special?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            Explore our marketplace and discover products from sellers across
            TradeNest.
          </p>

          <Link
            href="/products"
            className="group mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-100 hover:shadow-2xl"
          >
            Explore Products
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-1">
              <FiArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
