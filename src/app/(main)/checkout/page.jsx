"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { authClient } from "@/lib/auth-client";
import {
  FiMapPin,
  FiPhone,
  FiUser,
  FiArrowRight,
  FiXCircle,
  FiCreditCard,
} from "react-icons/fi";
import axios from "axios";

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");

    setLoading(true);

    try {
      // আমরা আপনার এক্সপ্রেস ব্যাকএন্ডের নতুন রুটে ডাটা পাঠাচ্ছি
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`,
        {
          cartItems: cartItems,
          deliveryInfo: deliveryInfo,
          buyerEmail: user?.email || "guest@tradenest.com", // ব্যাকআপ ইমেইল
        },
      );

      // স্ট্রাইপ ডেমো পেমেন্ট পেজের URL এ রিডাইরেক্ট করা
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        alert("Failed to create payment session.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong during checkout.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4">
        Checkout Shipping
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT SIDE: DELIVERY FORM */}
        <div className="lg:col-span-2 border border-slate-100 p-5 sm:p-6 rounded-2xl bg-white shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <FiMapPin className="text-blue-600" /> Delivery Information
          </h2>

          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Receiver Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={deliveryInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 017XXXXXXXX"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Full Shipping Address
              </label>
              <textarea
                name="address"
                rows="4"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                placeholder="House no, Road no, Area, City"
                required
                className="w-full p-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition resize-none"
              ></textarea>
            </div>

            {/* Demo Card Helper */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-xs text-blue-700 flex justify-between items-center">
              <div>
                <span className="font-bold">Demo Card for Testing:</span>
                <code className="ml-2 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                  4242 4242 4242 4242
                </code>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("4242424242424242");
                  alert("Demo card number copied to clipboard!");
                }}
                className="bg-blue-600 text-white px-2.5 py-1 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Copy
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="w-full sm:w-1/3 flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl hover:bg-slate-50 transition"
              >
                <FiXCircle /> Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-2/3 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition shadow-md shadow-blue-100"
              >
                {loading ? "Preparing Payment..." : "Proceed to Payment"}{" "}
                <FiArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <div className="border border-slate-100 bg-slate-50/50 p-5 sm:p-6 rounded-2xl lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <FiCreditCard className="text-blue-600" /> Order Summary
          </h2>

          {/* Product Items Mini List */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                No products in cart
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 bg-white p-2 border border-slate-100 rounded-xl"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      fill
                      sizes="48px"
                      className="object-cover"
                      alt={item.title}
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-semibold text-slate-800 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-bold text-slate-700 flex-shrink-0">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Pricing Math */}
          <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-800">৳{totalPrice}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-800 text-lg">
              <span>Total Amount</span>
              <span className="text-blue-600">৳{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
