"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="text-center py-28 px-6 bg-slate-950">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold leading-tight text-white"
      >
        AI-Powered Disaster <br />
        <span className="text-cyan-400">Coordination Platform</span>
      </motion.h2>

      <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
        Real-time emergency response system that intelligently prioritizes
        incidents and coordinates agencies efficiently.
      </p>

      <div className="mt-8 flex justify-center gap-6">
        <Link
          href="/incident"
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          Report Incident <ArrowRight size={18} />
        </Link>

        <a
          href="#features"
          className="border border-slate-700 px-6 py-3 rounded-xl hover:border-cyan-400"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}