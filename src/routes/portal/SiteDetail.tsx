import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  FileText,
  Download,
  AlertTriangle,
  Eye,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  sites,
  demandSeries,
  gbp,
  reports,
  Improvement,
  ImprovementStatus,
  Priority,
} from "../../lib/data";
import { useImprovements, setImprovementStatus } from "../../lib/improvementsStore";
import Dialog from "../../components/Dialog";

type Tab = "demand" | "circuits" | "heatmap" | "cost";
type Range = "24h" | "7d" | "30d" | "6m" | "12m";

const RANGE_OPTIONS: { id: Range; label: string; longLabel: string }[] = [
  { id: "24h", label: "24h", longLabel: "24 hours" },
  { id: "7d", label: "7d", longLabel: "7 days" },
  { id: "30d", label: "30d", longLabel: "30 days" },
  { id: "6m", label: "6mo", longLabel: "6 months" },
  { id: "12m", label: "12mo", longLabel: "12 months" },
];

const RANGE_FACTORS: Record<
  Range,
  { cost: number; carbon: number; peak: number; kwh: number }
> = {
  "24h": { cost: 1 / 7, carbon: 1 / 7, peak: 0.86, kwh: 1 / 30 },
  "7d": { cost: 1, carbon: 1, peak: 1, kwh: 7 / 30 },
  "30d": { cost: 30 / 7, carbon: 30 / 7, peak: 1.05, kwh: 1 },
  "6m": { cost: 26, carbon: 26, peak: 1.12, kwh: 6 },
  "12m": { cost: 52, carbon: 52, peak: 1.18, kwh: 12 },
};

const CIRCUIT_ROWS: { n: string; p: number; c: string }[] = [
  { n: "Refrigeration", p: 42, c: "oklch(0.42 0.09 155)" },
  { n: "HVAC", p: 24, c: "oklch(0.55 0.09 155)" },
  { n: "Lighting", p: 14, c: "oklch(0.68 0.08 155)" },
  { n: "IT & Equipment", p: 12, c: "oklch(0.78 0.06 150)" },
  { n: "Other", p: 8, c: "oklch(0.85 0.03 145)" },
];

const NMI_BY_SITE: Record<string, string> = {
  "1": "2001234567",
  "2": "6305432109",
  "3": "-",
};

