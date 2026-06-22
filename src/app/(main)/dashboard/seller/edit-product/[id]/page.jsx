"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleProduct } from "@/lib/api/getSingleProduct";
import { updateProduct } from "@/lib/api/updateProduct";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getSingleProduct(id);

        setFormData({
          title: product?.title || "",
          description: product?.description || "",
          category: product?.category || "",
          condition: product?.condition || "",
          price: product?.price || "",
          stock: product?.stock || "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const result = await updateProduct(id, formData);

      if (result.modifiedCount > 0) {
        toast.success("Product updated successfully");

        router.push("/dashboard/seller/my-products");
      } else {
        toast.success("No changes detected");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Edit Product
        </h1>

        <p className="mb-8 text-slate-500">
          Update your product information
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Condition
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Used">Used</option>
                <option value="Like New">Like New</option>
                <option value="Refurbished">
                  Refurbished
                </option>
              </select>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}