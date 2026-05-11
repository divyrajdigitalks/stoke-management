"use client";

import { useState } from "react";
import { Plus, Search, Calendar, Package, User, Hash, Save } from "lucide-react";

const initialStockIn = [
  { id: 1, product: "Banarasi Silk Saree", quantity: 20, bill: "PUR-2026-001", supplier: "Agro World", date: "2026-05-10" },
  { id: 2, product: "Designer Cotton Kurti", quantity: 50, bill: "PUR-2026-005", supplier: "Global Oils", date: "2026-05-09" },
];

export default function StockInPage() {
  const [stockHistory, setStockHistory] = useState(initialStockIn);
  const [newEntry, setNewEntry] = useState({
    product: "",
    quantity: "",
    bill: "",
    supplier: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.product || !newEntry.quantity) return;

    const entry = {
      id: stockHistory.length + 1,
      product: newEntry.product,
      quantity: Number(newEntry.quantity),
      bill: newEntry.bill || "N/A",
      supplier: newEntry.supplier || "N/A",
      date: newEntry.date
    };

    setStockHistory([entry, ...stockHistory]);
    setNewEntry({
      product: "",
      quantity: "",
      bill: "",
      supplier: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Stock IN (Purchase)</h1>
          <p className="text-zinc-500">Add new textile stock from your suppliers.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Add Form */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 dark:bg-zinc-900 dark:border-zinc-800 h-fit shadow-xl shadow-orange-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">New Purchase Entry</h3>
          </div>
          
          <form onSubmit={handleUpdateStock} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Select Product</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold appearance-none dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  value={newEntry.product}
                  onChange={(e) => setNewEntry({...newEntry, product: e.target.value})}
                  required
                >
                  <option value="">Choose a product...</option>
                  <option>Banarasi Silk Saree</option>
                  <option>Designer Cotton Kurti</option>
                  <option>Bridal Wear Lehenga</option>
                  <option>Embroidered Dress Material</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Quantity Received</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="number" 
                  placeholder="e.g. 50" 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  value={newEntry.quantity}
                  onChange={(e) => setNewEntry({...newEntry, quantity: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Purchase Bill No.</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="e.g. PUR-2026-XXX" 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  value={newEntry.bill}
                  onChange={(e) => setNewEntry({...newEntry, bill: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Supplier Details</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Surat Textile Mills" 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  value={newEntry.supplier}
                  onChange={(e) => setNewEntry({...newEntry, supplier: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 dark:bg-white dark:text-zinc-900"
            >
              <Save className="w-4 h-4" />
              Update Inventory
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-3xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 dark:border-zinc-800">
            <h3 className="font-black text-lg uppercase tracking-tight">Recent Purchase History</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Filter history..." 
                className="pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" 
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-zinc-400 font-black uppercase tracking-widest bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-5">Product Details</th>
                  <th className="px-6 py-5 text-center">Quantity</th>
                  <th className="px-6 py-5">Bill / Supplier</th>
                  <th className="px-6 py-5 text-right">Entry Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {stockHistory.map((entry) => (
                  <tr key={entry.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-5 font-bold text-zinc-900 dark:text-white">{entry.product}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black dark:bg-green-900/30 dark:text-green-400">
                        +{entry.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-xs">{entry.bill}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">{entry.supplier}</p>
                    </td>
                    <td className="px-6 py-5 text-right text-zinc-400 font-medium">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