export default function SiteDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>("demand");
  const [range, setRange] = useState<Range>("7d");
  const [reportsOpen, setReportsOpen] = useState(false);
  const improvementsRef = useRef<HTMLDivElement | null>(null);

  const site = sites.find((s) => s.id === id);
  const allImprovements = useImprovements();
  const siteItems = useMemo(
    () => allImprovements.filter((i) => i.siteId === id),
    [allImprovements, id],
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const h = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(h);
  }, [toast]);

  const { openItems, acknowledgedItems, resolvedItems } = useMemo(() => {
    return {
      openItems: siteItems.filter((i) => i.status === "New" || i.status === "In Progress"),
      acknowledgedItems: siteItems.filter((i) => i.status === "Acknowledged"),
      resolvedItems: siteItems.filter((i) => i.status === "Resolved"),
    };
  }, [siteItems]);

  function setStatus(itemId: string, status: ImprovementStatus, message: string) {
    setImprovementStatus(itemId, status);
    setToast(message);
  }
  const siteReports = useMemo(() => reports.filter((r) => r.siteId === id), [id]);
  const fullSeries = useMemo(() => (site ? demandSeries(site.livePeakKw) : []), [site]);
  const series = useMemo(() => {
    const rangeMap: Record<Range, number> = {
      "24h": 4,
      "7d": fullSeries.length,
      "30d": fullSeries.length,
      "6m": fullSeries.length,
      "12m": fullSeries.length,
    };
    const count = rangeMap[range];
    return fullSeries.slice(-count);
  }, [fullSeries, range]);
  const avgDemand = useMemo(
    () =>
      series.length
        ? Math.round(series.reduce((a, p) => a + p.kw, 0) / series.length)
        : 0,
    [series],
  );
  const rangeLabel = RANGE_OPTIONS.find((o) => o.id === range)?.longLabel ?? "7 days";
  const rangeFactor = RANGE_FACTORS[range];
  const peakForRange = site ? +(site.peak7dKw * rangeFactor.peak).toFixed(1) : 0;
  const costForRange = site ? Math.round(site.cost7d * rangeFactor.cost) : 0;
  const carbonForRange = site ? +(site.carbon7dT * rangeFactor.carbon).toFixed(2) : 0;
  const totalMwhForRange = site ? (site.monthlyKwh * rangeFactor.kwh) / 1000 : 0;
  const nmi = id ? NMI_BY_SITE[id] ?? "-" : "-";
  const heatmapData = useMemo(
    () => (site ? buildHeatmapData(range, site.livePeakKw) : null),
    [range, site],
  );

  function scrollToImprovements() {
    improvementsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!site) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-xl font-bold">Site not found</h2>
        <Link to="/portal/sites" className="btn-primary mt-4 inline-flex">
          Back to Sites
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/portal/sites"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Sites
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-extrabold tracking-tight text-[36px] md:text-[40px] leading-none">{site.name}</h1>
          <p className="text-ink-muted mt-2 text-[14px]">
            {site.address} · {site.type}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <button onClick={scrollToImprovements} className="btn-secondary">
              <Lightbulb className="w-4 h-4" /> Insights
              {openItems.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[10px] font-bold">
                  {openItems.length}
                </span>
              )}
            </button>
            <button onClick={() => setReportsOpen(true)} className="btn-secondary">
              <FileText className="w-4 h-4" /> Reports
              {siteReports.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-bg-muted text-ink text-[10px] font-bold">
                  {siteReports.length}
                </span>
              )}
            </button>
          </div>
          <div className="inline-flex rounded-md border border-line bg-white p-1 text-xs font-semibold">
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`px-3 py-1 rounded ${
                  range === r.id ? "bg-bg-muted text-ink" : "text-ink-muted"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <HeroKPI label="Live Demand" value={`${site.livePeakKw}`} unit="kW" />
        <KPI label={`Peak (${rangeLabel})`} value={`${peakForRange}`} unit="kW" accent="warn" />
        <KPI label={`Cost (${rangeLabel})`} value={gbp(costForRange)} />
        <KPI
          label={`Carbon (${rangeLabel})`}
          value={`${carbonForRange.toFixed(2)}`}
          unit="t CO₂"
          accent="brand"
        />
      </div>

      <div className="inline-flex gap-1 bg-white border border-line rounded-lg p-1">
        {[
          { id: "demand", label: "Demand Profile" },
          { id: "circuits", label: "Consumption Breakdown" },
          { id: "heatmap", label: "Load Heatmap" },
          { id: "cost", label: "Cost & Carbon" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              tab === t.id ? "bg-bg-muted text-ink" : "text-ink-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "demand" && (
        <div className="card p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3 className="font-bold">
              Demand profile{" "}
              <span className="text-ink-muted font-normal">| NMI {nmi} | </span>
              <span className="font-bold text-brand">{rangeLabel}</span>
            </h3>
            <Legend />
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#164d35" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#164d35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd4" vertical={false} />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 11, fill: "#9a9188" }}
                  interval={3}
                  tickFormatter={(v) => (typeof v === "string" ? v.slice(0, 6) : v)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9a9188" }}
                  tickFormatter={(v) => `${v} kW`}
                />
                <Tooltip
                  formatter={(v: number) => [`${v} kW`, "Demand"]}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2ddd4",
                    fontSize: 12,
                  }}
                />
                <ReferenceLine
                  y={peakForRange}
                  stroke="#b78a2b"
                  strokeDasharray="4 4"
                  label={{
                    value: `Peak demand: ${peakForRange} kW`,
                    position: "insideTopRight",
                    fontSize: 11,
                    fontWeight: 600,
                    fill: "#b78a2b",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kw"
                  stroke="#164d35"
                  strokeWidth={2}
                  fill="url(#d)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-sm text-ink-muted flex-wrap">
            <div>
              Avg demand:{" "}
              <span className="font-semibold text-ink tabular-nums">{avgDemand} kW</span>
            </div>
            <div>
              Period peak:{" "}
              <span className="font-semibold text-warn tabular-nums">{peakForRange} kW</span>
            </div>
            <div>
              Data points:{" "}
              <span className="font-semibold text-ink tabular-nums">{series.length}</span>
            </div>
          </div>
        </div>
      )}

      {tab === "circuits" && (
        <div className="card p-5">
          <h3 className="font-bold">
            Estimated Consumption Breakdown{" "}
            <span className="text-ink-muted font-normal">| </span>
            <span className="font-bold text-brand">{rangeLabel}</span>
          </h3>
          <p className="text-sm text-ink-muted">Share of consumption by circuit</p>
          <div className="mt-5 space-y-3">
            {CIRCUIT_ROWS.map((row) => {
              const mwh = (totalMwhForRange * row.p) / 100;
              return (
                <div key={row.n}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">{row.n}</span>
                    <span className="tabular-nums text-ink-muted">
                      <span className="font-semibold text-ink">
                        {mwh.toLocaleString(undefined, {
                          maximumFractionDigits: mwh < 10 ? 2 : mwh < 100 ? 1 : 0,
                        })}{" "}
                        MWh
                      </span>
                      <span className="mx-1.5 text-ink-hairline">|</span>
                      {row.p}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.p}%`, background: row.c }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "heatmap" && heatmapData && (
        <div className="card p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-bold">
                Load Heatmap{" "}
                <span className="text-ink-muted font-normal">| </span>
                <span className="font-bold text-brand">{rangeLabel}</span>
              </h3>
              <p className="text-sm text-ink-muted">{heatmapData.subtitle}</p>
            </div>
            <HeatmapLegend data={heatmapData} />
          </div>
          <Heatmap data={heatmapData} />
        </div>
      )}

      {tab === "cost" && (
        <div className="card p-5">
          <h3 className="font-bold">
            Cost & Carbon{" "}
            <span className="text-ink-muted font-normal">| </span>
            <span className="font-bold text-brand">{rangeLabel}</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-line p-4">
              <div className="text-sm text-ink-muted">Cost</div>
              <div className="mt-2 text-2xl font-extrabold">{gbp(costForRange)}</div>
              <div className="text-xs text-ink-muted">
                Split: 68% consumption · 22% demand · 10% standing
              </div>
            </div>
            <div className="rounded-lg border border-line p-4">
              <div className="text-sm text-ink-muted">Carbon</div>
              <div className="mt-2 text-2xl font-extrabold text-brand">
                {carbonForRange.toFixed(2)} t CO₂
              </div>
              <div className="text-xs text-ink-muted">
                Grid intensity: 630 gCO₂/kWh (AU NEM avg)
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={improvementsRef} className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-display font-bold text-[20px] tracking-tight">
              Open Improvements for this site
            </h3>
            <p className="text-[12.5px] text-ink-muted mt-0.5">
              {openItems.length} open · {acknowledgedItems.length} acknowledged ·{" "}
              {resolvedItems.length} resolved
            </p>
          </div>
          <Link
            to="/portal/notifications"
            className="text-[13px] font-semibold text-brand hover:underline"
          >
            See all across estate
          </Link>
        </div>

        {openItems.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-brand-soft text-brand grid place-items-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="mt-3 text-[13px] text-ink-muted">
              No open improvements for this site.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {openItems.map((imp) => (
              <SiteImprovementRow
                key={imp.id}
                imp={imp}
                onAcknowledge={() =>
                  setStatus(
                    imp.id,
                    "Acknowledged",
                    `"${imp.title}" moved to Acknowledged`,
                  )
                }
                onResolve={() =>
                  setStatus(imp.id, "Resolved", `"${imp.title}" marked resolved`)
                }
                onReopen={() => setStatus(imp.id, "New", `"${imp.title}" reopened`)}
              />
            ))}
          </div>
        )}

        {acknowledgedItems.length > 0 && (
          <BucketSection
            title="Acknowledged"
            subtitle="Items you've flagged to come back to"
            items={acknowledgedItems}
            renderRow={(imp) => (
              <SiteImprovementRow
                key={imp.id}
                imp={imp}
                onAcknowledge={() => {}}
                onResolve={() =>
                  setStatus(imp.id, "Resolved", `"${imp.title}" marked resolved`)
                }
                onReopen={() =>
                  setStatus(imp.id, "New", `"${imp.title}" moved back to Open`)
                }
              />
            )}
          />
        )}

        {resolvedItems.length > 0 && (
          <BucketSection
            title="Resolved"
            subtitle="Items you've actioned"
            items={resolvedItems}
            renderRow={(imp) => (
              <SiteImprovementRow
                key={imp.id}
                imp={imp}
                onAcknowledge={() => {}}
                onResolve={() => {}}
                onReopen={() =>
                  setStatus(imp.id, "New", `"${imp.title}" reopened`)
                }
              />
            )}
          />
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-lg px-4 py-2.5 text-[13px] shadow-xl flex items-center gap-2 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" /> {toast}
        </div>
      )}

      <Dialog
        open={reportsOpen}
        onClose={() => setReportsOpen(false)}
        title="Site reports"
        subtitle={`${site.name} · ${siteReports.length} available`}
      >
        {siteReports.length === 0 ? (
          <p className="text-sm text-ink-muted">
            No reports published for this site yet. Your first quarterly review
            typically lands within five business days of sign-up.
          </p>
        ) : (
          <ul className="space-y-2">
            {siteReports.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-line p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-semibold truncate">{r.title}</div>
                  <div className="text-xs text-ink-muted">
                    {r.period} · {r.pages} pages · Published {r.publishedAt}
                  </div>
                </div>
                <button
                  className="btn-secondary shrink-0"
                  onClick={() => alert("Demo: PDF download not available.")}
                >
                  <Download className="w-4 h-4" /> PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </Dialog>
    </div>
  );
}

function SiteImprovementRow({
  imp,
  onAcknowledge,
  onResolve,
  onReopen,
}: {
  imp: Improvement;
  onAcknowledge: () => void;
  onResolve: () => void;
  onReopen: () => void;
}) {
  const isResolved = imp.status === "Resolved";
  const isAcknowledged = imp.status === "Acknowledged";
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-danger/10 text-danger grid place-items-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-display font-bold text-[16px] tracking-tight">
              {imp.title}
            </h4>
            <PriorityTag priority={imp.priority} />
            <StatusTag status={imp.status} />
          </div>
          <p className="text-[13px] text-ink-muted leading-relaxed">{imp.detail}</p>
          <div className="flex items-center gap-3 text-[12.5px] flex-wrap pt-1">
            <span className="chip text-[11px] bg-brand-soft text-brand border-brand/20">
              {imp.category}
            </span>
            <span className="text-ink-muted">
              <span className="font-semibold text-brand">~{gbp(imp.savingsPerYear)}/yr</span>{" "}
              potential saving
            </span>
            {imp.estimatedProjectCost > 0 && (
              <span className="text-ink-muted">
                · Est. project cost:{" "}
                <span className="font-semibold text-ink">
                  {gbp(imp.estimatedProjectCost)}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap pt-2">
            {!isResolved && !isAcknowledged && (
              <button onClick={onAcknowledge} className="btn-secondary btn-sm">
                <Eye className="w-3 h-3" /> Acknowledge
              </button>
            )}
            {!isResolved && (
              <button onClick={onResolve} className="btn-primary btn-sm">
                <CheckCircle2 className="w-3 h-3" /> Mark resolved
              </button>
            )}
            {(isResolved || isAcknowledged) && (
              <button onClick={onReopen} className="btn-secondary btn-sm">
                <RotateCcw className="w-3 h-3" /> Reopen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BucketSection({
  title,
  subtitle,
  items,
  renderRow,
}: {
  title: string;
  subtitle: string;
  items: Improvement[];
  renderRow: (imp: Improvement) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 text-left flex items-center justify-between gap-3 hover:bg-bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-[15px]">{title}</span>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-bg-muted text-[11px] font-bold text-ink">
                {items.length}
              </span>
            </div>
            <div className="text-[11.5px] text-ink-muted mt-0.5">{subtitle}</div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-ink-hairline p-4 space-y-3 bg-bg-muted/20">
          {items.map(renderRow)}
        </div>
      )}
    </div>
  );
}

function PriorityTag({ priority }: { priority: Priority }) {
  if (priority === "High Priority") return <span className="pill-high">High Priority</span>;
  if (priority === "Medium Priority")
    return <span className="pill-medium">Medium Priority</span>;
  return <span className="pill-neutral">Low Priority</span>;
}

function StatusTag({ status }: { status: ImprovementStatus }) {
  if (status === "New") return <span className="pill-new">New</span>;
  if (status === "In Progress") return <span className="pill-in-progress">In Progress</span>;
  if (status === "Acknowledged") return <span className="pill-acknowledged">Acknowledged</span>;
  return null;
}

function KPI({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: "warn" | "brand";
}) {
  const tone =
    accent === "warn" ? "text-warn" : accent === "brand" ? "text-brand" : "text-ink";
  return (
    <div className="card p-5 flex items-center justify-between gap-3">
      <div className="micro-label">{label}</div>
      <div className="flex items-baseline gap-1.5 text-right">
        <span className={`display-num text-[28px] ${tone}`}>{value}</span>
        {unit && <span className="text-[12.5px] text-ink-muted font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function HeroKPI({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="card-hero p-5 flex items-center justify-between gap-3">
      <div className="micro-label-on-hero">{label}</div>
      <div className="flex items-baseline gap-1.5 text-right">
        <span className="display-num text-[28px] text-white">{value}</span>
        {unit && <span className="text-[12.5px] text-white/70 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-3 h-[3px] bg-brand" /> Demand
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="w-3 border-t border-dashed border-warn" /> Peak threshold
      </span>
    </div>
  );
}

type HeatmapData = {
  rows: number;
  cols: number;
  rowLabels: string[];
  colLabels: (string | null)[];
  cells: number[][];
  minV: number;
  maxV: number;
  unit: string;
  cellHeight: number;
  subtitle: string;
  tooltip: (row: number, col: number, v: number) => string;
};

// Pill-aligned anchors:
// Low = New pill text (brand green), Med = Medium Priority pill (warn amber),
// High = High Priority pill (danger red). Slight lightening at the low end keeps
// the "New" feel softer than the deep brand text.
const HEATMAP_LOW = { l: 0.68, c: 0.06, h: 152 };
const HEATMAP_MID = { l: 0.7, c: 0.13, h: 75 };
const HEATMAP_HIGH = { l: 0.62, c: 0.15, h: 28 };

function heatmapColor(ratio: number) {
  const r = Math.max(0, Math.min(1, ratio));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  let stop: { l: number; c: number; h: number };
  if (r < 0.5) {
    const t = r / 0.5;
    stop = {
      l: lerp(HEATMAP_LOW.l, HEATMAP_MID.l, t),
      c: lerp(HEATMAP_LOW.c, HEATMAP_MID.c, t),
      h: lerp(HEATMAP_LOW.h, HEATMAP_MID.h, t),
    };
  } else {
    const t = (r - 0.5) / 0.5;
    stop = {
      l: lerp(HEATMAP_MID.l, HEATMAP_HIGH.l, t),
      c: lerp(HEATMAP_MID.c, HEATMAP_HIGH.c, t),
      h: lerp(HEATMAP_MID.h, HEATMAP_HIGH.h, t),
    };
  }
  return `oklch(${stop.l.toFixed(3)} ${stop.c.toFixed(3)} ${stop.h.toFixed(1)})`;
}

const WEEKDAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function demandForSlot(peak: number, weekday: number, hour: number, seed = 0) {
  const isWeekend = weekday >= 5;
  const work = hour >= 6 && hour < 22;
  const base = work ? peak * (isWeekend ? 0.45 : 0.78) : peak * 0.22;
  const noise = ((weekday * 7 + hour * 3 + seed * 5) % 9) - 4;
  return Math.max(5, base + noise);
}

function buildHeatmapData(range: Range, peak: number): HeatmapData {
  if (range === "24h") {
    const today = new Date();
    const weekday = (today.getDay() + 6) % 7;
    const row = Array.from({ length: 24 }, (_, h) =>
      Math.round(demandForSlot(peak, weekday, h)),
    );
    return {
      rows: 1,
      cols: 24,
      rowLabels: ["Today"],
      colLabels: Array.from({ length: 24 }, (_, h) => (h % 3 === 0 ? `${h}` : null)),
      cells: [row],
      minV: Math.min(...row),
      maxV: Math.max(...row),
      unit: "kW",
      cellHeight: 28,
      subtitle: "Hour-of-day, intensity = avg kW",
      tooltip: (_r, c, v) => `${c}:00 · ${v} kW`,
    };
  }
  if (range === "7d") {
    const cells = WEEKDAYS_SHORT.map((_d, di) =>
      Array.from({ length: 24 }, (_, h) => Math.round(demandForSlot(peak, di, h))),
    );
    const flat = cells.flat();
    return {
      rows: 7,
      cols: 24,
      rowLabels: WEEKDAYS_SHORT,
      colLabels: Array.from({ length: 24 }, (_, h) => (h % 3 === 0 ? `${h}` : null)),
      cells,
      minV: Math.min(...flat),
      maxV: Math.max(...flat),
      unit: "kW",
      cellHeight: 22,
      subtitle: "Day-of-week × hour-of-day, intensity = avg kW",
      tooltip: (r, c, v) => `${WEEKDAYS_SHORT[r]} ${c}:00 · ${v} kW`,
    };
  }
  if (range === "30d") {
    const today = new Date();
    const rowLabels: string[] = [];
    const cells: number[][] = [];
    for (let offset = 29; offset >= 0; offset--) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const weekday = (d.getDay() + 6) % 7;
      rowLabels.push(
        `${d.toLocaleString("en-AU", { weekday: "short" })} ${d.getDate()}`,
      );
      cells.push(
        Array.from({ length: 24 }, (_, h) =>
          Math.round(demandForSlot(peak, weekday, h, offset)),
        ),
      );
    }
    const flat = cells.flat();
    return {
      rows: 30,
      cols: 24,
      rowLabels,
      colLabels: Array.from({ length: 24 }, (_, h) => (h % 3 === 0 ? `${h}` : null)),
      cells,
      minV: Math.min(...flat),
      maxV: Math.max(...flat),
      unit: "kW",
      cellHeight: 14,
      subtitle: "Day × hour-of-day, intensity = avg kW",
      tooltip: (r, c, v) => `${rowLabels[r]} ${c}:00 · ${v} kW`,
    };
  }
  const months = range === "6m" ? 6 : 12;
  const today = new Date();
  const rowLabels: string[] = [];
  const cells: number[][] = [];
  for (let offset = months - 1; offset >= 0; offset--) {
    const d = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    rowLabels.push(
      months > 6
        ? d.toLocaleString("en-AU", { month: "short" })
        : d.toLocaleString("en-AU", { month: "short", year: "2-digit" }),
    );
    const daysInMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0,
    ).getDate();
    const weekdayOccurrences = [0, 0, 0, 0, 0, 0, 0];
    for (let day = 1; day <= daysInMonth; day++) {
      const wd = (new Date(d.getFullYear(), d.getMonth(), day).getDay() + 6) % 7;
      weekdayOccurrences[wd]++;
    }
    const seasonFactor = 1 + 0.14 * Math.sin(((d.getMonth() + 1) / 12) * Math.PI * 2);
    const row = weekdayOccurrences.map((occurrences, wd) => {
      const dailyAvg = Array.from({ length: 24 }, (_, h) =>
        demandForSlot(peak, wd, h, offset),
      ).reduce((a, b) => a + b, 0);
      // daily kWh ≈ sum of 24 hourly averages (since values are kW per hour)
      return Math.round(dailyAvg * seasonFactor * occurrences);
    });
    cells.push(row);
  }
  const flat = cells.flat();
  return {
    rows: months,
    cols: 7,
    rowLabels,
    colLabels: WEEKDAYS_SHORT,
    cells,
    minV: Math.min(...flat),
    maxV: Math.max(...flat),
    unit: "kWh",
    cellHeight: 28,
    subtitle: "Month × day-of-week, total kWh",
    tooltip: (r, c, v) => `${rowLabels[r]} · ${WEEKDAYS_SHORT[c]} · ${v.toLocaleString()} kWh`,
  };
}

function formatLegendValue(v: number, unit: string) {
  if (unit === "kWh" && v >= 1000) {
    return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)} MWh`;
  }
  return `${Math.round(v).toLocaleString()} ${unit}`;
}

function Heatmap({ data }: { data: HeatmapData }) {
  const range = data.maxV - data.minV || 1;
  const colWidth = data.cols === 7 ? 52 : 28;
  const minGridWidth = Math.max(560, data.cols * colWidth + 64);
  return (
    <div className="mt-5 overflow-x-auto">
      <div style={{ minWidth: `${minGridWidth}px` }}>
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `auto repeat(${data.cols}, minmax(0, 1fr))`,
          }}
        >
          <div />
          {data.colLabels.map((label, i) => (
            <div
              key={`col-${i}`}
              className="text-[10px] text-ink-faint text-center"
            >
              {label ?? ""}
            </div>
          ))}
          {data.cells.map((row, ri) => (
            <div key={`row-${ri}`} className="contents">
              <div className="text-[10px] text-ink-muted pr-2 self-center tabular-nums whitespace-nowrap">
                {data.rowLabels[ri]}
              </div>
              {row.map((v, ci) => {
                const ratio = (v - data.minV) / range;
                return (
                  <div
                    key={`cell-${ri}-${ci}`}
                    className="rounded-sm"
                    style={{
                      background: heatmapColor(ratio),
                      height: data.cellHeight,
                    }}
                    title={data.tooltip(ri, ci, v)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeatmapLegend({ data }: { data: HeatmapData }) {
  const stops = [0, 0.25, 0.5, 0.75, 1];
  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {data.unit === "kWh" ? "Total energy" : "Avg demand"}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] tabular-nums text-ink-muted">
          {formatLegendValue(data.minV, data.unit)}
        </span>
        <div
          className="h-2.5 w-40 rounded-full"
          style={{
            background: `linear-gradient(to right, ${stops
              .map((s) => `${heatmapColor(s)} ${s * 100}%`)
              .join(", ")})`,
          }}
        />
        <span className="text-[10.5px] tabular-nums text-ink-muted">
          {formatLegendValue(data.maxV, data.unit)}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[10px] text-ink-muted">
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ background: heatmapColor(0.1) }}
          />
          Low
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ background: heatmapColor(0.55) }}
          />
          Medium
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ background: heatmapColor(0.95) }}
          />
          High
        </span>
      </div>
    </div>
  );
}
