"use client";

import { authClient } from "@/lib/auth-client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({
    children,
}) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const session = await authClient.getSession();


            console.log("SESSION =", session);

            setUser(session?.data?.user);
        };

        getSession();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Mobile Navbar */}
            <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
                <button
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                    className="text-slate-700"
                >
                    <FiMenu size={24} />
                </button>

                <h1 className="font-semibold">
                    Dashboard
                </h1>
            </header>

            <div className="flex">

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
            fixed top-0 left-0 z-50
            h-screen w-64 bg-white border-r
            transition-transform duration-300
            lg:static lg:translate-x-0
            ${sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        }
          `}
                >
                    <div className="flex items-center justify-between border-b p-4 lg:hidden">
                        <h2 className="font-semibold">
                            Menu
                        </h2>

                        <button
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        >
                            <FiX size={22} />
                        </button>
                    </div>

                    <div className="p-4">
                        <DashboardSidebar user={user} />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col">

                    {/* Desktop Navbar */}
                    <header className="hidden h-16 items-center border-b bg-white px-6 lg:flex">
                        <DashboardNavbar></DashboardNavbar>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-6">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}