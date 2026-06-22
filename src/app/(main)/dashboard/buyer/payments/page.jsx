"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const session = await authClient.getSession();

        const email = session?.data?.user?.email;

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-history/${email}`
        );

        const data = await res.json();

        setPayments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-slate-500">
          Displays all payment records of the buyer
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {payment.txnId || "N/A"}
                  </td>

                  <td className="p-4">
                    ৳{payment.price}
                  </td>

                  <td className="p-4 capitalize">
                    {payment.paymentMethod}
                  </td>

                  <td className="p-4">
                    {payment.createdAt}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : payment.status === "accepted"
                          ? "bg-blue-100 text-blue-700"
                          : payment.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No payment history found
          </div>
        )}
      </div>
    </div>
  );
}