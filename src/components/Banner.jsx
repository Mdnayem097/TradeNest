import Image from "next/image";
import React from "react";
import { FiPackage, FiShoppingBag, FiUser, FiUsers } from "react-icons/fi";

const BannerPage = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        
        {/* HERO */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
              🚀 Trusted Marketplace Platform
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Buy Smart,
              <br />
              Sell Easy.
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Save More.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of smart buyers and sellers on TradeNest and give your unused items a new life through a secure marketplace experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
                Explore Products
              </button>

              <button className="px-7 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                Become a Seller
              </button>
            </div>
          </div>

          {/* Image (TOP on mobile, RIGHT on desktop) */}
          <div className="relative flex items-center justify-center">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 blur-2xl rounded-full"></div>

            <Image
              src="/TradeNest-Banner-Image.png"
              alt="TradeNest Banner"
              width={800}
              height={650}
              priority
              className="relative w-full max-w-md lg:max-w-2xl h-auto object-contain drop-shadow-xl"
            />
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <FiUsers className="text-orange-500" size={26} />
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-slate-500">Buyers</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <FiUser className="text-blue-600" size={26} />
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-slate-500">Sellers</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <FiPackage className="text-green-600" size={26} />
              <div>
                <h3 className="text-2xl font-bold">25K+</h3>
                <p className="text-sm text-slate-500">Products</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <FiShoppingBag className="text-purple-600" size={26} />
              <div>
                <h3 className="text-2xl font-bold">50K+</h3>
                <p className="text-sm text-slate-500">Orders</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BannerPage;