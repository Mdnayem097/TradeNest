"use client";

import {
  FiPackage,
  FiUsers,
  FiUserCheck,
  FiShoppingBag,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Products",
    value: "25K+",
    Icon: FiPackage,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Total Sellers",
    value: "1.2K+",
    Icon: FiUserCheck,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    title: "Total Buyers",
    value: "10K+",
    Icon: FiUsers,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    title: "Completed Orders",
    value: "50K+",
    Icon: FiShoppingBag,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
];

export default function MarketplaceStats() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Marketplace Statistics
        </h2>
        <p className="text-slate-500 mt-2">
          Real-time platform insights
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.Icon;

          return (
            <div
              key={item.title}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}
              />

              <div
                className={`relative w-14 h-14 flex items-center justify-center rounded-xl ${item.bg} ${item.text} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}