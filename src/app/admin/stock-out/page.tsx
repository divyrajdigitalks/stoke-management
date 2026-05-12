"use client";

import { useState } from "react";
import { Search, ShoppingCart, Calendar, ArrowUpRight, Hash, User, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const initialStockOut = [
  { id: 1, product: "Banarasi Silk Saree", sku: "SAR-001", quantity: 5, orderId: "ORD-2026-001", customer: "Radha Boutique", date: "2026-05-11" },
  { id: 2, product: "Cotton Printed Kurti", sku: "KUR-002", quantity: 12, orderId: "ORD-2026-002", customer: "Fashion Hub", date: "2026-05-11" },
];

export default function StockOutPage() {
  const [stockHistory, setStockHistory] = useState(initialStockOut);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Stock OUT (Orders)</h1>
          <p className="text-zinc-500">Track stock deductions triggered by customer wholesale orders.</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 shadow-xl shadow-zinc-500/5">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg uppercase tracking-tight">Order Deduction History</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Client..." 
              className="pl-9 pr-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all w-full sm:w-64" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-zinc-400 font-black uppercase tracking-widest bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-5">Product Details</th>
                <th className="px-6 py-5 text-center">Qty Out</th>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Client / Boutique</th>
                <th className="px-6 py-5 text-right">Dispatch Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {stockHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center dark:bg-zinc-800">
                        <Package className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">{entry.product}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-mono">{entry.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center font-black text-red-600 text-base">-{entry.quantity}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-[10px] font-black dark:bg-zinc-800 dark:text-zinc-300 uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                      {entry.orderId}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-zinc-300" />
                      <span className="font-bold text-zinc-600 dark:text-zinc-400">{entry.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right text-zinc-400 font-medium">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
