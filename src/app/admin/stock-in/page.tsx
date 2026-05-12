"use client";

import { useState } from "react";
import { Plus, Search, Calendar, Package, User, Hash, Save, IndianRupee, Tag, History, List } from "lucide-react";
import { Modal } from "@/components/Modal";
import { cn } from "@/lib/utils";

const initialProducts = [
  { id: 1, name: "Banarasi Silk Saree", sku: "SAR-001", category: "Saree", price: 5500, wholesale: 4200, stock: 25, unit: "PCS", asOfDate: "2026-05-10" },
  { id: 2, name: "Cotton Printed Kurti", sku: "KUR-002", category: "Kurti", price: 1200, wholesale: 850, stock: 150, unit: "PCS", asOfDate: "2026-05-11" },
  { id: 3, name: "Bridal Wear Lehenga", sku: "LHG-005", category: "Lehenga", price: 15000, wholesale: 11500, stock: 10, unit: "SET", asOfDate: "2026-05-12" },
];

const initialStockHistory = [
  { id: 1, product: "Banarasi Silk Saree", sku: "SAR-001", quantity: 20, bill: "PUR-2026-001", supplier: "Agro World", date: "2026-05-10" },
  { id: 2, product: "Designer Cotton Kurti", sku: "KUR-002", quantity: 50, bill: "PUR-2026-005", supplier: "Global Oils", date: "2026-05-09" },
];

export default function StockInPage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "history">("inventory");
  const [products, setProducts] = useState(initialProducts);
  const [stockHistory, setStockHistory] = useState(initialStockHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    product: "",
    sku: "",
    quantity: "",
    bill: "",
    supplier: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Saree",
    price: "",
    wholesale: "",
    stock: "",
    unit: "PCS",
    asOfDate: new Date().toISOString().split('T')[0]
  });

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      id: stockHistory.length + 1,
      product: newEntry.product,
      sku: newEntry.sku,
      quantity: Number(newEntry.quantity),
      bill: newEntry.bill || "N/A",
      supplier: newEntry.supplier || "N/A",
      date: newEntry.date
    };

    setStockHistory([entry, ...stockHistory]);
    
    // Also update main inventory
    setProducts(prev => prev.map(p => {
      if (p.sku === newEntry.sku) {
        return { ...p, stock: p.stock + Number(newEntry.quantity), asOfDate: newEntry.date };
      }
      return p;
    }));

    setNewEntry({ product: "", sku: "", quantity: "", bill: "", supplier: "", date: new Date().toISOString().split('T')[0] });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([...products, { 
      ...newProduct, 
      id: products.length + 1, 
      price: Number(newProduct.price), 
      wholesale: Number(newProduct.wholesale), 
      stock: Number(newProduct.stock) 
    }]);
    setIsModalOpen(false);
    setNewProduct({ name: "", sku: "", category: "Saree", price: "", wholesale: "", stock: "", unit: "PCS", asOfDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Stock IN & Inventory</h1>
          <p className="text-zinc-500">Manage your product list and purchase entries here.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Product
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("inventory")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === "inventory" ? "bg-white text-orange-600 shadow-sm dark:bg-zinc-700" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          )}
        >
          <List className="w-4 h-4" />
          Current Inventory
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === "history" ? "bg-white text-orange-600 shadow-sm dark:bg-zinc-700" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          )}
        >
          <History className="w-4 h-4" />
          Purchase History
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-6 dark:bg-zinc-900 dark:border-zinc-800 h-fit shadow-xl shadow-zinc-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Quick Stock Entry</h3>
          </div>
          
          <form onSubmit={handleUpdateStock} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Product</label>
                <select 
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20"
                  value={newEntry.product}
                  onChange={(e) => {
                    const prod = products.find(p => p.name === e.target.value);
                    setNewEntry({...newEntry, product: e.target.value, sku: prod?.sku || ""});
                  }}
                  required
                >
                  <option value="">Select...</option>
                  {products.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Code (SKU)</label>
                <input 
                  type="text"
                  readOnly
                  className="w-full px-4 py-3.5 bg-zinc-100 border border-zinc-200 rounded-2xl text-sm font-bold text-zinc-500 dark:bg-zinc-800/50 dark:border-zinc-700"
                  value={newEntry.sku}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">New Quantity</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="number" 
                  placeholder="e.g. 100" 
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-orange-500/20"
                  value={newEntry.quantity}
                  onChange={(e) => setNewEntry({...newEntry, quantity: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Bill / Supplier</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Bill No." 
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none"
                  value={newEntry.bill}
                  onChange={(e) => setNewEntry({...newEntry, bill: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Supplier" 
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none"
                  value={newEntry.supplier}
                  onChange={(e) => setNewEntry({...newEntry, supplier: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Update Stock Level
            </button>
          </form>
        </div>

        {/* Right Column: Table */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-[32px] overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
          {activeTab === "inventory" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-zinc-400 font-black uppercase tracking-widest bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                  <tr>
                    <th className="px-6 py-5">Product Details</th>
                    <th className="px-6 py-5 text-right">Wholesale Rate</th>
                    <th className="px-6 py-5 text-center">Available Stock</th>
                    <th className="px-6 py-5 text-right">As of Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-zinc-900 dark:text-white">{p.name}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-mono">{p.sku} • {p.category}</p>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-orange-600">₹ {p.wholesale.toLocaleString()}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-black",
                          p.stock < 20 ? "bg-red-50 text-red-600 dark:bg-red-900/20" : "bg-green-50 text-green-600 dark:bg-green-900/20"
                        )}>
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-zinc-400 font-medium">{p.asOfDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-zinc-400 font-black uppercase tracking-widest bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                  <tr>
                    <th className="px-6 py-5">History Entry</th>
                    <th className="px-6 py-5 text-center">Quantity Added</th>
                    <th className="px-6 py-5">Bill / Supplier</th>
                    <th className="px-6 py-5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {stockHistory.map((h) => (
                    <tr key={h.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-zinc-900 dark:text-white">{h.product}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase font-mono">{h.sku}</p>
                      </td>
                      <td className="px-6 py-5 text-center font-black text-green-600">+{h.quantity}</td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-xs">{h.bill}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{h.supplier}</p>
                      </td>
                      <td className="px-6 py-5 text-right text-zinc-400 font-medium">{h.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Textile Product">
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Product Name</label>
              <input type="text" className="w-full px-4 py-3 bg-zinc-50 border rounded-2xl font-bold" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">SKU Code</label>
              <input type="text" className="w-full px-4 py-3 bg-zinc-50 border rounded-2xl font-mono font-bold" required value={newProduct.sku} onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Wholesale Price</label>
              <input type="number" className="w-full px-4 py-3 bg-zinc-50 border rounded-2xl font-bold" required value={newProduct.wholesale} onChange={(e) => setNewProduct({...newProduct, wholesale: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Initial Stock</label>
              <input type="number" className="w-full px-4 py-3 bg-zinc-50 border rounded-2xl font-bold" required value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Unit</label>
              <select className="w-full px-4 py-3 bg-zinc-50 border rounded-2xl font-bold appearance-none" value={newProduct.unit} onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}>
                <option>PCS</option>
                <option>SET</option>
                <option>BOX</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black shadow-lg">Save & Add to Inventory</button>
        </form>
      </Modal>
    </div>
  );
}
