"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/sellerProduct/${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // no product
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No product found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-slate-50 border">
          <Image
            src={product?.imageUrl}
            alt={product?.title || "Product image"}
            fill
            className="object-contain p-6 hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-blue-600">{product?.category}</p>

          <h1 className="mt-2 text-4xl font-bold">{product?.title}</h1>

          <h2 className="mt-5 text-3xl font-bold text-green-600">
            ৳{product?.price}
          </h2>

          <p className="mt-6 text-slate-600">{product?.description}</p>

          <div className="mt-6 flex gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2">
              {product?.condition}
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2">
              Stock: {product?.stock}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(product)}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
