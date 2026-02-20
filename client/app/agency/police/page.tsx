"use client";

import React from "react";
import {
  ArrowLeft,
  Siren,
  Eye,
  Radio,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const policeResources = [
  { id: 1, name: "PCR Van Units", icon: Siren },
  { id: 2, name: "Surveillance Drones", icon: Eye },
  { id: 3, name: "Anti-Riot Squads", icon: ShieldCheck },
  { id: 4, name: "Checkpost Barriers", icon: UserCheck },
];

export default function PoliceAgency() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <header className="flex items-center gap-4">
            <Link
              href="/agency"
              className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:text-blue-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                POLICE <span className="text-blue-500">Tactical</span>
              </h1>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">
                Law Enforcement Grid v6.1
              </p>
            </div>
          </header>

          <form className="grid md:grid-cols-2 gap-6">
            {policeResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <res.icon className="text-blue-500 mb-4" size={24} />
                <label className="block text-xs font-black uppercase text-slate-400 mb-3">
                  {res.name}
                </label>
                <input
                  type="number"
                  placeholder="Units in Field"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            ))}
            <button className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              Sync Police Assets
            </button>
          </form>
        </div>
        <aside className="hidden lg:block bg-slate-900/50 border border-slate-800 rounded-3xl p-8 h-fit">
          <Radio className="text-blue-400 mb-4 animate-pulse" size={24} />
          <h3 className="text-white font-bold uppercase text-xs mb-2">
            Comms Status
          </h3>
          <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-tighter">
            Inter-agency radio frequencies must be maintained on 144.500MHz.
          </p>
        </aside>
      </div>
    </div>
  );
}