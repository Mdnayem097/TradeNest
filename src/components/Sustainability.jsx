"use client";

import {
  FiTrash2,
  FiRefreshCw,
  FiGlobe,
  FiWind,
} from "react-icons/fi";

const SustainabilityImpact = () => {
  const data = [
    {
      title: "Less Waste",
      desc: "Every reused product reduces landfill waste.",
      icon: <FiTrash2 size={22} />,
      color: "text-rose-600 bg-rose-50",
    },
    {
      title: "Circular Economy",
      desc: "Products get a second life instead of being discarded.",
      icon: <FiRefreshCw size={22} />,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Eco Friendly",
      desc: "Buying second-hand reduces carbon footprint.",
      icon: <FiWind size={22} />,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Global Impact",
      desc: "Together we build a sustainable future.",
      icon: <FiGlobe size={22} />,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
          Sustainability Impact
        </h2>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
          Buying and selling second-hand products helps reduce waste,
          save resources, and protect our planet 🌍
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-5">
          {data.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>

              {/* text */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT (PREMIUM CARD) */}
        <div className="relative">

          <div className="relative rounded-3xl p-10 bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-slate-200 shadow-xl overflow-hidden">

            {/* glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200 blur-3xl opacity-40 rounded-full"></div>

            <div className="text-6xl mb-6">🌍</div>

            <h3 className="text-2xl font-bold text-slate-900">
              Save the Planet
            </h3>

            <p className="text-slate-600 mt-3 leading-relaxed">
              Every reused product reduces CO₂ emissions and helps build a
              cleaner, greener future for everyone.
            </p>

            {/* stats */}
            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-white border border-slate-200 p-5 text-center shadow-sm hover:shadow-md transition">
                <h4 className="text-2xl font-bold text-emerald-600">
                  -40%
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Waste Reduced
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 text-center shadow-sm hover:shadow-md transition">
                <h4 className="text-2xl font-bold text-emerald-600">
                  +60%
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Reuse Rate
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SustainabilityImpact;