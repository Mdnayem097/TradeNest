"use client";

import { useState } from "react";
import Image from "next/image";
import { FiUpload, FiPackage, FiDollarSign, FiBox } from "react-icons/fi";
import { imgUpload } from "@/lib/imgUpload";
import { AddProduct } from "@/lib/api/addProduct";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddProductPage() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    stock: "",
  });

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Vehicles",
    "Sports",
    "Books",
  ];

  const conditions = ["Used", "Like New", "Refurbished"];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const image = await imgUpload(imageFile);
      const imageUrl = image?.url;

      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrl,

        sellerEmail: user.email,
        sellerName: user.name,
        sellerId: user.id,

        createdAt: new Date(),
      };

      const result = await AddProduct(productData);

      if (result?.acknowledged) {
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative">
          <h1 className="text-3xl font-bold md:text-4xl">Add New Product</h1>

          <p className="mt-2 text-blue-100">
            Create and publish products to your TradeNest store.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">
            {/* Image Upload */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold">Product Image</h2>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50">
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="preview"
                      width={500}
                      height={300}
                      unoptimized
                      className="mb-4 h-56 w-full max-w-sm rounded-2xl object-cover"
                    />

                    <span className="font-medium text-green-600">
                      Image Selected
                    </span>

                    <span className="text-sm text-slate-500">
                      Click to change image
                    </span>
                  </>
                ) : (
                  <>
                    <FiUpload size={40} className="mb-3 text-slate-400" />

                    <span className="font-medium">Upload Product Image</span>

                    <span className="mt-1 text-sm text-slate-500">
                      PNG, JPG, WEBP
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Product Details */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-semibold">Product Details</h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Product Title
                  </label>

                  <div className="relative">
                    <FiPackage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      className="w-full rounded-2xl border px-4 py-3 pl-11 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    className="w-full rounded-2xl border p-4 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold">Category</h2>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category,
                      })
                    }
                    className={`rounded-2xl border p-4 text-sm font-medium transition ${
                      formData.category === category
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "hover:border-blue-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold">Condition</h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        condition,
                      })
                    }
                    className={`rounded-2xl border p-4 font-medium transition ${
                      formData.condition === condition
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "hover:border-blue-300"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <label className="mb-2 block font-medium">Price</label>

                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full rounded-2xl border px-4 py-3 pl-11 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <label className="mb-2 block font-medium">Stock Quantity</label>

                <div className="relative">
                  <FiBox className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Available stock"
                    className="w-full rounded-2xl border px-4 py-3 pl-11 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Preview */}
          <div>
            <div className="sticky top-6 rounded-3xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-semibold">Live Preview</h2>

              <div className="overflow-hidden rounded-2xl border">
                <div className="relative h-56 bg-slate-100">
                  {preview ? (
                    <div className="relative h-56 w-full">
                      <Image
                        src={preview}
                        alt="preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">
                    {formData.title || "Product Title"}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {formData.description ||
                      "Product description will appear here..."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.category && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">
                        {formData.category}
                      </span>
                    )}

                    {formData.condition && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                        {formData.condition}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-blue-600">
                      ৳ {formData.price || "0"}
                    </p>

                    <p className="text-sm text-slate-500">
                      Stock: {formData.stock || "0"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
