"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-slate-950 px-6 py-20 lg:px-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-left space-y-8">
          {/* Pulsing Badge */}
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 w-fit px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
              Active Nationwide Deployment
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tight"
          >
            One Live Command <br />
            Screen for{" "}
            <span className="text-cyan-400">
              Every <br /> Incident
            </span>
          </motion.h1>

          <p className="text-slate-400 max-w-lg text-lg leading-relaxed">
            Unifies NDRF, Police, Health, and NGOs on a single live map so no
            rescue boat or ambulance ever sits idle while people are stranded.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/launch"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <ArrowRight size={20} />
              Launch Live Incidents
            </Link>
          </div>

          {/* Bottom Tags */}
          <div className="flex gap-3 pt-8">
            {["Built for Ops", "Multi-Agency", "Real-time"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-widest bg-slate-900 border border-slate-800 text-slate-500 px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Content (Visual Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Glassmorphism Mockup Box */}
          <div className="aspect-video bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <div className="h-4 w-32 bg-slate-800 rounded mx-auto" />
            </div>
            <div className="p-8 space-y-4">
              <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="h-20 bg-slate-800/50 rounded-lg border border-slate-700/50" />
                <div className="h-20 bg-slate-800/50 rounded-lg border border-slate-700/50" />
                <div className="h-20 bg-slate-800/50 rounded-lg border border-slate-700/50" />
              </div>
            </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-cyan-500/5 blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
