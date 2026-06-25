"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        console.log("Wishlist Data:", data); // debug

        setWishlist(data || []);
      } catch (error) {
        console.log("Wishlist Error:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist ❤️</h1>
        <p className="text-slate-500">Your saved products</p>
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No wishlist items found 😢
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE SAFE HANDLING */}
              <div className="relative h-48 bg-slate-100">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Product"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg line-clamp-1">
                  {item.title || "No Title"}
                </h2>

                <p className="text-blue-600 font-bold">৳ {item.price || 0}</p>

                <p className="text-sm text-slate-500 line-clamp-2">
                  {item.description || "No description available"}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 pt-3">
                  <Link
                    href={`/products/${item.productId}`}
                    className="flex-1 text-center text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    <FiTrash2 size={16} />
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
