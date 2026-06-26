"use client";

import Link from "next/link";
import {
  FiMonitor,
  FiShoppingBag,
  FiHome,
  FiTruck,
  FiActivity,
  FiBookOpen,
  FiArrowRight,
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
    icon: <FiMonitor size={32} />,
    color: "from-blue-500 to-cyan-500",
    products: 120,
  },
  Fashion: {
    icon: <FiShoppingBag size={32} />,
    color: "from-pink-500 to-rose-500",
    products: 85,
  },
  "Home & Living": {
    icon: <FiHome size={32} />,
    color: "from-emerald-500 to-green-500",
    products: 64,
  },
  Vehicles: {
    icon: <FiTruck size={32} />,
    color: "from-orange-500 to-amber-500",
    products: 42,
  },
  Sports: {
    icon: <FiActivity size={32} />,
    color: "from-purple-500 to-indigo-500",
    products: 57,
  },
  Books: {
    icon: <FiBookOpen size={32} />,
    color: "from-yellow-500 to-orange-500",
    products: 94,
  },
};

export default function CategoriesPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
            Browse Categories
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Shop by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Discover thousands of products across different categories.
            Find everything you need from trusted sellers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const item = categoryData[category];

            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Background */}
                <div
                  className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-2xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-2xl font-bold text-slate-800">
                  {category}
                </h3>

                <p className="mt-2 text-slate-500">
                  {item.products}+ Products Available
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-600">
                    Explore Now
                  </span>

                  <div className="rounded-full bg-slate-100 p-2 transition group-hover:bg-blue-600 group-hover:text-white">
                    <FiArrowRight />
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition group-hover:border-blue-500"></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View All Products
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}