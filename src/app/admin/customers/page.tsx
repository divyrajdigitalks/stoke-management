"use client";

import { useState } from "react";
import { Search, UserPlus, Mail, Phone, MapPin, MoreVertical } from "lucide-react";

const initialCustomers = [
  { id: 1, name: "Radha Boutique", owner: "Radha Sharma", mobile: "9876543210", address: "Surat, Gujarat", orders: 15, totalSpent: 125000 },
  { id: 2, name: "Fashion Hub", owner: "Amit Patel", mobile: "9988776655", address: "Ahmedabad, Gujarat", orders: 8, totalSpent: 64000 },
  { id: 3, name: "Modern Saree Center", owner: "Priya Varma", mobile: "9122334455", address: "Mumbai, Maharashtra", orders: 22, totalSpent: 310000 },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wholesale Customers</h1>
          <p className="text-zinc-500">Manage your B2B textile clients and boutiques.</p>
        </div>
        <button 
          onClick={() => alert("Add Customer Modal will open here")}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <div className="flex items-center gap-4 p-4 bg-white border border-zinc-200 rounded-xl dark:bg-zinc-900 dark:border-zinc-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, owner or mobile..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer / Boutique</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold text-center">Orders</th>
                <th className="px-6 py-4 text-right">Total Business</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {initialCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{customer.name}</p>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                        <MapPin className="w-3 h-3" />
                        {customer.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{customer.owner}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <Phone className="w-3 h-3 text-orange-500" />
                      {customer.mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold dark:bg-blue-900/20 dark:text-blue-400">
                      {customer.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-zinc-900 dark:text-white">
                    ₹ {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-800">
                      <MoreVertical className="w-4 h-4 text-zinc-400" />
                    </button>
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
