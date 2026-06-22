"use client";

import { FiMonitor, FiHome, FiTruck, FiSmartphone } from "react-icons/fi";
import Link from "next/link";

const PopularCategories = () => {
  const categories = [
    {
      name: "Electronics",
      icon: <FiMonitor size={26} />,
      color: "from-blue-500 to-indigo-500",
      iconBg: "text-blue-600 bg-blue-50",
    },
    {
      name: "Furniture",
      icon: <FiHome size={26} />,
      color: "from-emerald-500 to-teal-500",
      iconBg: "text-emerald-600 bg-emerald-50",
    },
    {
      name: "Vehicles",
      icon: <FiTruck size={26} />,
      color: "from-orange-500 to-red-500",
      iconBg: "text-orange-600 bg-orange-50",
    },
    {
      name: "Mobile Phones",
      icon: <FiSmartphone size={26} />,
      color: "from-purple-500 to-pink-500",
      iconBg: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Popular Categories
        </h2>
        <p className="text-slate-500 mt-2">
          Explore top product categories
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/products?category=${cat.name}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            
            {/* background glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-all`}
            />

            {/* ICON (FIXED SMART STYLE) */}
            <div
              className={`
                relative flex items-center justify-center w-14 h-14 rounded-xl mb-4
                ${cat.iconBg}
                group-hover:scale-110 transition-transform duration-300
              `}
            >
              {cat.icon}
            </div>

            {/* text */}
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
              {cat.name}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Browse products
            </p>

          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;