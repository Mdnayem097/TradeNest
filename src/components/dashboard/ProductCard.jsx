"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteProduct } from "@/lib/api/deleteProduct";

export default function ProductCard({ product, refetch }) {
  const [loading, setLoading] = useState(false);

  // DELETE
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    setLoading(true);

    const res = await deleteProduct(product._id);

    if (res.deletedCount > 0) {
      alert("Deleted Successfully");
      refetch();
    }

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Image */}
      <div className="relative h-52 w-full">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">

        <h2 className="text-lg font-bold">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500">
          {product.description}
        </p>

        <p className="font-semibold text-green-600">
          ৳ {product.price}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">

          {/* EDIT (placeholder) */}
          <button className="flex-1 rounded-xl bg-blue-600 py-2 text-white">
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-500 py-2 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>
    </div>
  );
}