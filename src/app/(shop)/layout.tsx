"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("shop_cart") || "[]");
    const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-zinc-600"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="text-xl font-bold text-orange-600 tracking-tight">
              WHOLESALE<span className="text-zinc-900 dark:text-white">STORE</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm focus:ring-2 focus:ring-orange-500/20 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/cart" 
              className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full relative dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-full hover:bg-orange-700 transition-colors"
            >
              <User className="w-4 h-4" />
              Login
            </Link>
            <Link 
              href="/login" 
              className="sm:hidden p-2 text-zinc-600 dark:text-zinc-400"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Search - Only visible on small screens */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/50" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 z-[70] h-full w-72 bg-white dark:bg-zinc-900 p-6 shadow-xl transition-transform">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-orange-600">MENU</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <Link href="/" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/categories" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link href="/orders" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <Link href="/profile" className="block text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            </nav>
          </div>
        </>
      )}

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 mt-12 py-12 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">© 2026 Wholesale Stock Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
