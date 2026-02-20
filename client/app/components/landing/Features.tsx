import { Map, Brain, Activity, Shield, BarChart3 } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="py-20 px-8 bg-slate-900">
      <h3 className="text-4xl font-bold text-center mb-14 text-white">
        Powerful Features
      </h3>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Map className="text-cyan-400" size={40} />}
          title="Live Incident Map"
          desc="Real-time disaster tracking with severity heatmaps."
        />
        <FeatureCard
          icon={<Brain className="text-red-400" size={40} />}
          title="AI Priority Scoring"
          desc="Intelligent severity analysis using AI."
        />
        <FeatureCard
          icon={<Activity className="text-amber-400" size={40} />}
          title="Real-Time Coordination"
          desc="Multi-agency collaboration with live resource assignment."
        />
        <FeatureCard
          icon={<BarChart3 className="text-green-400" size={40} />}
          title="Analytics Dashboard"
          desc="Insightful charts for decision-makers."
        />
        <FeatureCard
          icon={<Shield className="text-purple-400" size={40} />}
          title="Secure Role-Based Access"
          desc="Admin, Agency & Citizen dashboards."
        />
      </div>
    </section>
  );
}