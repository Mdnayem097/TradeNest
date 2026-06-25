"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUser, FiCamera, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function ProfileUpdatePage() {
  // Better-Auth এর সেশন ডাটা নিয়ে আসা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // সেশন লোড হলে ইনপুট ফিল্ডে ডাটা সেট করা
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  // লগইন না থাকলে রিডাইরেক্ট
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("access-token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, image }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile in database");
      }

      // 💥 ২. মাস্টার ট্রিক: Better-Auth এর ইন্টারনাল সেশন ক্যাশ ম্যানুয়ালি আপডেট করা
      // এর ফলে আপনার Navbar এবং সম্পূর্ণ UI সাথে সাথে নতুন ডাটা পেয়ে যাবে
      if (session && session.user) {
        session.user.name = name;
        session.user.image = image;
      }

      setMessage({ 
        type: "success", 
        text: "Profile updated successfully! UI is updated in real-time." 
      });

      // অপশনাল: নেক্সট জেএস এর রাউটার রিফ্রেশ করা যাতে অন্য কম্পোনেন্ট সিঙ্ক হয়
      router.refresh();

    } catch (err) {
      console.error("Update Error:", err);
      setMessage({ type: "error", text: err.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Update Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your account settings</p>
        </div>

        {/* PROFILE IMAGE PREVIEW */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative h-24 w-24 rounded-full border-2 border-blue-100 bg-slate-100 overflow-hidden flex items-center justify-center shadow-inner">
            {image ? (
              <Image
                src={image}
                alt="Profile Preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <FiUser size={40} className="text-slate-400" />
            )}
          </div>
          <span className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <FiCamera /> Preview Image
          </span>
        </div>

        {/* NOTIFICATION MESSAGE */}
        {message.text && (
          <div
            className={`mb-6 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed outline-none"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Profile Image (Base64 or URL)
            </label>
            <textarea
              rows={3}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL or Base64 string here..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>

      </div>
    </div>
  );
}