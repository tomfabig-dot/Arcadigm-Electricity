import { Link } from "react-router-dom";
import {
  TrendingDown,
  Lightbulb,
  FileText,
  Calendar,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { portfolioTotals, reports, gbp } from "../../lib/data";

export default function Dashboard() {
  const t = portfolioTotals();
  const now = new Date();
  const month = now.toLocaleString("en-AU", { month: "long" });
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleString("en-AU", {
    month: "long",
  });
  const year = now.getFullYear();
  const mwh = t.monthlyKwh / 1000;
  const peakKw = 400;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-extrabold tracking-tight text-[44px] leading-none">
            Overview
          </h1>
          <p className="text-ink-muted mt-2 text-[14px]">
            Real-time energy efficiency and cost performance analysis.
          </p>
        </div>
        <span className="date-chip">
          <Calendar className="w-3.5 h-3.5" />
          {month} {year}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-5">
        <div className="card p-7 flex flex-col">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="micro-label">Total Spend</div>
              <span className="h-3 w-px bg-ink-hairline" />
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink">
                {month}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft text-brand px-2.5 py-1 text-[11.5px] font-semibold">
                <TrendingUp className="w-3 h-3" />
                +2.4% on {prevMonth}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-muted text-ink px-2.5 py-1 text-[11.5px] font-semibold">
                <TrendingUp className="w-3 h-3" />
                +10% YoY
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-4 flex-wrap">
            <div className="display-num text-[52px] text-ink">$10,620</div>
          </div>
          <Sparkline className="mt-4 w-full h-[120px] text-brand" />
        </div>

        <div className="card-hero p-7 flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="micro-label-on-hero">Consumption</div>
            <span className="h-3 w-px bg-white/20" />
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/80">
              {month}
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between gap-6">
            <p className="text-[12.5px] text-white/70 leading-relaxed max-w-[180px]">
              Total grid energy drawn across your portfolio this period.
            </p>
            <div className="display-num text-[52px] text-white leading-none text-right shrink-0">
              {mwh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <span className="text-[20px] ml-1.5 font-semibold opacity-80 tracking-normal">
                MWh
              </span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
              Peak demand
            </div>
            <div className="display-num text-[22px] text-white leading-none">
              {peakKw}
              <span className="text-[13px] ml-1 font-semibold opacity-80 tracking-normal">
                kW
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SecondaryStat
          label="Total Savings Potential"
          value="$12,400"
          suffix="/yr"
        />
        <SecondaryStat
          label="CapEx-free Savings"
          value="$4,200"
          suffix="/yr"
        />
        <SecondaryStat
          label="Monitored Sites"
          value={String(t.siteCount)}
          suffix=" Active Nodes"
          suffixSize="small"
        />
      </div>

      <p className="text-[12px] text-ink-faint leading-relaxed max-w-3xl">
        Total consumption and spend based on NMI smart meter outputs. Potential savings
        estimated based on non-intrusive load estimation. Figures are estimates only and
        require validation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-5">
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="font-display font-bold text-[22px] tracking-tight">Improvements</h2>
          </div>
          <div className="space-y-3">
            <ActionRow
              to="/portal/notifications"
              iconBg="bg-brand-soft text-brand"
              icon={<Lightbulb className="w-4 h-4" />}
              title="Open Insights"
              subtitle={`${t.openImprovements} new optimization strategies detected for current billing cycle.`}
            />
            <ActionRow
              to="/portal/notifications"
              iconBg="bg-danger/10 text-danger"
              icon={<AlertTriangle className="w-4 h-4" />}
              title="Potential Improvements"
              subtitle={`${t.sitesWithImprovements} sites show significant deviation from operational benchmarks.`}
            />
            <AISummary totalSavings={t.potentialSavings} prevMonth={prevMonth} />
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-[22px] tracking-tight mb-4">
            Reports
          </h2>
          <div className="card p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-muted grid place-items-center text-ink-muted shrink-0">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-[15px]">{reports.length} Reports Available</div>
                <div className="text-[12.5px] text-ink-muted">Ready for download</div>
              </div>
            </div>

            <div className="mt-4 card-hero p-5 flex flex-col items-center text-center">
              <TrendingDown className="w-5 h-5 text-white/80" />
              <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-brand">
                Download Latest
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {reports.slice(0, 2).map((r, i) => (
                <div
                  key={r.id}
                  className={`flex items-center justify-between text-[13px] ${
                    i > 0 ? "pt-3 border-t border-line" : ""
                  }`}
                >
                  <span className="truncate pr-3 font-medium">{r.title}</span>
                  <span className="micro-label shrink-0">
                    {r.title.toLowerCase().includes("xls") ? "XLS" : "PDF"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryStat({
  label,
  value,
  suffix,
  suffixSize = "default",
}: {
  label: string;
  value: string;
  suffix?: string;
  suffixSize?: "default" | "small";
}) {
  return (
    <div className="card p-6 flex items-center justify-between gap-4">
      <div className="micro-label">{label}</div>
      <div className="flex items-baseline gap-1 text-right">
        <span className="display-num text-[32px] text-ink">{value}</span>
        {suffix && (
          <span
            className={`font-medium text-ink-muted ${
              suffixSize === "small" ? "text-[12px] ml-1" : "text-[13px]"
            }`}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ActionRow({
  to,
  icon,
  iconBg,
  title,
  subtitle,
}: {
  to: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      to={to}
      className="card-interactive flex items-center gap-4 p-5 group"
    >
      <div className={`w-10 h-10 rounded-full grid place-items-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[15px] leading-tight">{title}</div>
        <div className="text-[12.5px] text-ink-muted mt-0.5">{subtitle}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-ink-faint shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function AISummary({ totalSavings, prevMonth }: { totalSavings: number; prevMonth: string }) {
  return (
    <div className="card p-5 relative overflow-hidden">
      <span className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-brand" />
      <div className="pl-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-soft text-brand grid place-items-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="micro-label">AI Summary</div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              Updated today
            </span>
          </div>
          <p className="mt-2 text-[13px] text-ink leading-relaxed">
            Portfolio spend is tracking{" "}
            <span className="font-semibold text-brand">+2.4% above {prevMonth}</span> and{" "}
            <span className="font-semibold text-ink">+10% year-on-year</span>, led by Ringwood
            Retail Park running 12% above benchmark. Refrigeration and HVAC optimisation stand
            out as the highest-leverage opportunities this cycle, with{" "}
            <span className="font-semibold text-brand">~{gbp(totalSavings)}/yr</span> sits open
            across your estate.
          </p>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 72" className={className} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 48 C 15 46, 25 38, 35 40 S 55 52, 70 44 S 95 28, 110 32 S 135 50, 150 42 S 172 28, 180 32 L 180 72 L 0 72 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 48 C 15 46, 25 38, 35 40 S 55 52, 70 44 S 95 28, 110 32 S 135 50, 150 42 S 172 28, 180 32"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Dashboard };
