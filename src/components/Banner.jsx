import Image from "next/image";
import React from "react";
import { FiPackage, FiShoppingBag, FiUser, FiUsers } from "react-icons/fi";

const BannerPage = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image - Mobile First */}
          <div className="order-1 lg:order-2">
            <Image
              src="/TradeNest-Banner-Image.png"
              alt="TradeNest Banner"
              width={650}
              height={550}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Trusted Marketplace Platform
            </span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Buy Smart,
              <br />
              Sell Easy.
              <br />
              <span className="text-[#3B82F6]">Save More.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto lg:mx-0">
              Join thousands of smart buyers and sellers on TradeNest and give
              your unused items a new life through a secure and trusted
              marketplace.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="cursor-pointer rounded-2xl bg-[#3B82F6] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1">
                Explore Products
              </button>

              <button className="cursor-pointer rounded-2xl border-2 border-[#3B82F6] px-6 py-3 font-semibold transition-all duration-300 hover:bg-[#3B82F6] hover:text-white hover:-translate-y-1">
                Become a Seller
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
              <FiUsers size={28} className="text-orange-500" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">10K+</h3>
              <p className="text-sm text-slate-500">Buyers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
              <FiUser size={28} className="text-blue-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">500+</h3>
              <p className="text-sm text-slate-500">Sellers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
              <FiPackage size={28} className="text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">25K+</h3>
              <p className="text-sm text-slate-500">Products</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
              <FiShoppingBag size={28} className="text-purple-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">50K+</h3>
              <p className="text-sm text-slate-500">Orders</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPage;
