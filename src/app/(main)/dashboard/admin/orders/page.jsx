"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiTruck,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiActivity,
} from "react-icons/fi";
import axios from "axios";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, shipped, delivered, disputed
  const [loading, setLoading] = useState(true);

  // সব অর্ডার নিয়ে আসা (Read)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access-token");
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // অর্ডারের স্ট্যাটাস পরিবর্তন করা (Track & Update Status)
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/orders/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        alert(`Order status updated to ${newStatus}`);
        fetchOrders(); // ডাটা রিফ্রেশ করা
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      alert("Failed to update status.");
    }
  };

  // বিবাদ বা ঝামেলা মিটিয়ে ফেলা (Resolve Dispute)
  const handleResolveDispute = async (orderId) => {
    const confirmResolve = window.confirm(
      "Are you sure you want to resolve this dispute? This will set the order status to 'processing' or 'delivered' based on admin decision.",
    );
    if (!confirmResolve) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/orders/${orderId}/resolve`,
        {
          isDisputed: false,
          status: "processing",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        alert("Dispute successfully resolved!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Resolve Dispute Error:", err);
    }
  };

  // সার্চ এবং স্ট্যাটাস ফিল্টারিং লজিক
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id?.toLowerCase().includes(search.toLowerCase()) ||
      order.buyerEmail?.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "disputed")
      return matchesSearch && order.isDisputed === true;
    return matchesSearch && order.status === filterStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* HEADER & TOP BAR CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Manage Orders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track logistic cycles, update fulfillment status, and mitigate user
            conflicts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Buyer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 shadow-sm transition"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm transition"
          >
            <option value="all">All Orders</option>
            <option value="pending">⏳ Pending Payment</option>
            <option value="processing">⚙️ Processing</option>
            <option value="shipped">🚚 Shipped</option>
            <option value="delivered">✅ Delivered</option>
            <option value="disputed">⚠️ Disputed/Issues</option>
          </select>
        </div>
      </div>

      {/* ORDERS LIST TABLE */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Order ID & Date</th>
                <th className="py-4 px-6">Customer & Items</th>
                <th className="py-4 px-6">Total Cost</th>
                <th className="py-4 px-6">Delivery Status</th>
                <th className="py-4 px-6 text-right">Fulfillment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-slate-400 font-medium"
                  >
                    No order files recorded under this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className={`hover:bg-slate-50/50 transition ${order.isDisputed ? "bg-rose-50/20" : ""}`}
                  >
                    {/* ✅ সংশোধিত এবং নিরাপদ কোড */}
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-slate-800 uppercase tracking-tight block">
                        #{order._id?.slice(-8)}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {(() => {
                          if (!order.createdAt) return "Recent";

                          // যদি ডেটটি অলরেডি স্ট্যান্ডার্ড বা ISO ফরম্যাটে থাকে
                          if (!isNaN(Date.parse(order.createdAt))) {
                            return new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            );
                          }

                          // আপনার ডাটাবেজের স্পেশাল ফরম্যাট "24/06/2026" (DD/MM/YYYY) হ্যান্ডেল করার জন্য লজিক:
                          const parts = order.createdAt.split("/");
                          if (parts.length === 3) {
                            const day = parts[0];
                            const month = parts[1];
                            const year = parts[2];

                            // জাভাস্ক্রিপ্ট বুঝতে পারে এমন ফরম্যাটে (YYYY-MM-DD) রূপান্তর করা হলো
                            const validDateStr = `${year}-${month}-${day}`;
                            if (!isNaN(Date.parse(validDateStr))) {
                              return new Date(validDateStr).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              );
                            }
                          }

                          return order.createdAt; // কোনো লজিকেই কাজ না করলে অরিজিনাল টেক্সটটিই দেখাবে (যেমন "24/06/2026")
                        })()}
                      </span>
                    </td>

                    {/* Customer Info & Quantity */}
                    <td className="py-4 px-6">
                      <h4
                        className="font-bold text-slate-800 max-w-[160px] truncate"
                        title={order.buyerEmail}
                      >
                        {order.buyerEmail}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Items Count:{" "}
                        <span className="font-bold text-slate-600">
                          {order.products?.length || 1} Pcs
                        </span>
                      </p>
                    </td>

                    {/* Order Total Price */}
                    <td className="py-4 px-6 font-black text-slate-800">
                      ৳{order.totalAmount || order.price}
                    </td>

                    {/* Order Tracking Status Tag */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                            order.status === "delivered"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : order.status === "shipped"
                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                : order.status === "processing"
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                                  : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {order.status || "pending"}
                        </span>

                        {/* Dispute Label */}
                        {order.isDisputed && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold border border-rose-100 animate-pulse">
                            <FiAlertCircle /> Account Locked: Dispute
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Changer Controllers */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Dispute Solver Shortcut Button */}
                        {order.isDisputed && (
                          <button
                            onClick={() => handleResolveDispute(order._id)}
                            title="Resolve Dispute & Release Order"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 text-white rounded-lg text-[10px] font-bold hover:bg-rose-700 transition cursor-pointer shadow-sm"
                          >
                            <FiCheckCircle size={12} /> Resolve Dispute
                          </button>
                        )}

                        {/* Status Change Dropdown */}
                        <select
                          value={order.status || "pending"}
                          onChange={(e) =>
                            handleUpdateStatus(order._id, e.target.value)
                          }
                          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
