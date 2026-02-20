"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
          <div className="w-4 h-4 border-2 border-slate-950 rotate-45" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
          ResQ<span className="text-cyan-400">Net</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {["Features", "How It Works", "Impact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Action Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="relative group px-6 py-2 overflow-hidden rounded-md border border-cyan-500/30 bg-slate-900 text-cyan-400 text-sm font-bold uppercase tracking-wider transition-all hover:text-slate-950"
        >
          {/* Hover Slide Effect */}
          <span className="absolute inset-0 w-0 bg-cyan-400 transition-all duration-300 ease-out group-hover:w-full" />

          <span className="relative z-10 flex items-center gap-2">
            Launch Dashboard
          </span>
        </Link>
      </div>
    </header>
  );
}
