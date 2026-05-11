"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Upload, Save } from "lucide-react";
import { Modal } from "@/components/Modal";

const initialCategories = [
  { id: 1, name: "Saree", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop", status: "Active", count: 450 },
  { id: 2, name: "Kurti", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&h=100&fit=crop", status: "Active", count: 320 },
  { id: 3, name: "Dress Materials", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=100&h=100&fit=crop", status: "Active", count: 180 },
  { id: 4, name: "Lehenga", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop", status: "Active", count: 95 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", status: "Active", image: "" });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const id = categories.length + 1;
    setCategories([...categories, { ...newCategory, id, count: 0 }]);
    setIsModalOpen(false);
    setNewCategory({ name: "", status: "Active", image: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Textile Categories</h1>
          <p className="text-zinc-500">Organize your wholesale textile collections.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-4 p-4 bg-white border border-zinc-200 rounded-2xl dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search categories (e.g. Saree, Kurti)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:bg-zinc-800 dark:border-zinc-700 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 dark:bg-zinc-800/50 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Image</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category Name</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">SKU Count</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-100 flex items-center justify-center border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 shadow-sm">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-zinc-900 dark:text-white text-base">{category.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-zinc-600 dark:text-zinc-400">
                    {category.count} Items
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      category.status === "Active" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}>
                      {category.status}
                    </span>
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

      {/* Add Category Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Textile Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-6">
          <div className="space-y-4">
            {/* Image Upload Placeholder */}
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold">Upload Category Image</p>
              <p className="text-xs text-zinc-500 mt-1 text-center">Recommended: Square image (1:1), Max 2MB <br /> (Saree, Kurti, Lehenga images)</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Category Name</label>
              <input 
                type="text" 
                placeholder="e.g. Designer Saree, Printed Kurti" 
                className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-medium"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Visibility Status</label>
              <select 
                className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none dark:bg-zinc-800 dark:border-zinc-700 transition-all font-medium appearance-none"
                value={newCategory.status}
                onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
              >
                <option value="Active">Active (Visible to Customers)</option>
                <option value="Inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3.5 px-6 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3.5 px-6 bg-orange-600 text-white rounded-2xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
