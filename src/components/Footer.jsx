import Image from "next/image";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          
          {/* Brand  */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="h-12 w-44 md:w-48 mb-5">
              <Link href="/" className="relative block h-full w-full">
                <Image
                  src="/TradeNest-Logo.png"
                  alt="TradeNest Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 192px"
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
            </div>

            <p className="max-w-md text-slate-400">
              Buy Smart. Sell Easy. Save More. TradeNest helps buyers and
              sellers connect through a trusted second-hand marketplace.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-lg border border-slate-800 p-3 hover:border-blue-500 hover:text-blue-500"
              >
                <FiFacebook size={20} />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-800 p-3 hover:border-blue-500 hover:text-blue-500"
              >
                <FiTwitter size={20} />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-800 p-3 hover:border-blue-500 hover:text-blue-500"
              >
                <FiInstagram size={20} />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-800 p-3 hover:border-blue-500 hover:text-blue-500"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Middle Links Container */}
          <div className="grid grid-cols-3 gap-4 lg:col-span-3 md:col-span-2">
            
            {/* Quick Links */}
            <div>
              <h3 className="mb-5 text-sm md:text-lg font-semibold text-white">
                Quick Links
              </h3>
              <div className="space-y-3 text-xs md:text-base">
                <Link href="/" className="block">Home</Link>
                <Link href="/products" className="block">
                  Products
                </Link>
                <Link href="/categories" className="block">
                  Categories
                </Link>
                <Link href="/about" className="block">
                  About Us
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-5 text-sm md:text-lg font-semibold text-white">
                Categories
              </h3>
              <div className="space-y-3 text-xs md:text-base">
                <p>Electronics</p>
                <p>Furniture</p>
                <p>Vehicles</p>
                <p>Fashion</p>
                <p>Mobiles</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-5 text-sm md:text-lg font-semibold text-white">
                Contact
              </h3>
              <div className="space-y-3 text-xs md:text-base break-all">
                <p>mdnayemswe@gmail.com</p>
                <p>+880 1767148518</p>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Privacy Policy (আগের মতোই থাকবে) */}
        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 TradeNest. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}