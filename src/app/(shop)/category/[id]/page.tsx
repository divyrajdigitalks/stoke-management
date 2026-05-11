"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;

  return (
    <div className="space-y-6">
      <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold capitalize">{categoryId} Products</h1>
        <p className="text-zinc-500">Browsing wholesale items in {categoryId}.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* We'll filter products here later */}
        <p className="col-span-full text-center py-20 text-zinc-400 border border-dashed rounded-3xl">
          Products for {categoryId} will appear here.
        </p>
      </div>
    </div>
  );
}
