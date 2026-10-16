"use client";

import Link from "next/link";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { fetchOrders } from "@/lib/dashboard";
import { formatDate } from "@/lib/text";
import { useApiResource } from "@/lib/useApiResource";

export default function OrdersPage() {
  const { data, loading, failed } = useApiResource(fetchOrders, []);
  const orders = [...(data ?? [])].reverse();

  return (
    <Panel title="My orders">
      {loading ? (
        <EmptyState message="Loading your orders…" />
      ) : failed ? (
        <EmptyState message="We couldn't load your orders. Please try again." />
      ) : orders.length === 0 ? (
        <EmptyState
          message="You're yet to complete an order."
          cta={
            <Link
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-white"
              href="/store"
            >
              Visit Eko Store
            </Link>
          }
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse font-['Lato'] text-[14px]">
            <thead>
              <tr className="bg-[#EFE7F4] text-left text-[13px] font-bold text-[#1F0A33]">
                <th className="rounded-l-[10px] px-4 py-3">Order</th>
                <th className="px-4 py-3">Placed</th>
                <th className="px-4 py-3">Paid on</th>
                <th className="rounded-r-[10px] px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="border-b border-[#efe9e0] text-[#4A4A4A]" key={order.id}>
                  <td className="px-4 py-3 font-bold text-[#1F0A33]">#{order.id}</td>
                  <td className="px-4 py-3">{formatDate(order.date_created)}</td>
                  <td className="px-4 py-3">{order.paid_on ? formatDate(order.paid_on) : "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[12px] font-bold ${
                        order.completed ? "bg-[#e7f5ec] text-[#247b53]" : "bg-[#fdf1e3] text-[#9a6a1c]"
                      }`}
                    >
                      {order.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
