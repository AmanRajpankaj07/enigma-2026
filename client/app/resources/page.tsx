import { ShieldCheck } from "lucide-react";
import { resources } from "@/app/data/resources";
import ResourceCard from "@/app/components/resources/ResourceCard";

const Resources = () => {
  const totalUnits = resources.reduce((sum, r) => sum + r.totalUnits, 0);
  const totalDeployed = resources.reduce((sum, r) => sum + r.deployed, 0);
  const overallPercent = Math.round((totalDeployed / totalUnits) * 100);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <ShieldCheck className="text-emerald-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Resource Command Center
          </h1>
        </div>
        <p className="text-sm text-slate-400 ml-[52px]">
          {totalUnits} total resources &middot;{" "}
          <span className="text-emerald-400 font-semibold">{overallPercent}%</span>{" "}
          deployed across all units
        </p>
      </div>

      {/* Card Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;
