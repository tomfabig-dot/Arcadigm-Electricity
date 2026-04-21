import { Link } from "react-router-dom";
import { MapPin, Filter, Plus, ArrowRight, Store, Snowflake, Building2 } from "lucide-react";
import { sites, gbp, SiteType } from "../../lib/data";

export default function Sites() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-extrabold tracking-tight text-[44px] leading-none">
            Sites
          </h1>
          <p className="text-ink-muted mt-2 text-[14px]">
            Manage and monitor your entire estate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="btn-primary">
            <Plus className="w-3.5 h-3.5" /> New Site
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sites.map((s) => {
          const Icon = iconForType(s.type);
          return (
            <div key={s.id} className="card-interactive p-6">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-12 h-12 rounded-xl bg-bg-muted grid place-items-center shrink-0 text-ink-muted">
                  <Icon className="w-[22px] h-[22px]" strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start flex-wrap gap-x-3 gap-y-2">
                    <h3 className="font-display font-bold text-[19px] leading-tight tracking-tightish">
                      {s.name}
                    </h3>
                    <TypeBadge type={s.type} />
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="mt-1.5 text-[13px] text-ink-muted flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 mt-[3px] shrink-0" />
                    <span>{s.address}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 max-w-md gap-8">
                    <div>
                      <div className="micro-label">Consumption</div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="display-num text-[26px] text-ink">
                          {s.monthlyKwh.toLocaleString()}
                        </span>
                        <span className="text-[12px] text-ink-muted font-medium">kWh</span>
                      </div>
                    </div>
                    <div>
                      <div className="micro-label">Est. Annual</div>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="display-num text-[26px] text-ink">
                          {gbp(s.annualBill)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {s.status === "Input Data Fault" && (
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-danger">
                      <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                      12% above benchmark
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end justify-between gap-3 ml-auto self-stretch">
                  <TeamAvatars count={s.improvements + 1} />
                  <Link
                    to={`/portal/sites/${s.id}`}
                    className="text-[13px] font-semibold text-brand inline-flex items-center gap-1.5 hover:underline"
                  >
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function iconForType(type: SiteType) {
  if (type === "Cold Store") return Snowflake;
  if (type === "Retail") return Store;
  return Building2;
}

function TypeBadge({ type }: { type: SiteType }) {
  return (
    <span className="inline-flex items-center rounded-full bg-bg-muted px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-muted">
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Healthy") return <span className="pill-active">Healthy</span>;
  if (status === "Input Data Fault")
    return (
      <span className="pill-medium" style={{ background: "oklch(0.94 0.055 90)", color: "oklch(0.45 0.13 65)" }}>
        Input Data Fault
      </span>
    );
  return <span className="pill-alert">Offline</span>;
}

function TeamAvatars({ count }: { count: number }) {
  const visible = Math.min(count, 3);
  const overflow = Math.max(0, count - visible);
  const initials = ["JD", "AS", "MR"];
  const tones = [
    "bg-brand text-white",
    "bg-bg-muted text-ink",
    "bg-brand-soft text-brand",
  ];
  return (
    <div className="hidden sm:flex items-center -space-x-2">
      {initials.slice(0, visible).map((i, idx) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full grid place-items-center text-[10px] font-bold ring-2 ring-white ${tones[idx % tones.length]}`}
        >
          {i}
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-7 h-7 rounded-full grid place-items-center text-[10px] font-bold ring-2 ring-white bg-bg-muted text-ink-muted">
          +{overflow}
        </div>
      )}
    </div>
  );
}
