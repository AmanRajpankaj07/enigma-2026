"use client";

import React from "react";
import {
  ArrowLeft,
  Flame,
  LifeBuoy,
  Wind,
  Zap,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const fireResources = [
  { id: 1, name: "Water Tenders / Engines", icon: Flame },
  { id: 2, name: "Aerial Ladder Platforms", icon: Zap },
  { id: 3, name: "Thermal Imaging Cameras", icon: Wind },
  { id: 4, name: "Hazmat Suit Kits", icon: LifeBuoy },
];

export default function FireAgency() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <header className="flex items-center gap-4">
            <Link
              href="/agency"
              className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:text-red-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                FIRE <span className="text-red-500">Dept. Assets</span>
              </h1>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">
                Fire Suppression Network v2.4
              </p>
            </div>
          </header>

          <form className="grid md:grid-cols-2 gap-6">
            {fireResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-red-500/50 transition-all"
              >
                <res.icon className="text-red-500 mb-4" size={24} />
                <label className="block text-xs font-black uppercase text-slate-400 mb-3">
                  {res.name}
                </label>
                <input
                  type="number"
                  placeholder="Active Units"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-red-500 outline-none"
                />
              </div>
            ))}
            <button className="md:col-span-2 w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              Add Fire Resources
            </button>
          </form>
        </div>
        <aside className="hidden lg:block bg-red-500/5 border border-red-500/10 rounded-3xl p-8 h-fit">
          <div className="flex items-center gap-2 mb-4 text-red-500">
            <AlertCircle size={18} />
            <h3 className="font-bold uppercase text-xs tracking-widest">
              Critical Alert
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            High-pressure pumps require verification every 24 hours during
            Active Deployment.
          </p>
        </aside>
      </div>
    </div>
  );
}