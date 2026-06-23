"use client";

import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SellerDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("Top Products:", dashboardData?.topProducts);
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const session = await authClient.getSession();

        const email = session?.data?.user?.email;

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/dashboard/${email}`,
        );

        const data = await res.json();

        setDashboardData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
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
      value: dashboardData?.totalProducts || 0,
      icon: FiPackage,
    },
    {
      title: "Total Sales",
      value: dashboardData?.totalSales || 0,
      icon: FiShoppingBag,
    },
    {
      title: "Revenue",
      value: `৳${dashboardData?.totalRevenue || 0}`,
      icon: FiDollarSign,
    },
    {
      title: "Paid Orders",
      value: dashboardData?.pendingOrders || 0,
      icon: FiClock,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="mt-2 text-blue-100">
          Monitor your business growth and store performance.
        </p>
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

      {/* Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Order ID</th>

                  <th className="py-3 text-left">Customer</th>

                  <th className="py-3 text-left">Payment</th>

                  <th className="py-3 text-left">Status</th>

                  <th className="py-3 text-left">Amount</th>
                </tr>
              </thead>

              <tbody>
                {dashboardData?.recentOrders?.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-4">#{order._id.slice(-6)}</td>

                    <td>{order.buyerName}</td>

                    <td>{order.paymentLabel || order.paymentMethod}</td>

                    <td>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                        {order.status}
                      </span>
                    </td>

                    <td>৳{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Top Products</h2>

          <div className="space-y-4">
            {dashboardData?.topProducts?.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <h3 className="font-medium text-slate-800">{product.name}</h3>

                  <p className="text-sm text-slate-500">
                    Sales: {product.sales}
                  </p>
                </div>

                <span className="font-semibold text-blue-600">
                  ৳{product.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">TXN ID</th>

                <th className="py-3 text-left">Amount</th>

                <th className="py-3 text-left">Payment Method</th>

                <th className="py-3 text-left">Date</th>

                <th className="py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData?.paymentHistory?.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="py-4">{payment.txnId}</td>

                  <td>৳{payment.price}</td>

                  <td>{payment.paymentLabel}</td>

                  <td>{payment.createdAt}</td>

                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
