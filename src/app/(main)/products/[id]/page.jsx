"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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

          <button
            onClick={() => setOpen(true)}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white"
          >
            Buy Now
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-lg font-bold">Confirm Your Order</h2>
              <p className="text-sm opacity-80">
                Complete your purchase details
              </p>
            </div>

            {/* Product Info */}
            <div className="p-4 border-b bg-slate-50">
              <p className="font-semibold">{product.title}</p>
              <p className="text-sm text-slate-500">৳ {product.price}</p>
            </div>

            {/* Form */}
            <form
              className="p-5 space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.target;

                const orderData = {
                  productId: product._id,
                  productTitle: product.title,
                  price: product.price,
                  quantity: form.quantity.value,

                  buyerName: form.name.value,
                  buyerEmail: form.email.value,
                  location: form.location.value,

                  paymentMethod: "Cash on Delivery",
                  status: "pending",
                  createdAt: new Date(),
                };

                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(orderData),
                });

                if (res.ok) {
                  alert("Order placed successfully!");
                  setOpen(false);
                }
              }}
            >
              {/* Name */}
              <input
                name="name"
                placeholder="Full Name"
                className="w-full border rounded-lg p-2"
                required
              />

              {/* Email */}
              <input
                name="email"
                placeholder="Email Address"
                className="w-full border rounded-lg p-2"
                required
              />

              {/* Location */}
              <input
                name="location"
                placeholder="Delivery Location"
                className="w-full border rounded-lg p-2"
                required
              />

              {/* Quantity */}
              <input
                name="quantity"
                type="number"
                defaultValue={1}
                className="w-full border rounded-lg p-2"
              />

              {/* Payment (fixed COD dropdown style) */}
              <div className="w-full border rounded-lg p-2 bg-slate-100 text-sm text-slate-700">
                Payment Method: <b>Cash on Delivery</b>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  Confirm Order
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
