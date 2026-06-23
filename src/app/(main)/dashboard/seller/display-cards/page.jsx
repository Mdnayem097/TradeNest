"use client";

import { useEffect, useState } from "react";
import {
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SellerDisplayCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await authClient.getSession();
        const email = session?.data?.user?.email;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/dashboard/display-cards/${email}`
        );

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: data?.totalProducts || 0,
      icon: FiBox,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Sales",
      value: data?.totalSales || 0,
      icon: FiShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Revenue",
      value: `৳${data?.totalRevenue || 0}`,
      icon: FiDollarSign,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Paid Orders",
      value: data?.pendingOrders || 0,
      icon: FiClock,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Seller Dashboard 🚀
        </h1>
        <p className="mt-2 text-blue-100">
          Track your sales, revenue and performance in real-time
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* BG gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition group-hover:opacity-10`}
              />

              {/* Content */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div className="rounded-2xl bg-slate-100 p-4 group-hover:scale-110 transition">
                  <Icon size={26} className="text-slate-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}