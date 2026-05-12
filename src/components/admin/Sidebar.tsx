"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Tag, 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  X,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Tag, label: "Categories", href: "/admin/categories" },
  { icon: Package, label: "Products", href: "/admin/products", subItems: [
    { icon: ArrowDownLeft, label: "Stock IN", href: "/admin/stock-in" },
    { icon: ArrowUpRight, label: "Stock OUT", href: "/admin/stock-out" },
  ]},
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-zinc-200 transition-transform duration-300 ease-in-out lg:translate-x-0 dark:bg-zinc-950 dark:border-zinc-800",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/admin" className="text-xl font-bold text-orange-600">
            STOCK<span className="text-zinc-900 dark:text-white">PRO</span>
          </Link>
          <button className="lg:hidden" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isSubItemActive = hasSubItems && item.subItems.some(sub => pathname === sub.href);
            const [isExpanded, setIsExpanded] = useState(isSubItemActive || pathname.startsWith(item.href));

            if (hasSubItems) {
              return (
                <div key={item.href} className="space-y-1">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      isActive || isSubItemActive
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" 
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 pl-4 border-l border-zinc-100 dark:border-zinc-800 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-xs font-medium rounded-lg transition-colors",
                            pathname === sub.href 
                              ? "text-orange-600 font-bold" 
                              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
                          )}
                        >
                          <sub.icon className="w-4 h-4" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
