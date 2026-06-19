"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiPackage,
  FiHeart,
  FiCreditCard,
  FiUser,
  FiPlusCircle,
  FiShoppingBag,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";

const DashboardSidebar = ({ user }) => {
  const pathname = usePathname();

  const dashboardItems = {
    buyer: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: FiGrid,
      },
      {
        title: "My Orders",
        path: "/dashboard/my-orders",
        icon: FiPackage,
      },
      {
        title: "Wishlist",
        path: "/dashboard/wishlist",
        icon: FiHeart,
      },
      {
        title: "Payment History",
        path: "/dashboard/payments",
        icon: FiCreditCard,
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: FiUser,
      },
    ],

    seller: [
      {
        title: "Dashboard Overview",
        path: "/dashboard",
        icon: FiGrid,
      },
      {
        title: "Display Cards",
        path: "/dashboard/display-cards",
        icon: FiGrid,
      },
      {
        title: "Add Product",
        path: "/dashboard/add-product",
        icon: FiPlusCircle,
      },
      {
        title: "My Products",
        path: "/dashboard/my-products",
        icon: FiShoppingBag,
      },
      {
        title: "Manage Orders",
        path: "/dashboard/manage-orders",
        icon: FiPackage,
      },
      {
        title: "Sales Analytics",
        path: "/dashboard/analytics",
        icon: FiBarChart2,
      },
    ],

    admin: [
      {
        title: "Dashboard Overview",
        path: "/dashboard",
        icon: FiGrid,
      },
      {
        title: "Manage Users",
        path: "/dashboard/users",
        icon: FiUsers,
      },
      {
        title: "Manage Products",
        path: "/dashboard/products",
        icon: FiShoppingBag,
      },
      {
        title: "Manage Orders",
        path: "/dashboard/orders",
        icon: FiPackage,
      },
      {
        title: "Platform Analytics",
        path: "/dashboard/platform-analytics",
        icon: FiBarChart2,
      },
    ],
  };

  const menuItems = dashboardItems[user?.role] || [];

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="pb-6 border-b">
        <Link href="/">
          <Image
            src="/TradeNest-Logo.png"
            alt="TradeNest Logo"
            width={120}
            height={40}
            priority
            className="h-auto w-auto"
          />
        </Link>

        <p className="mt-2 text-sm text-slate-500">Marketplace Dashboard</p>
      </div>

      {/* User Profile */}
      <div className="py-6 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={
              user?.image || "https://ui-avatars.com/api/?name=User&format=png"
            }
            alt="user"
            width={48}
            height={48}
          />

          <div>
            <h3 className="font-semibold text-slate-900">{user?.name}</h3>

            <span className="inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-medium capitalize text-blue-600">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <Icon size={18} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Card */}
      <div className="mt-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <h3 className="font-semibold">Welcome Back 👋</h3>

        <p className="mt-1 text-sm text-blue-100">
          Manage your account and track your activity from here.
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
