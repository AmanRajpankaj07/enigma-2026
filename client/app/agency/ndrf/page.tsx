"use client";

import React from "react";
import { ArrowLeft, Shield, Anchor, Truck, HardHat, Info } from "lucide-react";
import Link from "next/link";

const ndrfResources = [
  { id: 1, name: "Inflatable Motor Boats", icon: Anchor },
  { id: 2, name: "Deep Sea Divers", icon: Shield },
  { id: 3, name: "Heavy Earthmovers (JCB/Cranes)", icon: Truck },
  { id: 4, name: "K9 Search & Rescue Teams", icon: Info },
  { id: 5, name: "CSSR (Collapsed Structure) Kits", icon: HardHat },
];

export default function NDRFAgency() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <header className="flex items-center gap-4">
            <Link
              href="/agency"
              className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:text-orange-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                NDRF <span className="text-orange-500">Resource Entry</span>
              </h1>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">
                Disaster Response Protocol v5.0
              </p>
            </div>
          </header>

          <form className="grid md:grid-cols-2 gap-6">
            {ndrfResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all"
              >
                <res.icon className="text-orange-500 mb-4" size={24} />
                <label className="block text-xs font-black uppercase text-slate-400 mb-3">
                  {res.name}
                </label>
                <input
                  type="number"
                  placeholder="Units Available"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-orange-500 outline-none"
                />
              </div>
            ))}
            <button className="md:col-span-2 w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(234,88,12,0.2)]">
              Update NDRF Inventory
            </button>
          </form>
        </div>
        <aside className="hidden lg:block bg-slate-900/20 border border-slate-800 rounded-3xl p-8 h-fit">
          <h3 className="text-orange-500 font-bold uppercase text-xs mb-4 tracking-widest">
            Deployment Guidelines
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed italic">
            "Saving Lives & Beyond. Ensure all water-rescue gear is pressure
            tested before logging."
          </p>
        </aside>
      </div>
    </div>
  );
}