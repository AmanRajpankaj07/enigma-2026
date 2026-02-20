"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Map,
  Activity,
  Brain,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">ResQNet</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-cyan-400">Features</a>
          <a href="#how" className="hover:text-cyan-400">How It Works</a>
          <a href="#impact" className="hover:text-cyan-400">Impact</a>
        </div>
        <Link
          href="/login"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
        >
          Launch Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center py-28 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          AI-Powered Disaster <br />
          <span className="text-cyan-400">Coordination Platform</span>
        </motion.h2>

        <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
          Real-time emergency response system that intelligently prioritizes
          incidents, coordinates agencies, and reduces disaster response time.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <Link
            href="/login"
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <a
            href="#features"
            className="border border-slate-700 px-6 py-3 rounded-xl hover:border-cyan-400"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8 bg-slate-900">
        <h3 className="text-4xl font-bold text-center mb-14">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Map className="text-cyan-400" size={40} />}
            title="Live Incident Map"
            desc="Real-time disaster tracking with severity heatmaps and instant updates."
          />
          <FeatureCard
            icon={<Brain className="text-red-400" size={40} />}
            title="AI Priority Scoring"
            desc="Intelligent severity analysis using AI to optimize response time."
          />
          <FeatureCard
            icon={<Activity className="text-amber-400" size={40} />}
            title="Real-Time Coordination"
            desc="Multi-agency collaboration with live resource assignment."
          />
          <FeatureCard
            icon={<BarChart3 className="text-green-400" size={40} />}
            title="Analytics Dashboard"
            desc="Insightful charts and performance metrics for decision-makers."
          />
          <FeatureCard
            icon={<Shield className="text-purple-400" size={40} />}
            title="Secure Role-Based Access"
            desc="Admin, Agency & Citizen dashboards with secure authentication."
          />
          <FeatureCard
            icon={<Brain className="text-pink-400" size={40} />}
            title="AI Situation Reports"
            desc="Auto-generated summaries and intelligent response suggestions."
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-8">
        <h3 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <Step
            number="01"
            title="Report Incident"
            desc="Citizens submit emergency reports with location details."
          />
          <Step
            number="02"
            title="AI Analyzes Severity"
            desc="System evaluates urgency and suggests optimal response strategy."
          />
          <Step
            number="03"
            title="Coordinated Response"
            desc="Agencies receive assignments in real time for rapid action."
          />
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-20 bg-slate-900 text-center px-6">
        <h3 className="text-4xl font-bold mb-6">
          Designed to Save Lives
        </h3>
        <p className="max-w-3xl mx-auto text-slate-400 text-lg">
          ResQNet empowers emergency teams with intelligent insights,
          improving coordination efficiency and reducing response delays
          during critical situations.
        </p>

        <div className="mt-12 flex justify-center gap-10 text-3xl font-bold">
          <div>
            <p className="text-cyan-400">40%</p>
            <span className="text-sm text-slate-400">
              Faster Response Time
            </span>
          </div>
          <div>
            <p className="text-red-400">AI</p>
            <span className="text-sm text-slate-400">
              Intelligent Prioritization
            </span>
          </div>
          <div>
            <p className="text-green-400">24/7</p>
            <span className="text-sm text-slate-400">
              Real-Time Monitoring
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Transform Disaster Response?
        </h3>
        <Link
          href="/login"
          className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl font-bold text-lg"
        >
          Launch ResQNet
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} RescueIQ — AI Disaster Coordination Platform
      </footer>
    </div>
  );
}

/* ---------------- Components ---------------- */

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl hover:scale-105 transition transform duration-300 shadow-lg">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: any) {
  return (
    <div>
      <div className="text-5xl font-bold text-cyan-400 mb-4">{number}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}