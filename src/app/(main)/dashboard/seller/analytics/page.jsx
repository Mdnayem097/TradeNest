"use client";

import { useEffect, useState } from "react";

export default function SalesAnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fake Data (later replace with API)
    const fakeData = {
      monthlySales: [
        { month: "Jan", sales: 12000 },
        { month: "Feb", sales: 18000 },
        { month: "Mar", sales: 14000 },
        { month: "Apr", sales: 22000 },
        { month: "May", sales: 30000 },
        { month: "Jun", sales: 25000 },
      ],

      topProducts: [
        { name: "T-Shirt", sales: 120 },
        { name: "Shoes", sales: 90 },
        { name: "Watch", sales: 70 },
        { name: "Bag", sales: 60 },
        { name: "Jacket", sales: 50 },
      ],

      stats: {
        totalSales: 540,
        revenue: 121000,
        growth: 18,
      },
    };

    setData(fakeData);
  }, []);

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h1 className="text-3xl font-bold">Sales Analytics</h1>
        <p className="opacity-80">
          Visual representation of seller performance
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-2xl font-bold">{data.stats.totalSales}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">৳ {data.stats.revenue}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500">Growth</p>
          <h2 className="text-2xl font-bold text-green-600">
            +{data.stats.growth}%
          </h2>
        </div>
      </div>

      {/* SALES CHART */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Monthly Sales Trend</h2>

        <div className="space-y-3">
          {data.monthlySales.map((item) => (
            <div key={item.month} className="flex items-center gap-4">
              <span className="w-10 text-sm">{item.month}</span>

              <div className="h-3 flex-1 rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${item.sales / 300}%` }}
                />
              </div>

              <span className="w-20 text-right text-sm">
                ৳ {item.sales}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Top Selling Products</h2>

        <div className="space-y-4">
          {data.topProducts.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
            >
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold text-blue-600">
                {product.sales} sales
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}