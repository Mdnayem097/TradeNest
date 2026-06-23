"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiShoppingBag, FiLayers, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiClock } from "react-icons/fi";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    chartData: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/overview`);
        if (response.data?.success) {
          setStats(response.data.data);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError(err.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700 animate-pulse">Loading Analytics...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <p className="text-red-500 font-semibold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Admin. Here is what happening today.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl text-emerald-700 text-xs font-semibold">
          <FiTrendingUp /> Platform Live Control Active
        </div>
      </div>

      {/* DISPLAY CARDS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Total Users */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition duration-300">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">{stats.totalUsers}</h3>
            <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block">+12% this week</span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><FiUsers size={24} /></div>
        </div>

        {/* Card 2: Total Products */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition duration-300">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">{stats.totalProducts}</h3>
            <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded mt-2 inline-block">Active Items</span>
          </div>
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl"><FiLayers size={24} /></div>
        </div>

        {/* Card 3: Total Orders */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition duration-300">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">{stats.totalOrders}</h3>
            <span className="text-[11px] text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded mt-2 inline-block">Stripe Verified</span>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-xl"><FiShoppingBag size={24} /></div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition duration-300">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">৳{stats.totalRevenue}</h3>
            <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block">Net Earnings</span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><FiDollarSign size={24} /></div>
        </div>
      </div>

      {/*  ANALYTICS CHART & RECENT TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Graph Line Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800 text-base">Sales Revenue Flow</h2>
            <span className="text-xs text-slate-400">Last 7 Days Data</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/*  RECENT ORDERS TABLE LIST */}
        <div className="bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-5 border-b border-slate-50 pb-3">
            <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <FiClock className="text-blue-600"/> Recent Activity
            </h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">Live</span>
          </div>

          <div className="space-y-4 max-h-[285px] overflow-y-auto pr-1">
            {stats.recentOrders.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No recent orders found.</p>
            ) : (
              stats.recentOrders.map((order, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                  <div className="min-w-0 flex-1 pr-2">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{order.productTitle}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{order.buyerEmail}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-black text-slate-700 block">৳{order.price}</span>
                    <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded mt-1 inline-block uppercase">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}