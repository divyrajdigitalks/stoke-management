"use client";

import { useState } from "react";
import { BarChart3, Download, FileText, AlertCircle, TrendingUp, Package } from "lucide-react";

const reportTypes = [
  { title: "Sales Report", desc: "Summary of all sales, revenue, and order trends.", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  { title: "Stock Report", desc: "Current inventory levels, valuation, and turnover.", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Low Stock Alert", desc: "List of products that need immediate restocking.", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
  { title: "Product Report", desc: "Best performing products and categories.", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-100" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Business Reports</h1>
        <p className="text-zinc-500">Analyze your wholesale business performance and inventory.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <div key={report.title} className="p-6 bg-white border border-zinc-200 rounded-2xl flex items-start gap-4 hover:shadow-lg transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
            <div className={`${report.bg} ${report.color} p-4 rounded-xl shrink-0`}>
              <report.icon className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-bold text-lg">{report.title}</h3>
              <p className="text-sm text-zinc-500">{report.desc}</p>
              <div className="pt-4 flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">
                  <FileText className="w-3 h-3" />
                  View Online
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 text-zinc-700 text-xs font-bold rounded-lg hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <Download className="w-3 h-3" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white border border-zinc-200 rounded-2xl dark:bg-zinc-900 dark:border-zinc-800">
        <h3 className="font-bold text-xl mb-6">Sales Performance Chart</h3>
        <div className="h-64 flex items-end justify-between gap-2 pt-8">
          {[40, 70, 45, 90, 65, 80, 50, 85, 40, 75, 95, 60].map((height, i) => (
            <div key={i} className="flex-1 group relative">
              <div 
                className="w-full bg-orange-100 rounded-t-lg group-hover:bg-orange-500 transition-colors dark:bg-orange-900/20" 
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹ {(height * 1000).toLocaleString()}
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 text-center mt-2 font-bold uppercase">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
