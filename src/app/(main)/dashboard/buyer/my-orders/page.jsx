"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { data: session } = authClient.useSession();

  const email = session?.user?.email;

  console.log("Session:", session);
  console.log("Email:", email);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleCancel = async (id) => {
    const token = localStorage.getItem("access-token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/cancel/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order,
        ),
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <Image
                src={order.imageUrl}
                alt={order.productTitle}
                width={150}
                height={150}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{order.productTitle}</h2>

                <p className="mt-2 text-slate-500">৳ {order.price}</p>

                <p className="mt-3">
                  Status:
                  <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                    {order.status}
                  </span>
                </p>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="mt-5 rounded-xl bg-red-500 px-5 py-2 text-white"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
