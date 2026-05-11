"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Fashion" },
  { id: "saree", name: "Sarees" },
  { id: "kurti", name: "Kurtis" },
  { id: "lehenga", name: "Lehengas" },
  { id: "dress", name: "Dress Materials" },
  { id: "dupatta", name: "Dupattas" },
];

const products = [
  { 
    id: 1, 
    name: "Banarasi Silk Saree", 
    category: "saree", 
    price: 4200, 
    stock: 25, 
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop"
  },
  { 
    id: 2, 
    name: "Designer Cotton Kurti", 
    category: "kurti", 
    price: 850, 
    stock: 150, 
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop"
  },
  { 
    id: 3, 
    name: "Bridal Wear Lehenga", 
    category: "lehenga", 
    price: 11500, 
    stock: 10, 
    unit: "SET",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop"
  },
  { 
    id: 4, 
    name: "Embroidered Material", 
    category: "dress", 
    price: 1800, 
    stock: 60, 
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop"
  },
  { 
    id: 5, 
    name: "Silk Chiffon Saree", 
    category: "saree", 
    price: 3500, 
    stock: 40, 
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1610189012906-407887309191?w=400&h=400&fit=crop"
  },
  { 
    id: 6, 
    name: "Rayon Regular Kurti", 
    category: "kurti", 
    price: 450, 
    stock: 200, 
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1609357940147-40c31393663c?w=400&h=400&fit=crop"
  },
];

export default function ShopHomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-zinc-900 flex items-center px-8 md:px-16">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1542044801-30d3e45ae49a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Textile Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full mb-4 uppercase tracking-widest">Premium Collection 2026</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Elite Textile <br />Wholesale Hub</h1>
          <p className="text-zinc-300 mb-6 text-lg">Direct from manufacturers. Best prices on Sarees, Kurtis, and Lehengas for your boutique.</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1">
              Explore All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Categories */}
      <div className="sticky top-16 z-40 py-4 bg-zinc-50/80 backdrop-blur-md -mx-4 px-4 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-zinc-950"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            layout
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-zinc-900 dark:border-zinc-800"
          >
            <div className="relative h-48 bg-zinc-100 overflow-hidden dark:bg-zinc-800">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.stock < 20 && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase">
                  Low Stock
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-zinc-900 line-clamp-1 dark:text-white">{product.name}</h3>
                <p className="text-xs text-zinc-500">{product.unit} Unit</p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-lg font-black text-zinc-900 dark:text-white">₹ {product.price}</p>
                  <p className="text-[10px] text-green-600 font-medium">Bulk Price Available</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-400">Stock</p>
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{product.stock}</p>
                </div>
              </div>

              {/* Quantity Selector & Add Button */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-1 dark:bg-zinc-800">
                  <button 
                    onClick={() => updateQuantity(product.id, -1)}
                    className="p-1 text-zinc-500 hover:bg-white rounded-md transition-colors dark:hover:bg-zinc-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm w-8 text-center">{quantities[product.id] || 0}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, 1)}
                    className="p-1 text-zinc-500 hover:bg-white rounded-md transition-colors dark:hover:bg-zinc-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  className={cn(
                    "w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all",
                    (quantities[product.id] || 0) > 0
                      ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-500/20"
                      : "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
                  )}
                  disabled={!(quantities[product.id] > 0)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add To Order
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
