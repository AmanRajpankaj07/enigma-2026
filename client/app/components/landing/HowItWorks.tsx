import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-8 bg-slate-950">
      <h3 className="text-4xl font-bold text-center mb-14 text-white">
        How It Works
      </h3>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <StepCard
          number="01"
          title="Report Incident"
          desc="Citizens submit emergency reports with location details."
        />
        <StepCard
          number="02"
          title="AI Analyzes Severity"
          desc="System evaluates urgency and suggests response strategy."
        />
        <StepCard
          number="03"
          title="Coordinated Response"
          desc="Agencies receive assignments in real time."
        />
      </div>
    </section>
  );
}