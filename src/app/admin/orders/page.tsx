"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle2, Clock, Truck } from "lucide-react";

const initialOrders = [
  { id: "ORD-2026-001", customer: "Radha Boutique", items: 12, total: 45000, status: "Pending", date: "2026-05-11" },
  { id: "ORD-2026-002", customer: "Fashion Hub", items: 50, total: 120000, status: "Confirmed", date: "2026-05-10" },
  { id: "ORD-2026-003", customer: "Modern Saree Center", items: 5, total: 25000, status: "Delivered", date: "2026-05-09" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wholesale Orders</h1>
          <p className="text-zinc-500">Track and manage bulk textile orders from your clients.</p>
        </div>
        <button 
          onClick={() => alert("Downloading all orders...")}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors dark:bg-zinc-900 dark:border-zinc-800"
        >
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-900 dark:border-zinc-800">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
            <Filter className="w-4 h-4" />
            Status
          </button>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold text-center">Items</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {initialOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-center">{order.items} Units</td>
                  <td className="px-6 py-4 text-right font-black">₹ {order.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === "Pending" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30" :
                      order.status === "Confirmed" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" :
                      "bg-green-100 text-green-700 dark:bg-green-900/30"
                    }`}>
                      {order.status === "Pending" && <Clock className="w-3 h-3" />}
                      {order.status === "Confirmed" && <Truck className="w-3 h-3" />}
                      {order.status === "Delivered" && <CheckCircle2 className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg dark:hover:bg-orange-900/20">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
