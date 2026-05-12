import { useEffect, useMemo, useState } from "react";
import { Search, Bell, Settings as SettingsIcon, SlidersHorizontal } from "lucide-react";
import {
  projectTypes,
  sites,
  gbp,
  TARIFF_GBP_PER_KWH,
  GRID_INTENSITY_T_PER_KWH,
} from "../../lib/data";

const ALL_SITES = "__all__";

export default function Projects() {
  const [selected, setSelected] = useState<string>(projectTypes[0].id);
  const [siteId, setSiteId] = useState<string>(ALL_SITES);

  const project = useMemo(
    () => projectTypes.find((p) => p.id === selected) ?? projectTypes[0],
    [selected],
  );

  const [loadPct, setLoadPct] = useState<number>(project.loadPctDefault);
  const [improvementPct, setImprovementPct] = useState<number>(project.improvementPct);

  useEffect(() => {
    setLoadPct(project.loadPctDefault);
    setImprovementPct(project.improvementPct);
  }, [project.id]);

  const totalAllSitesBill = sites.reduce((a, s) => a + s.annualBill, 0);
  const annualBill =
    siteId === ALL_SITES
      ? totalAllSitesBill
      : sites.find((s) => s.id === siteId)?.annualBill ?? 0;

  const loadBill = (loadPct / 100) * annualBill;
  const annualSaving = (improvementPct / 100) * loadBill;
  const payback = annualSaving > 0 ? project.capitalCost / annualSaving : 0;
  const carbonSavedT = (annualSaving / TARIFF_GBP_PER_KWH) * GRID_INTENSITY_T_PER_KWH;
  const beforeKwh = annualBill / TARIFF_GBP_PER_KWH;
  const afterKwh = (annualBill - annualSaving) / TARIFF_GBP_PER_KWH;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-extrabold tracking-tight text-[36px] leading-none">
            Project Library
          </h1>
          <p className="text-ink-muted mt-2 text-[14px]">
            Select a project type to model the expected impact on your electricity costs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-[240px] rounded-full bg-white border border-ink-hairline pl-9 pr-4 py-2 text-[13px] placeholder:text-ink-faint focus:outline-none focus:border-brand"
            />
          </div>
          <button className="w-9 h-9 rounded-full bg-white border border-ink-hairline grid place-items-center text-ink-muted hover:text-ink">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white border border-ink-hairline grid place-items-center text-ink-muted hover:text-ink">
            <SettingsIcon className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-full bg-brand-soft grid place-items-center text-[11px] font-bold text-brand">
            DU
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
          {projectTypes.map((p) => {
            const active = selected === p.id;
            if (active) {
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className="text-left card-hero p-6 md:col-span-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-brand-deep/60 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white/90">
                      Modeling Active
                    </span>
                    <SlidersHorizontal className="w-4 h-4 text-white/70" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-[22px] leading-tight text-white">{p.name}</h3>
                  <p className="mt-2 text-[13.5px] text-white/75 leading-relaxed max-w-md">
                    {p.description}
                  </p>
                </button>
              );
            }
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className="text-left card-interactive p-5"
              >
                <ProjectIcon name={p.name} />
                <h3 className="mt-4 font-display font-bold text-[15.5px] leading-snug tracking-tightish">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-[12.5px] text-ink-muted line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="space-y-4 lg:sticky lg:top-6 self-start">
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <span className="w-[3px] h-4 rounded-full bg-brand" />
              <div className="micro-label">Modeling Parameters</div>
            </div>

            <div className="mt-5 space-y-5">
              <Slider
                label={`% of electricity consumed by ${project.loadLabelShort || "controllable loads"}`}
                value={loadPct}
                min={project.loadPctLow}
                max={project.loadPctHigh}
                onChange={setLoadPct}
              />
              <Slider
                label="Expected improvement"
                value={improvementPct}
                min={1}
                max={Math.max(improvementPct, project.improvementPct) * 2}
                onChange={setImprovementPct}
              />
              <div>
                <div className="micro-label">Apply to</div>
                <select
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                  className="mt-2 w-full rounded-lg bg-white border border-ink-hairline px-3 py-2 text-[13px] focus:outline-none focus:border-brand"
                >
                  <option value={ALL_SITES}>
                    All Sites ({gbp(totalAllSitesBill)}/yr)
                  </option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({gbp(s.annualBill)}/yr)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="micro-label">Financial Forecast</div>
            <h3 className="mt-3 font-display font-extrabold text-[28px] tracking-tight leading-[1.1]">
              Expected Annual<br />Saving
            </h3>
            <div className="mt-3 display-num text-[44px] text-brand">{gbp(annualSaving)}</div>
            <p className="text-[11.5px] text-ink-muted mt-1">/ year</p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <MiniStat
                label="ROI Estimate"
                value={payback > 0 ? `${(payback * 12).toFixed(1)} Months` : "-"}
              />
              <MiniStat
                label="CO₂ Reduction"
                value={`${carbonSavedT.toFixed(0)} Tonnes`}
              />
            </div>

            <button className="mt-5 btn-primary w-full text-[12px] uppercase tracking-[0.1em] py-3">
              Add to Strategic Roadmap
            </button>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="micro-label">Consumption Comparison</div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-ink-muted uppercase tracking-[0.08em]">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-ink-hairline" /> Before
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand" /> After
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniChart
                kwh={beforeKwh}
                max={beforeKwh}
                label="Baseline"
                color="bg-bg-muted"
                textColor="text-ink-muted"
              />
              <MiniChart
                kwh={afterKwh}
                max={beforeKwh}
                label="Projected"
                color="bg-brand"
                textColor="text-brand"
              />
            </div>
          </div>

          <p className="text-[11.5px] text-ink-faint leading-relaxed">
            These figures are illustrative. Arcadigm manages full project delivery on a
            shared-savings model, so you pay nothing upfront.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectIcon({ name }: { name: string }) {
  const Icon = ({ path }: { path: string }) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const key = name.toLowerCase();
  let path = "M4 12h16M12 4v16";
  if (key.includes("hvac")) path = "M4 7h16M4 12h16M4 17h16M8 4v16M16 4v16";
  else if (key.includes("power factor")) path = "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83";
  else if (key.includes("solar")) path = "M12 3v2M4.93 4.93l1.41 1.41M3 12h2M19 12h2M17.66 6.34l1.41-1.41M8 14a4 4 0 1 1 8 0v3H8z";
  else if (key.includes("compressed")) path = "M6 8h12l-1 10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zM9 4h6v4H9z";
  else if (key.includes("led") || key.includes("lighting")) path = "M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2zM9 22h6";
  else if (key.includes("refrig")) path = "M6 3h12v18H6zM6 11h12M9 7h1M9 15h1";
  return <Icon path={path} />;
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12.5px] text-ink-muted">{label}</span>
        <span className="display-num text-[15px] text-ink">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 accent-brand"
      />
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-bg-muted p-3">
      <div className="micro-label">{label}</div>
      <div className="mt-1.5 font-semibold text-[14px] text-ink">{value}</div>
    </div>
  );
}

function MiniChart({
  kwh,
  max,
  label,
  color,
  textColor,
}: {
  kwh: number;
  max: number;
  label: string;
  color: string;
  textColor: string;
}) {
  const pct = Math.max(10, Math.round((kwh / max) * 100));
  return (
    <div className="space-y-2">
      <div className="relative h-[78px] rounded-lg bg-bg-muted/60 overflow-hidden">
        <div
          className={`absolute left-0 right-0 bottom-0 ${color} rounded-t-lg`}
          style={{ height: `${pct}%` }}
        />
      </div>
      <div className={`text-center text-[10px] font-semibold uppercase tracking-[0.08em] ${textColor}`}>
        {label}
      </div>
    </div>
  );
}

