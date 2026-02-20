"use client";

import React from "react";
import { ShieldCheck, Activity, Box, Database, TrendingUp, Zap } from "lucide-react";
import { resources } from "@/app/data/resources";
import ResourceCard from "@/app/components/resources/ResourceCard";

const Resources = () => {
  const totalUnits = resources.reduce((sum, r) => sum + r.totalUnits, 0);
  const totalDeployed = resources.reduce((sum, r) => sum + r.deployed, 0);
  const overallPercent = Math.round((totalDeployed / totalUnits) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: MAIN CONTENT (3 COLUMNS WIDE) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <ShieldCheck className="text-cyan-400" size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">
                  <Activity size={12} />
                  Logistics & Assets
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl uppercase">
                  Resource <span className="text-cyan-400">Command</span>
                </h1>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl items-center">
              <div className="flex items-center gap-2 px-3 border-r border-slate-800">
                <Box size={16} className="text-slate-500" />
                <span className="text-sm font-bold text-white">{totalUnits}</span>
                <span className="text-xs uppercase tracking-tighter text-slate-500">Total Units</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
                <span className="text-sm font-black text-cyan-400">{overallPercent}%</span>
                <span className="text-xs uppercase tracking-tighter text-slate-500">Deployed</span>
              </div>
            </div>
          </header>

          {/* Card Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SYSTEM SIDEBAR (1 COLUMN WIDE) */}
        <div className="hidden lg:block space-y-6">
          {/* Global Inventory Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-white pb-4 border-b border-slate-800">
              <Database size={18} className="text-cyan-500" />
              <h3 className="font-bold uppercase tracking-tighter text-sm">Asset Health</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase font-bold">Network Latency</span>
                <span className="text-[10px] font-mono text-emerald-400">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase font-bold">Sync Interval</span>
                <span className="text-[10px] font-mono text-cyan-400">Real-time</span>
              </div>
              <div className="pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase text-slate-300">Deployment Trend</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Resource request volume has increased by <span className="text-white">14%</span> in the last 6 hours due to Sector 4 alerts.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions / Alerts */}
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-cyan-500 fill-cyan-500" />
              <h4 className="text-xs font-black text-cyan-500 uppercase tracking-[0.2em]">Priority Action</h4>
            </div>
            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-[0.1em] rounded transition-all">
              Request Emergency Resupply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;