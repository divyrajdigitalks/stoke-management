"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Menu, User, Bell } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-zinc-200 lg:px-8 dark:bg-zinc-950 dark:border-zinc-800">
          <button
            className="p-2 lg:hidden text-zinc-600 hover:bg-zinc-100 rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold">Welcome, Admin</p>
                <p className="text-xs text-zinc-500">Managing Wholesale Inventory</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
