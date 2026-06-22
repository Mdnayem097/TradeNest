"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShoppingBag, FiHeart, FiClock, FiDollarSign } from "react-icons/fi";

export default function BuyerDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/buyer/dashboard-overview");

        const data = await res.json();

        setDashboardData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Orders",
      value: dashboardData?.totalOrders || 0,
      icon: FiShoppingBag,
    },
    {
      title: "Wishlist",
      value: dashboardData?.wishlistCount || 0,
      icon: FiHeart,
    },
    {
      title: "Total Spent",
      value: `৳${dashboardData?.totalSpent || 0}`,
      icon: FiDollarSign,
    },
    {
      title: "Pending Orders",
      value: dashboardData?.pendingOrders || 0,
      icon: FiClock,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="mt-2 text-blue-100">Track your purchases and orders.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <Icon size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Purchases */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Recent Purchases</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardData?.recentPurchases?.map((item) => (
            <div key={item._id} className="rounded-2xl border p-4">
              <div className="relative h-40 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>

              <h3 className="mt-3 font-medium">{item.title}</h3>

              <p className="mt-1 text-blue-600 font-semibold">৳{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Orders + Wishlist */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Orders */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>

          <div className="space-y-3">
            {dashboardData?.recentOrders?.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >
                <span>#{order._id}</span>

                <span>৳{order.amount}</span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Wishlist Preview</h2>

          <div className="space-y-3">
            {dashboardData?.wishlist?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 rounded-xl bg-slate-50 p-3"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <h3 className="font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
