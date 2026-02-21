"use client";


import React from "react";
import {
  PlusCircle,
  List,
  ShieldAlert,
  Activity,
  Database,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  const cards = [
    {
      id: "create-incident",
      title: "Create Incident",
      description:
        "Initialize a new emergency response protocol and log live evidence.",
      icon: PlusCircle,
      color:
        "border-cyan-500/30 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-400",
      iconColor: "text-cyan-400",
      route: "/create-incident",
    },
    {
      id: "all-incidents",
      title: "View All Incidents",
      description:
        "Access the central database of active and resolved disaster reports.",
      icon: List,
      color:
        "border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700",
      iconColor: "text-slate-400",
      route: "/all-incidents",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: PRIMARY ACTIONS */}
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-[0.2em] text-xs">
              <Activity size={14} />
              Command Center
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Incident Management
            </h1>
            <p className="text-slate-500 max-w-lg">
              Select an operational module to begin. All actions are logged and
              synchronized across national disaster response agencies.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              const targetUrl = `${pathname}${card.route}`;

              return (
                <Link href={targetUrl} key={card.id} className="group">
                  <div
                    className={`h-full flex flex-col p-8 border rounded-2xl transition-all duration-300 shadow-2xl ${card.color}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center mb-6 border border-slate-800 group-hover:border-cyan-500/50 transition-colors ${card.iconColor}`}
                    >
                      <Icon size={28} />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8">
                      {card.description}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Execute Module
                      <span className="block w-4 h-[1px] bg-cyan-500"></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: TACTICAL INFORMATION */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-white pb-4 border-b border-slate-800">
              <ShieldAlert size={20} className="text-red-500" />
              <h3 className="font-bold uppercase tracking-tighter italic">
                Operational Guidelines
              </h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase">
                  Data Integrity
                </h4>
                <p className="text-[13px] text-slate-500 leading-snug">
                  Ensure all geographic coordinates are verified before
                  transmission. Live imagery is mandatory for Severity Level 3
                  incidents.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase">
                  Response Latency
                </h4>
                <p className="text-[13px] text-slate-500 leading-snug">
                  Typical agency response time is currently{" "}
                  <span className="text-cyan-400">4.2 minutes</span>. Direct
                  contact is initiated upon incident verification.
                </p>
              </div>
            </div>
          </div>

          {/* SYSTEM STATS WIDGET */}
          <div className="border border-slate-800 rounded-2xl p-6 bg-gradient-to-b from-slate-900/50 to-transparent">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Database size={12} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">
                    Sync Status
                  </span>
                </div>
                <div className="text-cyan-400 font-mono text-sm">ENCRYPTED</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Globe size={12} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">
                    Network
                  </span>
                </div>
                <div className="text-emerald-400 font-mono text-sm">ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
