"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle2, Clock, Truck, Plus, ShoppingCart, User, IndianRupee, Save } from "lucide-react";
import { Modal } from "@/components/Modal";

const initialOrders = [
  { id: "ORD-2026-001", customer: "Radha Boutique", items: 12, total: 45000, status: "Pending", date: "2026-05-11" },
  { id: "ORD-2026-002", customer: "Fashion Hub", items: 50, total: 120000, status: "Confirmed", date: "2026-05-10" },
  { id: "ORD-2026-003", customer: "Modern Saree Center", items: 5, total: 25000, status: "Delivered", date: "2026-05-09" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    items: "",
    total: "",
    status: "Pending"
  });

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ORD-2026-${String(orders.length + 1).padStart(3, '0')}`;
    const date = new Date().toISOString().split('T')[0];
    setOrders([{
      ...newOrder,
      id,
      date,
      items: Number(newOrder.items),
      total: Number(newOrder.total)
    }, ...orders]);
    setIsModalOpen(false);
    setNewOrder({
      customer: "",
      items: "",
      total: "",
      status: "Pending"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wholesale Orders</h1>
          <p className="text-zinc-500">Track and manage bulk textile orders from your clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Downloading all orders...")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all dark:bg-zinc-900 dark:border-zinc-800"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Order
          </button>
        </div>
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
              {orders.map((order) => (
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

      {/* Add Order Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Bulk Order"
        className="max-w-md"
      >
        <form onSubmit={handleAddOrder} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Customer Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Radha Boutique" 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Total Items</label>
                <div className="relative">
                  <ShoppingCart className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="number" 
                    placeholder="12" 
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                    value={newOrder.items}
                    onChange={(e) => setNewOrder({...newOrder, items: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Total Amount</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="number" 
                    placeholder="45000" 
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                    value={newOrder.total}
                    onChange={(e) => setNewOrder({...newOrder, total: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Order Status</label>
              <select 
                className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold appearance-none"
                value={newOrder.status}
                onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-4 px-6 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 px-6 bg-orange-600 text-white rounded-2xl font-bold text-sm hover:bg-orange-700 shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Create Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
