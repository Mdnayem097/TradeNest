"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiGrid, FiPackage, FiHeart } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sellerProduct`,
        );

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlist = async (product) => {
    const session = await authClient.getSession();
    const buyerEmail = session?.data?.user?.email;

    if (!buyerEmail) {
      alert("Please login first");
      return;
    }
    setWishlist((prev) =>
      prev.includes(product._id)
        ? prev.filter((item) => item !== product._id)
        : [...prev, product._id],
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          category: product.category,
          condition: product.condition,
          buyerEmail,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product?.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-4xl font-bold text-white">Explore Products</h1>

          <p className="mt-3 text-blue-100">
            Discover quality products from trusted sellers.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-lg">
            <FiSearch
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white py-4 pl-12 pr-4 outline-none ring-0"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">All Products</h2>

            <p className="mt-1 text-slate-500">
              {filteredProducts.length} products available
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2">
            <FiGrid />
            <span className="text-sm">Product Grid</span>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border bg-white py-20">
            <FiPackage size={60} className="text-slate-300" />

            <h3 className="mt-4 text-xl font-semibold">No Products Found</h3>

            <p className="mt-2 text-slate-500">Try another search keyword.</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder-product.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority
                />

                {/* Condition */}
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium shadow">
                  {product.condition || "Available"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-blue-600">
                  {product.category || "Category"}
                </p>

                <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">
                  {product.title}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ৳{product.price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/products/${product._id}`}
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleWishlist(product)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-red-200 hover:bg-red-50"
                  >
                    <FiHeart
                      size={20}
                      className={`transition-all duration-300 ${
                        wishlist.includes(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
