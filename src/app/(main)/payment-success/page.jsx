export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiShoppingBag,
  FiArrowRight,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";
import axios from "axios";
import PrivateRoute from "@/components/PrivateRoute";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Receiving the correct function from CartContext
  const { clearCart } = useCart();

  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const isVerified = useRef(false); // To prevent duplicate requests due to React 18 StrictMode

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found. Invalid access.");
      setLoading(false);
      return;
    }

    // Prevent duplicate verification requests
    if (isVerified.current) return;
    isVerified.current = true;

    const verifyPayment = async () => {
      try {
        // Calling backend verify-payment API
        const token = localStorage.getItem("access-token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-payment`,
          {
            session_id: sessionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data?.success) {
          setPaymentData(response.data);

          // ✅ Clear the cart after a successful payment
          if (typeof clearCart === "function") {
            clearCart();
          }
        } else {
          setError(response.data?.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(
          err.response?.data?.message ||
            "Something went wrong while verifying payment.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, clearCart]);

  // 1. Loading State UI
  if (loading) {
    return (
      <PrivateRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700 animate-pulse">
          Verifying Your Payment...
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Please do not close or refresh this window.
        </p>
      </div>
      </PrivateRoute>
    );
  }

  // 2. Error State UI (If payment fails or session is invalid)
  if (error) {
    return (
      <PrivateRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="bg-red-50 p-4 rounded-full text-red-500 mb-4">
          <FiAlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          Payment Verification Failed
        </h1>
        <p className="text-slate-600 text-center max-w-md mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
          {error}
        </p>
        <button
          onClick={() => router.push("/cart")}
          className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition"
        >
          Back to Cart
        </button>
      </div>
      </PrivateRoute>
    );
  }

  // 3. Success Receipt UI
  return (
    <PrivateRoute>
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>

        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
          <div className="text-emerald-500 bg-emerald-50 p-3 rounded-full mb-4 animate-bounce">
            <FiCheckCircle size={52} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Payment Successful!
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Thank you for your purchase. Your order has been placed.
          </p>
        </div>

        {/* Order and Transaction Summary */}
        <div className="py-6 space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Transaction Details
          </h2>

          {paymentData?.orders && paymentData.orders.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-2">
                  <FiActivity size={16} /> Transaction ID
                </span>
                <span className="font-mono font-bold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 text-xs">
                  {paymentData.orders[0].txnId}{" "}
                  {/* ✅ Mapping txnId from the 1st object of the array */}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-2">
                  <FiCalendar size={16} /> Payment Date
                </span>
                <span className="font-semibold text-slate-700">
                  {paymentData.orders[0].createdAt}{" "}
                  {/* ✅ Mapping 'createdAt' from database */}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-700 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                  {paymentData.orders[0].paymentLabel || "Stripe Secure Card"}{" "}
                  {/* ✅ Mapping 'paymentLabel' from database */}
                </span>
              </div>

              <div className="border-t border-slate-200/60 pt-3 flex justify-between items-center text-base font-bold">
                <span className="text-slate-800">Amount Paid</span>
                <span className="text-blue-600 text-lg">
                  ৳
                  {paymentData.amount ||
                    paymentData.orders.reduce(
                      (sum, item) => sum + Number(item.price),
                      0,
                    )}{" "}
                  {/* ✅ Total amount calculation */}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Purchased Items List */}
        <div className="pb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Items Purchased
          </h3>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {paymentData?.orders?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 text-xs"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <p className="font-semibold text-slate-800 truncate">
                    {item.productTitle}
                  </p>
                  <p className="text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-700">৳{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href={`/my-orders`}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold text-sm py-3 px-4 rounded-xl hover:bg-slate-800 transition shadow-md"
          >
            <FiShoppingBag size={16} /> Go to My Orders
          </Link>
          <Link
            href="/sellerProduct"
            className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-slate-200 transition"
          >
            Continue Shopping <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
}
