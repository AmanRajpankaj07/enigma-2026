"use client";

import React from "react";
import {
  ArrowLeft,
  Truck,
  Activity,
  Thermometer,
  BriefcaseMedical,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";

const medicalResources = [
  { id: 1, name: "ALS (Advanced Life Support)", icon: HeartPulse },
  { id: 2, name: "BLS (Basic Life Support)", icon: Truck },
  { id: 3, name: "Field Paramedic Teams", icon: Activity },
  { id: 4, name: "Ventilator Kits", icon: Thermometer },
  { id: 5, name: "Mobile ICU Units", icon: BriefcaseMedical },
];

export default function AmbulanceAgency() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <header className="flex items-center gap-4">
            <Link
              href="/agency"
              className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:text-emerald-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                MEDICAL <span className="text-blue-500">Command</span>
              </h1>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">
                Health Response Network v3.0
              </p>
            </div>
          </header>

          <form className="grid md:grid-cols-2 gap-6">
            {medicalResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all"
              >
                <res.icon className="text-emerald-500 mb-4" size={24} />
                <label className="block text-xs font-black uppercase text-slate-400 mb-3">
                  {res.name}
                </label>
                <input
                  type="number"
                  placeholder="Available Fleet"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
            ))}
            <button className="md:col-span-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Update Medical Fleet
            </button>
          </form>
        </div>
        <aside className="hidden lg:block bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 h-fit">
          <h3 className="text-emerald-500 font-bold uppercase text-xs mb-4 tracking-widest">
            Medical Protocol
          </h3>
          <ul className="text-[11px] text-slate-500 space-y-3 font-mono">
            <li>[OK] OXYGEN INVENTORY SYNCED</li>
            <li>[OK] PARAMEDIC ROTATION ACTIVE</li>
            <li>[!] CRITICAL BLOOD SUPPLY LOW</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}