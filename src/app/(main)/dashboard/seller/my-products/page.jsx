"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { getMyProducts } from "@/lib/api/getMyProducts";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteProduct } from "@/lib/api/deleteProduct";

import {
  FiPackage,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiBox,
} from "react-icons/fi";

export default function MyProductsPage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    if (!user?.email) return;

    try {
      const data = await getMyProducts(user.email);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const result = await deleteProduct(id);

      if (result.deletedCount > 0) {
        toast.success("Product deleted successfully");

        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Products</h1>

          <p className="mt-2 text-slate-500">
            Manage all products created by you.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-lg">
          <p className="text-sm text-blue-100">Total Products</p>

          <h2 className="text-3xl font-bold">{products.length}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="rounded-3xl border border-dashed bg-white py-20 text-center">
          <FiPackage size={60} className="mx-auto text-slate-300" />

          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            No Products Found
          </h2>

          <p className="mt-2 text-slate-500">
            Add your first product to start selling.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
                  {product.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {product.category}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {product.condition}
                  </span>
                </div>

                {/* Price & Stock */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <FiDollarSign />

                    <span className="font-bold">৳ {product.price}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500">
                    <FiBox />

                    <span>{product.stock} pcs</span>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4 text-xs text-slate-400">
                  Added: {new Date(product.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/dashboard/seller/edit-product/${product._id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
                  >
                    <FiEdit2 />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <FiTrash2 />
                    Delete
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
