"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div>
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <FiShoppingCart size={24} className="text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Your Shopping Cart</h1>
          </div>
          <span className="text-xs sm:text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 max-w-md mx-auto mt-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingCart size={28} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h2>
            <p className="text-sm text-slate-500 mb-6">Looks like you hasn't added anything to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* MAIN CART CONTENT Layout splits nicely on modern screens */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT SIDE: PRODUCTS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border border-slate-100 bg-white p-4 rounded-2xl hover:shadow-sm transition"
                >
                  {/* Product Image Wrapper */}
                  <div className="relative w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-50">
                    <Image
                      src={item.imageUrl}
                      fill
                      sizes="80px"
                      className="object-cover"
                      alt={item.title}
                    />
                  </div>

                  {/* Info Wrapper */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                      {item.title}
                    </h2>
                    <p className="text-blue-600 font-bold text-sm sm:text-base mt-0.5">
                      ৳{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg">
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="p-1.5 px-2 text-slate-600 hover:bg-slate-200 rounded-l-lg active:bg-slate-300 transition"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          className="p-1.5 px-2 text-slate-600 hover:bg-slate-200 rounded-r-lg active:bg-slate-300 transition"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition self-start sm:self-center"
                    aria-label="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}

              {/* Continue Shopping Action */}
              <button
                onClick={() => router.push("/products")}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition p-1"
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </button>
            </div>

            {/* RIGHT SIDE: SUMMARY CARD */}
            <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5 lg:p-6 lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-800 text-lg border-b border-slate-200 pb-3 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">৳{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Calculated next step</span>
                </div>
                <div className="border-t border-slate-200 my-2 pt-3 flex justify-between font-bold text-slate-800 text-base sm:text-lg">
                  <span>Total Amount</span>
                  <span className="text-blue-600">৳{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.99] transition shadow-md shadow-blue-100"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}