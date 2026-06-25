"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiUserCheck,
  FiUserX,
  FiTrash2,
  FiShield,
  FiUser,
} from "react-icons/fi";
import axios from "axios";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেজ থেকে সব ইউজার ফেচ করা (Read)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access-token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);
      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ২. ইউজারের স্ট্যাটাস বা রোল আপডেট করা (Update Status / Block / Unblock)
  const handleUpdateStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const confirmAction = window.confirm(
      `Are you sure you want to ${newStatus} this user?`,
    );
    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        alert(`User successfully ${newStatus}!`);
        fetchUsers(); // ডাটা রিলোড করা
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      alert("Failed to update user status.");
    }
  };

  // ৩. ইউজারের রোল পরিবর্তন (User <-> Admin)
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirmAction = window.confirm(`Change role to ${newRole}?`);
    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        alert(`Role updated to ${newRole}!`);
        fetchUsers();
      }
    } catch (err) {
      console.error("Role Update Error:", err);
    }
  };

  // ৪. ইউজার ডিলিট করা (Delete)
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "CRITICAL: Are you sure you want to delete this account permanently?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.success) {
        alert("User account deleted permanently.");
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete User Error:", err);
      alert("Failed to delete user.");
    }
  };

  // ক্লায়েন্ট সাইড সার্চ ফিল্টারিং
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Manage Users
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor, authorize, block or remove users from the platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 shadow-sm transition"
          />
        </div>
      </div>

      {/* USERS TABLE LIST */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">User Info</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-12 text-slate-400 font-medium"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm uppercase">
                          {user.name ? user.name[0] : <FiUser />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {user.name || "N/A"}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase transition cursor-pointer ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-700 border border-purple-100"
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}
                      >
                        <FiShield size={12} /> {user.role || "user"}
                      </button>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                          user.status === "blocked"
                            ? "bg-red-50 text-red-600 border border-red-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    {/* Actions Button */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Block / Unblock Toggle Button */}
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              user._id,
                              user.status || "active",
                            )
                          }
                          title={
                            user.status === "blocked"
                              ? "Unblock User"
                              : "Block User"
                          }
                          className={`p-2 rounded-lg border transition cursor-pointer ${
                            user.status === "blocked"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                          }`}
                        >
                          {user.status === "blocked" ? (
                            <FiUserCheck size={14} />
                          ) : (
                            <FiUserX size={14} />
                          )}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          title="Delete Account Permanent"
                          className="p-2 bg-red-50 text-red-500 border border-red-100 rounded-lg hover:bg-red-100 transition cursor-pointer"
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
