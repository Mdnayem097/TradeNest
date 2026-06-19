"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [role, setRole] = useState("buyer");
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: username,
        email,
        image: imageUrl,
        password,
        role,
        plan: "free",
      });

      if (error) {
        toast.error(error.message || "Signup failed ❌");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">

        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/TradeNest-Logo.png"
            alt="TradeNest Logo"
            width={180}
            height={60}
            className="mx-auto"
          />

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-3 text-slate-500">
            Join TradeNest and start buying & selling.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>

            <div className="relative">
              {!username && (
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              )}

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className={`w-full rounded-xl border border-slate-300 py-3 ${
                  !username ? "pl-11" : "pl-4"
                } pr-4 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              {!email && (
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className={`w-full rounded-xl border border-slate-300 py-3 ${
                  !email ? "pl-11" : "pl-4"
                } pr-4 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100`}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Profile Image URL
            </label>

            <div className="relative">
              {!imageUrl && (
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              )}

              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className={`w-full rounded-xl border border-slate-300 py-3 ${
                  !imageUrl ? "pl-11" : "pl-4"
                } pr-4 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              {!password && (
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              )}

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={`w-full rounded-xl border border-slate-300 py-3 ${
                  !password ? "pl-11" : "pl-4"
                } pr-12 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              {!confirmPassword && (
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              )}

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className={`w-full rounded-xl border border-slate-300 py-3 ${
                  !confirmPassword ? "pl-11" : "pl-4"
                } pr-12 outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`py-3 rounded-xl border ${
                role === "buyer"
                  ? "bg-blue-50 border-[#3B82F6] text-[#3B82F6]"
                  : "border-slate-300"
              }`}
            >
              Buyer
            </button>

            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`py-3 rounded-xl border ${
                role === "seller"
                  ? "bg-blue-50 border-[#3B82F6] text-[#3B82F6]"
                  : "border-slate-300"
              }`}
            >
              Seller
            </button>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] py-3 font-semibold text-white"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Google */}
        <div className="mt-6">
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border py-3">
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3B82F6] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}