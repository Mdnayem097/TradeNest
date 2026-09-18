"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLimit(4);
      } else {
        setLimit(8);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sellerProduct`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const response = await res.json();

        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];

        const latestProducts = data
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, limit);

        setProducts(latestProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-neutral-100 blur-3xl" />

        <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-neutral-100 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ================= HEADER ================= */}
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              TradeNest Collection
            </p>

            <h2 className="text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Featured Products
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Discover the latest products from sellers across
              our marketplace.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex w-fit items-center gap-3 text-sm font-bold text-neutral-950"
          >
            <span className="border-b border-neutral-950 pb-1">
              View all products
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
            {[...Array(limit)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] rounded-[28px] bg-neutral-100" />

                <div className="mt-5 h-4 w-3/4 rounded bg-neutral-100" />

                <div className="mt-3 h-3 w-1/2 rounded bg-neutral-100" />

                <div className="mt-4 h-5 w-1/3 rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* ================= EMPTY ================= */
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-20 text-center">
            <h3 className="text-xl font-bold text-neutral-900">
              No products available
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              New products will appear here soon.
            </p>
          </div>
        ) : (
          /* ================= PRODUCTS ================= */
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group block"
              >
                {/* ================= IMAGE ================= */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-100">
                  <Image
                    src={
                      product.imageUrl ||
                      "/placeholder.png"
                    }
                    alt={
                      product.title ||
                      "TradeNest Product"
                    }
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1024px) 25vw, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur-md sm:text-[11px]">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Condition Badge */}
                  {product.condition && (
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <span className="rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:text-[11px]">
                        {product.condition}
                      </span>
                    </div>
                  )}

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-neutral-950 shadow-lg">
                      →
                    </div>
                  </div>
                </div>

                {/* ================= PRODUCT INFO ================= */}
                <div className="mt-5">
                  <h3 className="truncate text-sm font-bold text-neutral-950 sm:text-base">
                    {product.title}
                  </h3>

                  {product.description && (
                    <p className="mt-1 truncate text-xs text-neutral-500 sm:text-sm">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-base font-black text-neutral-950 sm:text-lg">
                      ৳{product.price}
                    </p>

                    {product.stock !== undefined && (
                      <span className="text-xs font-medium text-neutral-400">
                        {product.stock > 0
                          ? `${product.stock} left`
                          : "Out of stock"}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ================= BOTTOM CTA ================= */}
        {!loading && products.length > 0 && (
          <div className="mt-16 flex justify-center sm:mt-20">
            <Link
              href="/products"
              className="inline-flex h-14 items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-xl"
            >
              Explore All Products

              <span className="ml-3 text-lg">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;