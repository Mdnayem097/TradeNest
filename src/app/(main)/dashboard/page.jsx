"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const user = session?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role === "admin") {
      router.replace("/dashboard/admin");
    } else if (user.role === "seller") {
      router.replace("/dashboard/seller");
    } else {
      router.replace("/dashboard/buyer");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading Dashboard...</p>
    </div>
  );
}
