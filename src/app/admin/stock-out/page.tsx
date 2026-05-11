"use client";

import { useState } from "react";
import { Search, ShoppingCart, Calendar, ArrowUpRight } from "lucide-react";

const initialStockOut = [
  { id: 1, product: "Banarasi Silk Saree", quantity: 5, orderId: "ORD-1001", customer: "Radha Boutique", date: "2026-05-11" },
  { id: 2, product: "Cotton Printed Kurti", quantity: 12, orderId: "ORD-1002", customer: "Fashion Hub", date: "2026-05-11" },
];

export default function StockOutPage() {
  const [stockHistory, setStockHistory] = useState(initialStockOut);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stock OUT (Orders)</h1>
        <p className="text-zinc-500">Track stock deductions triggered by customer orders.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between dark:border-zinc-800">
          <h3 className="font-bold text-lg">Order Deduction History</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {stockHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-50 text-red-600 rounded dark:bg-red-900/20">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{entry.product}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-red-600">-{entry.quantity}</td>
                  <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400 underline cursor-pointer">{entry.orderId}</td>
                  <td className="px-6 py-4 text-zinc-500">{entry.customer}</td>
                  <td className="px-6 py-4 text-zinc-400">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
