"use client";

import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

export default function SellerDashboardPage() {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "/api/seller/dashboard-overview"
        );

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
      title: "Products",
      value:
        dashboardData?.totalProducts || 0,
      icon: FiPackage,
    },
    {
      title: "Total Sales",
      value:
        dashboardData?.totalSales || 0,
      icon: FiShoppingBag,
    },
    {
      title: "Revenue",
      value: `${
        dashboardData?.totalRevenue || 0
      }`,
      icon: FiDollarSign,
    },
    {
      title: "Pending Orders",
      value:
        dashboardData?.pendingOrders || 0,
      icon: FiClock,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Monitor your business growth and
          store performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-900">
                    {item.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <Icon
                    size={26}
                    className="text-blue-600"
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-slate-500">
                    Order ID
                  </th>

                  <th className="py-3 text-left text-sm font-medium text-slate-500">
                    Customer
                  </th>

                  <th className="py-3 text-left text-sm font-medium text-slate-500">
                    Status
                  </th>

                  <th className="py-3 text-left text-sm font-medium text-slate-500">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboardData?.recentOrders?.map(
                  (order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-4">
                        #{order.id}
                      </td>

                      <td>
                        {order.customer}
                      </td>

                      <td>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {order.status}
                        </span>
                      </td>

                      <td>
                        ${order.amount}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Top Products */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">
            Top Products
          </h2>

          <div className="space-y-4">
            {dashboardData?.topProducts?.map(
              (product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <h3 className="font-medium text-slate-800">
                      {product.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {product.sales} sales
                    </p>
                  </div>

                  <span className="font-semibold text-blue-600">
                    $
                    {product.revenue}
                  </span>
                </div>
              )
            )}
          </div>

        </div>
      </div>

    </div>
  );
}