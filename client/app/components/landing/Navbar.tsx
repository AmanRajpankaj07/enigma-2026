"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-slate-950">
      <h1 className="text-2xl font-bold text-cyan-400">ResQNet</h1>

      <nav className="hidden md:flex gap-6 text-slate-300">
        <a href="#features" className="hover:text-cyan-400">Features</a>
        <a href="#how" className="hover:text-cyan-400">How It Works</a>
        <a href="#impact" className="hover:text-cyan-400">Impact</a>
      </nav>

      <Link
        href="/login"
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
      >
        Launch Dashboard
      </Link>
    </header>
  );
}