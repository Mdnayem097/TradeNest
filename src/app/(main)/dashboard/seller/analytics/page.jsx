"use client";

import { useEffect, useState } from "react";

export default function SalesAnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      stats: {
        totalSales: 540,
        revenue: 121000,
        growth: 18,
        pending: 12,
      },

      monthlySales: [
        { month: "Jan", value: 20 },
        { month: "Feb", value: 35 },
        { month: "Mar", value: 25 },
        { month: "Apr", value: 50 },
        { month: "May", value: 70 },
        { month: "Jun", value: 55 },
      ],

      topProducts: [
        { name: "Premium T-Shirt", sales: 120, revenue: 24000 },
        { name: "Running Shoes", sales: 90, revenue: 54000 },
        { name: "Smart Watch", sales: 70, revenue: 35000 },
        { name: "Backpack", sales: 60, revenue: 18000 },
      ],
    });
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-6">

      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Sales Analytics
        </h1>
        <p className="mt-2 text-white/80">
          Real-time performance dashboard overview
        </p>
      </div>

      {/* STATS GRID */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {[
          { label: "Total Sales", value: data.stats.totalSales },
          { label: "Revenue", value: `৳${data.stats.revenue}` },
          { label: "Growth", value: `+${data.stats.growth}%` },
          { label: "Pending Orders", value: data.stats.pending },
        ].map((item, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <p className="text-sm text-slate-500">{item.label}</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {item.value}
            </h2>

            <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        {/* MONTHLY SALES */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Monthly Sales Trend
          </h2>

          <div className="space-y-5">
            {data.monthlySales.map((m, i) => (
              <div key={i} className="flex items-center gap-4">

                <span className="w-10 text-sm text-slate-500">
                  {m.month}
                </span>

                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${m.value * 1.2}%` }}
                  />
                </div>

                <span className="w-10 text-right text-sm font-medium text-slate-700">
                  {m.value}
                </span>

              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Top Products
          </h2>

          <div className="space-y-4">
            {data.topProducts.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gradient-to-r from-slate-50 to-white p-4 border border-slate-100 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-slate-800">
                  {p.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Sales: <span className="font-medium">{p.sales}</span>
                </p>

                <p className="text-sm text-indigo-600 font-medium mt-1">
                  ৳ {p.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}