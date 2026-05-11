"use client";

import { 
  Package, 
  Tag, 
  ArrowDownLeft, 
  AlertTriangle, 
  ShoppingCart, 
  TrendingUp 
} from "lucide-react";

const stats = [
  { 
    label: "Total Products", 
    value: "1,234", 
    icon: Package, 
    color: "text-blue-600", 
    bg: "bg-blue-100" 
  },
  { 
    label: "Total Categories", 
    value: "45", 
    icon: Tag, 
    color: "text-purple-600", 
    bg: "bg-purple-100" 
  },
  { 
    label: "Current Stock", 
    value: "8,920", 
    icon: ArrowDownLeft, 
    color: "text-green-600", 
    bg: "bg-green-100" 
  },
  { 
    label: "Low Stock Alerts", 
    value: "12", 
    icon: AlertTriangle, 
    color: "text-orange-600", 
    bg: "bg-orange-100" 
  },
  { 
    label: "Total Orders", 
    value: "156", 
    icon: ShoppingCart, 
    color: "text-indigo-600", 
    bg: "bg-indigo-100" 
  },
  { 
    label: "Today Sales", 
    value: "₹ 24,500", 
    icon: TrendingUp, 
    color: "text-emerald-600", 
    bg: "bg-emerald-100" 
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Textile Inventory Dashboard</h1>
          <p className="text-zinc-500">Managing Sarees, Kurtis & Fashion Wholesale Stock.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Generating Report...")}
            className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors dark:bg-zinc-900 dark:border-zinc-800"
          >
            Export Data
          </button>
          <button 
            onClick={() => window.location.href = '/admin/products'}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20"
          >
            Add New Stock
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders Table Placeholder */}
        <div className="p-6 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-900 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center dark:bg-zinc-800">
                    <ShoppingCart className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <p className="font-medium">Order #ORD-{1000 + i}</p>
                    <p className="text-xs text-zinc-500">2 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹ 4,500</p>
                  <p className="text-xs text-orange-500 font-medium">Pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products Placeholder */}
        <div className="p-6 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-900 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-4">Low Stock Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center dark:bg-orange-900/20">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Banarasi Silk Saree</p>
                    <p className="text-xs text-zinc-500">Category: Saree</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">5 units left</p>
                  <button className="text-xs text-blue-600 hover:underline">Restock</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
