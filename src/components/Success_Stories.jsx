import React from 'react';

export default function SuccessStories() {
  return (
    <section className="w-full px-4 py-8 md:py-12 flex justify-center">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-[#031c24] text-white shadow-xl">
        
        {/* Background Image Container */}
        <div 
          className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-cover bg-right bg-no-repeat opacity-30 md:opacity-100 pointer-events-none"
          style={{ 
            backgroundImage: "url('/TradeNest-Optinoal-Image.png')",
            maskImage: 'linear-gradient(to right, transparent, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%)'
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 md:p-14 md:w-3/4 lg:w-2/3">
          
          {/* Header */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
            Success Stories
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
            Discover how our buyers and sellers are thriving, connecting, and creating meaningful impact within our community.
          </p>

          {/* Mobile Divider (শুধু মোবাইলে দেখাবে) */}
          <hr className="border-slate-700 my-6 md:hidden" />

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 md:mt-10">
            
            {/* Stat 1 */}
            <div className="flex flex-col pr-4 sm:border-r border-slate-700/60 last:border-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                12K+
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400">
                Happy Buyers
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col pr-4 sm:border-r border-slate-700/60 last:border-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                25M+
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400">
                Successful Deals
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                5K+
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400">
                Verified Sellers
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}