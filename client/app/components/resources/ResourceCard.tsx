import { MapPin, BatteryMedium, Crosshair, Navigation } from "lucide-react";
import type { Resource } from "@/app/data/resources";
import { cn } from "@/app/lib/utils";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const deploymentPercent = Math.round(
    (resource.deployed / resource.totalUnits) * 100
  );
  const isDeployed = resource.status === "in-transit";
  const Icon = resource.icon;

  return (
    <div
      className={cn(
        "group relative rounded-xl border-[3px] border-emerald-500/80",
        "bg-slate-900/60 backdrop-blur-xl",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-400"
      )}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Icon size={22} />
          </div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            {resource.name}
          </h3>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider",
            isDeployed
              ? "bg-amber-500/10 text-amber-400"
              : "bg-emerald-500/10 text-emerald-400"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isDeployed
                ? "bg-amber-400 animate-pulse"
                : "bg-emerald-400"
            )}
          />
          {isDeployed ? "In Transit" : "Standby"}
        </span>
      </div>

      {/* Middle Section — Dual State Numbers */}
      <div className="grid grid-cols-2 gap-4 px-4 py-4">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
            Total Units
          </p>
          <p className="mt-1 text-3xl font-bold text-white tabular-nums">
            {resource.totalUnits}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
            Deployed
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-400 tabular-nums">
            {resource.deployed}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
            Capacity
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 tabular-nums">
            {deploymentPercent}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${deploymentPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-700/50 px-4 py-3 mt-2">
        <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin size={12} />
          <span className="text-[11px] font-medium">{resource.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <BatteryMedium size={13} />
          <span className="text-[11px] font-semibold tabular-nums">
            {resource.fuelLevel}%
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <button
          className={cn(
            "w-full rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            isDeployed
              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {isDeployed ? (
              <>
                <Navigation size={13} /> Track Live GPS
              </>
            ) : (
              <>
                <Crosshair size={13} /> Assign to Incident
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
