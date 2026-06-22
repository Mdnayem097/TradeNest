"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLimit(4); // small device
      } else {
        setLimit(8); // lg device
      }
    };

    handleResize(); // run first time
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sellerProduct`);
        const data = await res.json();

        const latestProducts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, limit);

        setProducts(latestProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Featured Products
        </h2>
        <p className="text-slate-500 mt-2">
          Latest products from our marketplace
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              
              {/* Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={
                    product.image ||
                    product.imageUrl ||
                    product.img ||
                    "/placeholder.png"
                  }
                  alt={product.name || "TradeNest Product"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                  {product.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-blue-600 font-bold">
                    ৳{product.price}
                  </span>

                  <span className="text-xs text-slate-400">
                    {product.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;