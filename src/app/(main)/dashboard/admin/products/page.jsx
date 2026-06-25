"use client";

import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiAlertTriangle,
  FiSearch,
} from "react-icons/fi";
import Image from "next/image";
import axios from "axios";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved, reported
  const [loading, setLoading] = useState(true);

  //  (Read)
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access-token");
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error("Fetch Products Error:", err);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // (Approve / Reject)
  const handleUpdateStatus = async (productId, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status} this product?`,
    );
    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/products/${productId}`,
        {
          status: status, // 'approved' or 'rejected'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        alert(`Product successfully ${status}!`);
        fetchProducts();
      }
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update product status.");
    }
  };

  //  (Delete)
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product permanently from TradeNest?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        alert("Product deleted successfully.");
        fetchProducts();
      }
    } catch (err) {
      console.error("Delete Product Error:", err);
      alert("Failed to delete product.");
    }
  };

  // সার্চ এবং ফিল্টারিং লজিক
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.sellerEmail?.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "reported")
      return matchesSearch && product.isReported === true;
    return matchesSearch && product.status === filterStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Manage Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review, approve, reject, or remove product listings across the
            platform.
          </p>
        </div>

        {/* CONTROLS: SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or seller..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 shadow-sm transition"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm transition"
          >
            <option value="all">All Products</option>
            <option value="pending">⏳ Pending Review</option>
            <option value="approved">✅ Approved</option>
            <option value="rejected">❌ Rejected</option>
            <option value="reported">⚠️ Reported</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-6">Seller</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-slate-400 font-medium"
                  >
                    No products found under this criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    {/* Product Info with Image Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <div className="relative h-12 w-12 flex-shrink-0 bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                          <Image
                            src={product.imageUrl || "/placeholder-product.jpg"}
                            alt={product.title || "Product"}
                            fill
                            sizes="48px"
                            priority
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4
                            className="font-bold text-slate-800 truncate max-w-[180px]"
                            title={product.title}
                          >
                            {product.title}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase font-medium mt-1 inline-block">
                            {product.category || "General"}
                          </span>
                          {/* Reported Tag Indicator */}
                          {product.isReported && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold border border-rose-100 animate-pulse">
                              <FiAlertTriangle /> Reported
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Seller Info */}
                    <td
                      className="py-4 px-6 text-slate-500 max-w-[150px] truncate"
                      title={product.sellerEmail}
                    >
                      {product.sellerEmail || "Unknown"}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-bold text-slate-800">
                      ৳{product.price}
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          product.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : product.status === "rejected"
                              ? "bg-rose-50 text-rose-600 border-rose-100"
                              : "bg-amber-50 text-amber-700 border-amber-100" // pending review
                        }`}
                      >
                        {product.status || "pending"}
                      </span>
                    </td>

                    {/* Actions Controller Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Approve Button */}
                        {product.status !== "approved" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(product._id, "approved")
                            }
                            title="Approve Product Listing"
                            className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition cursor-pointer"
                          >
                            <FiCheckCircle size={14} />
                          </button>
                        )}

                        {/* Reject Button */}
                        {product.status !== "rejected" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(product._id, "rejected")
                            }
                            title="Reject/Disapprove Product"
                            className="p-2 bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                          >
                            <FiXCircle size={14} />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          title="Delete Listing Permanently"
                          className="p-2 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-100 transition cursor-pointer"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
