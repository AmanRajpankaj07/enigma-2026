export default function Impact() {
  return (
    <section id="impact" className="py-20 bg-slate-900 text-center px-6">
      <h3 className="text-4xl font-bold mb-6 text-white">
        Designed to Save Lives
      </h3>

      <p className="max-w-3xl mx-auto text-slate-400 text-lg">
        ResQNet empowers emergency teams with intelligent insights,
        improving coordination efficiency during critical situations.
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
  );
}