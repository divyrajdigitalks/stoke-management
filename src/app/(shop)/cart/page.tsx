"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, Truck, MapPin, Phone, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("shop_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Update cart in localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("shop_cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    }));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="h-96 flex items-center justify-center font-bold text-zinc-400">Loading Order...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Review Your Selection</h1>
          <p className="text-zinc-500 font-medium">Verify your items and transport details for wholesale ordering.</p>
        </div>
        <div className="flex items-center gap-4 bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/20">
          <ShoppingBag className="w-6 h-6 text-orange-600" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-600/60">Cart Value</p>
            <p className="font-black text-xl text-orange-600">₹ {total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="group bg-white border border-zinc-200 rounded-[32px] p-5 flex flex-col sm:flex-row gap-6 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-xl hover:shadow-zinc-500/5 transition-all duration-500">
              <div className="w-full sm:w-32 h-32 bg-zinc-100 rounded-2xl overflow-hidden shrink-0 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-1">{item.category}</p>
                    <h3 className="font-black text-xl text-zinc-900 dark:text-white">{item.name}</h3>
                    <p className="text-xs text-zinc-400 font-bold mt-1">Wholesale Rate: ₹ {item.price} / {item.unit}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-300 p-2 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 bg-zinc-50 rounded-2xl p-1.5 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-white text-zinc-500 rounded-xl shadow-sm transition-all dark:hover:bg-zinc-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-lg w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-white text-zinc-500 rounded-xl shadow-sm transition-all dark:hover:bg-zinc-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Price</p>
                    <p className="font-black text-2xl text-zinc-900 dark:text-white">₹ {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-24 bg-white border-2 border-dashed border-zinc-100 rounded-[40px] dark:bg-zinc-900 dark:border-zinc-800">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Your selection is empty</h3>
              <p className="text-zinc-500 mb-8 max-w-xs mx-auto">Browse our latest collection and add items to place a wholesale order.</p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 shadow-xl shadow-orange-500/20 transition-all active:scale-95"
              >
                Start Selecting Items
              </Link>
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-[40px] p-8 shadow-2xl shadow-zinc-500/5 dark:bg-zinc-900 dark:border-zinc-800 sticky top-24">
            <h3 className="text-2xl font-black mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 tracking-tight">Order Details</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-500 font-bold text-sm">
                <span>Subtotal ({cart.length} Products)</span>
                <span>₹ {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-bold text-sm">
                <span>GST (Wholesale)</span>
                <span>As per bill</span>
              </div>
              <div className="flex justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <span className="font-black text-lg">Payable Amount</span>
                <span className="font-black text-3xl text-orange-600">₹ {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Transport Details Form */}
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] ml-1">Dispatch Logistics</p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="Owner / Manager Name" className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="WhatsApp for Dispatch Details" className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all" />
                </div>
                <div className="relative">
                  <Truck className="absolute left-4 top-4 w-4 h-4 text-zinc-400" />
                  <textarea placeholder="Preferred Transport Name & City" className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold min-h-[100px] dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all resize-none" />
                </div>
              </div>
            </div>

            <button 
              className={cn(
                "w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
                cart.length > 0 
                  ? "bg-orange-600 text-white shadow-orange-500/30 hover:bg-orange-700" 
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800"
              )}
              disabled={cart.length === 0}
            >
              Confirm Selection
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Verified Wholesale Partner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
