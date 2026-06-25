"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  const sellerEmail = session?.user?.email;
  console.log("Seller Email:", sellerEmail);

  // ✅ DYNAMIC SELLER EMAIL (no hardcode)

  // ✅ FETCH ORDERS
  const fetchOrders = async (email) => {
    const token = localStorage.getItem("access-token");
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/orders/${email}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        },}
      );

      const data = await res.json();
      setOrders(data || []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerEmail) {
      fetchOrders(sellerEmail);
    } else {
      setLoading(false);
    }
  }, [sellerEmail]);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("access-token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders(sellerEmail);
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Manage Orders
        </h1>
        <p className="text-slate-500">Handle incoming customer orders</p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No orders found</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* LEFT */}
                <div className="flex gap-4 items-center">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xl border">
                    <Image
                      src={order.imageUrl || "/placeholder.png"}
                      alt={order.productTitle || "Product"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900 line-clamp-1">
                      {order.productTitle}
                    </h2>

                    <p className="text-sm text-slate-500">
                      Name: {order.deliveryInfo.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      Payment: {order.paymentMethod}
                    </p>

                    <p className="text-xs text-slate-400">
                      Location: {order.deliveryInfo.address}
                    </p>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="text-left sm:text-center">
                  <p className="text-lg font-bold text-slate-900">
                    ৳ {order.price}
                  </p>

                  <span
                    className={`mt-1 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "accepted"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button
                    onClick={() => updateStatus(order._id, "accepted")}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "delivered")}
                    className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                  >
                    Deliver
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "rejected")}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
