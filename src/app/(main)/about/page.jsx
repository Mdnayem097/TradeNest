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
  FiArrowRight,
} from "react-icons/fi";

export default function AboutPage() {
  const features = [
    {
      icon: <FiShield size={28} />,
      title: "Trusted Marketplace",
      description:
        "Every seller is verified to ensure safe and reliable shopping for our customers.",
    },
    {
      icon: <FiTruck size={28} />,
      title: "Fast Delivery",
      description:
        "Quick and secure delivery with real-time order tracking across the country.",
    },
    {
      icon: <FiUsers size={28} />,
      title: "Community Driven",
      description:
        "Connecting buyers and sellers through a trusted online marketplace.",
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main className="bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              About TradeNest
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Your Trusted Online Marketplace
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
              TradeNest connects buyers and sellers in one secure platform,
              making online shopping simple, fast, and reliable.
            </p>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-blue-600 font-semibold uppercase tracking-wide">
                Who We Are
              </span>

              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                Building the Future of E-Commerce
              </h2>

              <p className="mt-6 text-slate-600 leading-8">
                TradeNest is a modern multi-vendor marketplace where buyers can
                discover quality products and sellers can grow their businesses.
                Our platform is designed with simplicity, security, and
                performance in mind.
              </p>

              <p className="mt-4 text-slate-600 leading-8">
                We believe online shopping should be safe, transparent, and
                enjoyable for everyone. That's why we focus on verified sellers,
                secure payments, and excellent customer support.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-xl">
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
                    <FiTarget size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Our Mission
                    </h3>

                    <p className="mt-2 text-slate-600">
                      To empower businesses and provide customers with a
                      seamless, secure, and affordable shopping experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="rounded-xl bg-green-100 p-4 text-green-600">
                    <FiEye size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Our Vision
                    </h3>

                    <p className="mt-2 text-slate-600">
                      To become one of the most trusted digital marketplaces by
                      connecting millions of buyers and sellers worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900">
                Why Choose TradeNest?
              </h2>

              <p className="mt-4 text-slate-500">
                Everything you need for a safe and enjoyable shopping
                experience.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-600">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-white p-8 text-center shadow-lg"
                >
                  <h2 className="text-5xl font-bold text-blue-600">
                    {item.number}
                  </h2>

                  <p className="mt-3 text-lg font-medium text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center text-white">
            <FiShoppingBag size={60} className="mx-auto mb-6" />

            <h2 className="text-4xl font-bold">Start Shopping Today</h2>

            <p className="mt-5 text-blue-100 text-lg">
              Join thousands of buyers and sellers who trust TradeNest every
              day.
            </p>

            <Link
              href="/products"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Explore Products
              <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
