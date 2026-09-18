"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiSearch,
  FiGrid,
  FiPackage,
  FiHeart,
  FiSliders,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  /*
   * ==============================
   * CATEGORY FROM URL
   * ==============================
   */

  const categoryFromUrl = searchParams.get("category");

  /*
   * If category exists in URL,
   * use that category.
   *
   * Otherwise use manually selected
   * category from the category buttons.
   */

  const activeCategory = categoryFromUrl || category;

  /*
   * ==============================
   * FETCH PRODUCTS
   * ==============================
   */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sellerProduct`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        const productData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /*
   * ==============================
   * WISHLIST
   * ==============================
   */

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
        : [...prev, product._id]
    );

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
        {
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
        }
      );
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  /*
   * ==============================
   * GET UNIQUE CATEGORIES
   * ==============================
   */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product?.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  /*
   * ==============================
   * FILTER PRODUCTS
   * ==============================
   */

  const filteredProducts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !searchValue ||
        product?.title
          ?.toLowerCase()
          .includes(searchValue) ||
        product?.description
          ?.toLowerCase()
          .includes(searchValue) ||
        product?.category
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        activeCategory === "All" ||
        product?.category?.toLowerCase() ===
          activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  /*
   * ==============================
   * CLEAR FILTERS
   * ==============================
   */

  const clearAllFilters = () => {
    setSearch("");
    setCategory("All");
  };

  /*
   * ==============================
   * LOADING STATE
   * ==============================
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          <div className="animate-pulse">
            <div className="h-8 w-40 rounded-lg bg-neutral-200" />

            <div className="mt-4 h-4 w-72 rounded bg-neutral-200" />

            <div className="mt-10 h-14 max-w-2xl rounded-2xl bg-neutral-200" />

            <div className="mt-8 flex gap-3 overflow-hidden">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-10 w-24 shrink-0 rounded-full bg-neutral-200"
                />
              ))}
            </div>
          </div>

          {/* Mobile: 1 column */}
          <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >
                <div className="aspect-[4/5] rounded-[28px] bg-neutral-200" />

                <div className="mt-5 h-3 w-20 rounded bg-neutral-200" />

                <div className="mt-3 h-5 w-4/5 rounded bg-neutral-200" />

                <div className="mt-4 h-6 w-24 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==============================
   * MAIN
   * ==============================
   */

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5]">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-white">
        {/* Background decoration */}

        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px]" />

        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-purple-100/40 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16 lg:pt-16">
          <div className="max-w-3xl">
            {/* Label */}

            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white">
                <FiGrid size={14} />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
                TradeNest Marketplace
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-black tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-6xl">
              Explore
              <span className="text-neutral-400">
                {" "}
                Products.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              Discover quality products from trusted sellers
              across the TradeNest marketplace.
            </p>
          </div>

          {/* Search */}

          <div className="relative mt-8 max-w-2xl">
            <FiSearch
              size={19}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="text"
              placeholder="Search products, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-neutral-200 bg-white pl-12 pr-12 text-sm font-medium text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-950"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FiSliders
                size={16}
                className="text-neutral-400"
              />

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
                Browse Collection
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950 sm:text-3xl">
              {activeCategory === "All"
                ? "All Products"
                : activeCategory}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              available
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 shadow-sm">
            <FiGrid
              size={15}
              className="text-neutral-400"
            />

            <span className="text-xs font-semibold text-neutral-600">
              Product Grid
            </span>
          </div>
        </div>

        {/* ================= CATEGORY FILTER ================= */}

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-neutral-900">
              Categories
            </p>

            {activeCategory !== "All" && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-neutral-400 transition-colors hover:text-neutral-950"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((item) => {
              const active = activeCategory === item;

              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                    active
                      ? "bg-neutral-950 text-white shadow-lg shadow-neutral-950/10"
                      : "border border-neutral-200 bg-white text-neutral-500 hover:-translate-y-0.5 hover:border-neutral-300 hover:text-neutral-950 hover:shadow-sm"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ACTIVE FILTERS ================= */}

        {(search || activeCategory !== "All") && (
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-neutral-400">
              Active filters:
            </span>

            {/* Search filter */}

            {search && (
              <button
                onClick={() => setSearch("")}
                className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-700 shadow-sm ring-1 ring-neutral-200"
              >
                Search: “{search}”
                <FiX size={11} />
              </button>
            )}

            {/* Category filter */}

            {activeCategory !== "All" && (
              <button
                onClick={() => setCategory("All")}
                className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-700 shadow-sm ring-1 ring-neutral-200"
              >
                Category: {activeCategory}
                <FiX size={11} />
              </button>
            )}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}

        {filteredProducts.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center rounded-[30px] border border-neutral-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 text-neutral-300">
              <FiPackage size={28} />
            </div>

            <h3 className="mt-5 text-xl font-black text-neutral-950">
              No Products Found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              We could not find any products matching your
              current search or category filter.
            </p>

            <button
              onClick={clearAllFilters}
              className="mt-6 rounded-full bg-neutral-950 px-6 py-3 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ================= PRODUCT GRID ================= */}

        {filteredProducts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isWishlisted =
                wishlist.includes(product._id);

              return (
                <div
                  key={product._id}
                  className="group"
                >
                  {/* Product Image */}

                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-100">
                    <Image
                      src={
                        product.imageUrl ||
                        "/placeholder-product.jpg"
                      }
                      alt={
                        product.title ||
                        "TradeNest Product"
                      }
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Image overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Condition */}

                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur-md sm:text-[10px]">
                        {product.condition ||
                          "Available"}
                      </span>
                    </div>

                    {/* Wishlist */}

                    <button
                      onClick={() =>
                        handleWishlist(product)
                      }
                      aria-label="Add to wishlist"
                      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 sm:right-4 sm:top-4 ${
                        isWishlisted
                          ? "bg-red-500 text-white shadow-lg"
                          : "bg-white/90 text-neutral-500 hover:bg-white hover:text-red-500"
                      }`}
                    >
                      <FiHeart
                        size={17}
                        className={
                          isWishlisted
                            ? "fill-current"
                            : ""
                        }
                      />
                    </button>

                    {/* View Details */}

                    <Link
                      href={`/products/${product._id}`}
                      className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-neutral-950 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <FiArrowUpRight size={18} />
                    </Link>
                  </div>

                  {/* Product Information */}

                  <div className="px-1 pt-5">
                    {/* Category */}

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                      {product.category ||
                        "Category"}
                    </p>

                    {/* Title */}

                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-neutral-950 transition-colors duration-300 group-hover:text-neutral-600 sm:text-base">
                      {product.title}
                    </h3>

                    {/* Description */}

                    {product.description && (
                      <p className="mt-1.5 line-clamp-1 text-xs text-neutral-400">
                        {product.description}
                      </p>
                    )}

                    {/* Price + Stock */}

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-base font-black text-neutral-950 sm:text-lg">
                        ৳{product.price}
                      </span>

                      {product.stock !== undefined && (
                        <span className="text-[10px] font-medium text-neutral-400">
                          {product.stock > 0
                            ? `${product.stock} left`
                            : "Out of stock"}
                        </span>
                      )}
                    </div>

                    {/* Desktop View Details */}

                    <Link
                      href={`/products/${product._id}`}
                      className="group/button mt-4 hidden items-center justify-between border-t border-neutral-100 pt-3 sm:flex"
                    >
                      <span className="text-[11px] font-bold text-neutral-500 transition-colors group-hover/button:text-neutral-950">
                        View Details
                      </span>

                      <FiArrowUpRight
                        size={14}
                        className="text-neutral-300 transition-all duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 group-hover/button:text-neutral-950"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}