"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, Truck, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const initialCart = [
  { id: 1, name: "Premium Basmati Rice", price: 1200, quantity: 2, unit: "BOX", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop" },
  { id: 2, name: "Sunflower Oil 5L", price: 850, quantity: 5, unit: "PCS", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop" },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Your Order Cart</h1>
        <p className="text-zinc-500">{cart.length} Items Selected</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 dark:bg-zinc-900 dark:border-zinc-800">
              <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0 dark:bg-zinc-800">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-zinc-500">{item.unit} Unit Price: ₹ {item.price}</p>
                  </div>
                  <button className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors dark:hover:bg-red-900/20">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-zinc-50 rounded-lg p-1 dark:bg-zinc-800">
                    <button className="p-1.5 hover:bg-white rounded-md shadow-sm transition-colors dark:hover:bg-zinc-700">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button className="p-1.5 hover:bg-white rounded-md shadow-sm transition-colors dark:hover:bg-zinc-700">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-black text-xl text-orange-600">₹ {item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-zinc-200 rounded-3xl dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-zinc-500 mb-4">Your cart is empty</p>
              <Link href="/" className="text-orange-600 font-bold hover:underline">Continue Shopping</Link>
            </div>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>₹ {total}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Estimated Tax</span>
                <span>₹ 0.00</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-black text-2xl text-orange-600">₹ {total}</span>
              </div>
            </div>

            {/* Transport Details Form */}
            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold uppercase text-zinc-400 tracking-wider">Transport Details</p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm dark:bg-zinc-800 dark:border-zinc-700" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input type="text" placeholder="WhatsApp Number" className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm dark:bg-zinc-800 dark:border-zinc-700" />
                </div>
                <div className="relative">
                  <Truck className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <textarea placeholder="Transport Name & Details" className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm min-h-[80px] dark:bg-zinc-800 dark:border-zinc-700" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <textarea placeholder="Delivery Address" className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm min-h-[80px] dark:bg-zinc-800 dark:border-zinc-700" />
                </div>
              </div>
            </div>

            <button 
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              disabled={cart.length === 0}
            >
              Confirm Wholesale Order
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[10px] text-zinc-400 mt-4 uppercase font-bold tracking-widest">Secure Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
