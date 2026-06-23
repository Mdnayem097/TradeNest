"use client";

import { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign } from "react-icons/fi";

// --- FAKE / MOCK DATA FOR CHARTS ---
const userGrowthData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 1200 },
  { name: "Apr", users: 1900 },
  { name: "May", users: 2700 },
  { name: "Jun", users: 3500 },
];

const monthlyOrdersData = [
  { name: "Jan", orders: 120, revenue: 45000 },
  { name: "Feb", orders: 220, revenue: 85000 },
  { name: "Mar", orders: 180, revenue: 72000 },
  { name: "Apr", orders: 390, revenue: 150000 },
  { name: "May", orders: 430, revenue: 185000 },
  { name: "Jun", orders: 560, revenue: 240000 },
];

const categoryPerformanceData = [
  { name: "Electronics", sales: 8500, stock: 120 },
  { name: "Clothing", sales: 6200, stock: 340 },
  { name: "Home Appliances", sales: 4100, stock: 85 },
  { name: "Books", sales: 2300, stock: 500 },
  { name: "Gadgets", sales: 7400, stock: 150 },
];

const topCategoriesPieData = [
  { name: "Electronics", value: 40 },
  { name: "Clothing", value: 30 },
  { name: "Gadgets", value: 20 },
  { name: "Others", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

export default function PlatformAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Platform Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">
          Provides overall business insights, platform growth, user activity, and product performance trends.
        </p>
      </div>

      {/* TOP ANALYTICS MINI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">৳7,77,000</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FiDollarSign size={20} /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Users</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">3,500+</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FiUsers size={20} /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">1,900 Pcs</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FiShoppingBag size={20} /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">12.4%</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><FiTrendingUp size={20} /></div>
        </div>
      </div>

      {/* CHARTS GRID SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: USER GROWTH (Area Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">📈 User Growth Chart</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: MONTHLY ORDERS & REVENUE (Line & Bar Mix Effect) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">📊 Monthly Orders & Revenue Trend</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Orders Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: CATEGORY PERFORMANCE (Horizontal/Vertical Bar Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">🛒 Category Performance (Sales Volume)</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={90} />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[0, 4, 4, 0]} name="Sales (৳)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: TOP CATEGORIES SHARE (Pie Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">🍕 Top Categories Distribution</h3>
          <div className="h-64 w-full flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-44 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topCategoriesPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {topCategoriesPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legends */}
            <div className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
              {topCategoriesPieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: COLORS[index] }}></span>
                  <span>{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}