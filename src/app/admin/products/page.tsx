"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter, ArrowUpDown, Package, Save, Upload, Hash, IndianRupee, Tag } from "lucide-react";
import { Modal } from "@/components/Modal";

const initialProducts = [
  { id: 1, name: "Banarasi Silk Saree", sku: "SAR-001", category: "Saree", price: 5500, wholesale: 4200, stock: 25, unit: "PCS" },
  { id: 2, name: "Cotton Printed Kurti", sku: "KUR-002", category: "Kurti", price: 1200, wholesale: 850, stock: 150, unit: "PCS" },
  { id: 3, name: "Bridal Wear Lehenga", sku: "LHG-005", category: "Lehenga", price: 15000, wholesale: 11500, stock: 10, unit: "SET" },
  { id: 4, name: "Embroidered Dress Material", sku: "DRM-010", category: "Dress Materials", price: 2500, wholesale: 1800, stock: 60, unit: "PCS" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Saree",
    price: "",
    wholesale: "",
    stock: "",
    unit: "PCS",
    description: ""
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = products.length + 1;
    setProducts([...products, { 
      ...newProduct, 
      id, 
      price: Number(newProduct.price), 
      wholesale: Number(newProduct.wholesale), 
      stock: Number(newProduct.stock) 
    }]);
    setIsModalOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      category: "Saree",
      price: "",
      wholesale: "",
      stock: "",
      unit: "PCS",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Product Inventory</h1>
          <p className="text-zinc-500">Manage your textile stock, wholesale rates, and details.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border border-zinc-200 rounded-2xl dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by product name, SKU or fabric..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:bg-zinc-800 dark:border-zinc-700 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 dark:bg-zinc-800/50 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Product</th>
                <th className="px-6 py-4 font-bold tracking-wider">SKU</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Retail</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right text-orange-600">Wholesale</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">Stock</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 shadow-sm">
                        <Package className="w-6 h-6 text-zinc-400" />
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-[10px] font-black dark:bg-zinc-800 dark:text-zinc-300 uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    ₹ {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-black text-orange-600 text-base">
                    ₹ {product.wholesale.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`font-black text-base ${product.stock < 10 ? 'text-red-600' : 'text-zinc-900 dark:text-white'}`}>
                        {product.stock}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{product.unit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Textile Product"
        className="max-w-3xl"
      >
        <form onSubmit={handleAddProduct} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Image & Basic Info */}
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group relative overflow-hidden">
                <Upload className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold">Product Image</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase font-black tracking-widest text-center">Best for Saree/Kurti displays</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Banarasi Silk Saree" 
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">SKU Code</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="SAR-001" 
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-mono font-bold"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select 
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold appearance-none"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="Saree">Saree</option>
                      <option value="Kurti">Kurti</option>
                      <option value="Lehenga">Lehenga</option>
                      <option value="Dress Materials">Dress Materials</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Stock */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Retail Price</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="number" 
                      placeholder="5500" 
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-orange-400 ml-1">Wholesale Price</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input 
                      type="number" 
                      placeholder="4200" 
                      className="w-full pl-11 pr-4 py-3.5 bg-orange-50/50 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-orange-900/10 dark:border-orange-900/30 transition-all font-bold text-orange-700 dark:text-orange-400"
                      value={newProduct.wholesale}
                      onChange={(e) => setNewProduct({...newProduct, wholesale: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Initial Stock</label>
                  <input 
                    type="number" 
                    placeholder="25" 
                    className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Unit</label>
                  <select 
                    className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-bold appearance-none"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  >
                    <option value="PCS">PCS (Pieces)</option>
                    <option value="SET">SET (Full Set)</option>
                    <option value="BOX">BOX (Wholesale Box)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Product Description</label>
                <textarea 
                  placeholder="Fabric details, work (embroidery, print), size chart, etc." 
                  className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-medium min-h-[120px] resize-none"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-4 px-6 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 px-6 bg-orange-600 text-white rounded-2xl font-bold text-sm hover:bg-orange-700 shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Add Textile to Inventory
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
