"use client";

import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">

        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 drop-shadow-sm">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-800">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 leading-relaxed">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            <FiHome size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-300 hover:scale-105"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Bottom Text */}
        <p className="mt-10 text-sm text-slate-400">
          © {new Date().getFullYear()} TradeNest • Your Marketplace
        </p>
      </div>
    </div>
  );
}