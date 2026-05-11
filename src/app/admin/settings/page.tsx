"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-zinc-500">Configure your textile wholesale platform preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Business Profile</h3>
              <p className="text-xs text-zinc-500">Update your wholesale business information.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase">Business Name</label>
              <input type="text" defaultValue="Elite Textiles Wholesale" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase">Support Email</label>
              <input type="email" defaultValue="wholesale@elitetextiles.com" className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Notifications</h3>
              <p className="text-xs text-zinc-500">Manage low stock and order alerts.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Low Stock Alerts</p>
                <p className="text-xs text-zinc-500">Get notified when textile stock falls below 10 units.</p>
              </div>
              <div className="w-10 h-5 bg-orange-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
              <div>
                <p className="text-sm font-bold">WhatsApp Notifications</p>
                <p className="text-xs text-zinc-500">Send order PDFs automatically to customers.</p>
              </div>
              <div className="w-10 h-5 bg-zinc-200 rounded-full relative cursor-pointer dark:bg-zinc-700">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => alert("Settings Saved!")}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
