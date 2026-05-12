"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, Star, ArrowRight, Lock, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load auth state
  useEffect(() => {
    const auth = localStorage.getItem("shop_auth");
    if (auth) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("shop_auth", "true");
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("shop_auth");
    setIsLoggedIn(false);
  };

  const updateQuantity = (id: number, delta: number, maxStock: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      
      if (next > maxStock) return { ...prev, [id]: maxStock };
      if (next < 0) return { ...prev, [id]: 0 };
      
      return { ...prev, [id]: next };
    });
  };

  const handleManualQuantity = (id: number, val: string, maxStock: number) => {
    const num = parseInt(val) || 0;
    if (num > maxStock) {
      setQuantities(prev => ({ ...prev, [id]: maxStock }));
    } else {
      setQuantities(prev => ({ ...prev, [id]: num }));
    }
  };

  const addToCart = (product: any) => {
    const qty = quantities[product.id] || 0;
    if (qty <= 0) return;

    const cart = JSON.parse(localStorage.getItem("shop_cart") || "[]");
    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        ...product,
        quantity: qty
      });
    }

    localStorage.setItem("shop_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${qty} ${product.unit} of ${product.name} added to order!`);
    
    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
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
            {!isLoggedIn ? (
              <button 
                onClick={() => window.location.href = "/login"}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1"
              >
                Login to Order <Lock className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-3 bg-zinc-800 text-white rounded-full font-bold hover:bg-red-600 transition-all transform hover:-translate-y-1"
              >
                Logout Account
              </button>
            )}
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
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => !isLoggedIn && (window.location.href = "/login")}
            className={cn(
              "group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-2xl transition-all duration-500 dark:bg-zinc-900 dark:border-zinc-800 perspective-1000",
              !isLoggedIn && "cursor-pointer"
            )}
          >
            <div className="relative h-48 bg-zinc-100 overflow-hidden dark:bg-zinc-800">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {product.stock < 20 && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase z-10">
                  Low Stock
                </div>
              )}

              {/* Login Overlay */}
              {!isLoggedIn && (
                <div 
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 text-center"
                >
                  <Lock className="w-8 h-8 text-white mb-2" />
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-4">Login to View Details</p>
                  <button 
                    className="px-4 py-2 bg-orange-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter hover:bg-orange-700 transition-colors"
                  >
                    Login Now
                  </button>
                </div>
              )}
            </div>
            
            <div className={cn(
              "p-4 space-y-3 transition-all duration-500",
              !isLoggedIn && "blur-md pointer-events-none select-none grayscale opacity-40"
            )}>
              <div>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-zinc-900 line-clamp-1 dark:text-white">{product.name}</h3>
                <p className="text-xs text-zinc-500">{product.unit} Unit</p>
              </div>

          

              {/* Quantity Selector & Add Button */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-1 dark:bg-zinc-800">
                  <button 
                    onClick={() => updateQuantity(product.id, -1, product.stock)}
                    className="p-1 text-zinc-500 hover:bg-white rounded-md transition-colors dark:hover:bg-zinc-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number"
                    value={quantities[product.id] || 0}
                    onChange={(e) => handleManualQuantity(product.id, e.target.value, product.stock)}
                    className="bg-transparent font-bold text-sm w-12 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button 
                    onClick={() => updateQuantity(product.id, 1, product.stock)}
                    className="p-1 text-zinc-500 hover:bg-white rounded-md transition-colors dark:hover:bg-zinc-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card redirect
                    addToCart(product);
                  }}
                  className={cn(
                    "w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all",
                    (quantities[product.id] || 0) > 0
                      ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-500/20 active:scale-95"
                      : "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
                  )}
                  disabled={!(quantities[product.id] > 0)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add To Order
                </button>
              </div>
            </div>

            {/* Hidden Message for Non-Logged In */}
            {!isLoggedIn && (
              <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                <div className="flex items-center justify-center gap-2 text-zinc-400">
                  <EyeOff className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Details Hidden</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
