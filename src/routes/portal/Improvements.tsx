import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  RotateCcw,
  Store,
  Snowflake,
  Building2,
} from "lucide-react";
import {
  sites,
  gbp,
  Improvement,
  ImprovementStatus,
  Priority,
  SiteType,
} from "../../lib/data";
import { useImprovements, setImprovementStatus } from "../../lib/improvementsStore";

export default function Improvements() {
  const items = useImprovements();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  function setStatus(id: string, status: ImprovementStatus, message: string) {
    setImprovementStatus(id, status);
    setToast(message);
  }

  const { high, med, bySite, ackItems, resolvedItems } = useMemo(() => {
    const isActive = (i: Improvement) => i.status === "New" || i.status === "In Progress";
    const activeItems = items.filter(isActive);
    return {
      high: activeItems.filter((i) => i.priority === "High Priority").length,
      med: activeItems.filter((i) => i.priority === "Medium Priority").length,
      bySite: sites
        .map((s) => ({
          site: s,
          items: items.filter((i) => i.siteId === s.id && isActive(i)),
        }))
        .filter((g) => g.items.length),
      ackItems: items.filter((i) => i.status === "Acknowledged"),
      resolvedItems: items.filter((i) => i.status === "Resolved"),
    };
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="max-w-2xl">
          <h1 className="font-display font-extrabold tracking-tight text-[40px] leading-[1.05] text-brand">
            Potential Improvements
          </h1>
          <p className="text-ink-muted mt-3 text-[14px] leading-relaxed">
            All open AI-identified opportunities across your monitored sites, ranked by impact.
            {(ackItems.length > 0 || resolvedItems.length > 0) && (
              <>
                {" "}
                <span className="text-ink font-medium">
                  {[
                    ackItems.length > 0 && `${ackItems.length} acknowledged`,
                    resolvedItems.length > 0 && `${resolvedItems.length} resolved`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  .
                </span>
              </>
            )}
          </p>
        </div>
        <div className="text-right">
          <div className="micro-label">Status: Live Monitoring</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="High Priority" value={high} unit="Opportunities" />
        <StatCard label="Medium Priority" value={med} unit="Opportunities" tone="muted" />
        <HeroStat label="Total Potential Saving" value="$12,400" suffix="/yr" />
      </div>

      <div className="space-y-8">
        {bySite.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-soft text-brand grid place-items-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-bold text-lg">All caught up.</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Every open improvement has been actioned. New opportunities will appear here as they're identified.
            </p>
          </div>
        ) : (
          bySite.map(({ site, items: siteItems }) => {
            const SiteIcon = iconForType(site.type);
            return (
              <div key={site.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-bg-muted grid place-items-center text-ink-muted">
                    <SiteIcon className="w-4.5 h-4.5" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display font-bold text-[20px] tracking-tight">{site.name}</h3>
                </div>
                <div className="space-y-3">
                  {siteItems.map((i) => (
                    <ImprovementRow
                      key={i.id}
                      i={i}
                      onAcknowledge={() =>
                        setStatus(
                          i.id,
                          "Acknowledged",
                          `"${i.title}" acknowledged. It'll stay visible so you can come back to it.`,
                        )
                      }
                      onResolve={() => setStatus(i.id, "Resolved", `"${i.title}" marked resolved`)}
                      onReopen={() => setStatus(i.id, "New", `"${i.title}" reopened`)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Link to="/portal/projects" className="btn-primary">
          Explore Projects & Savings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {ackItems.length > 0 && (
        <AcknowledgedSection
          items={ackItems}
          onReopen={(id, title) => setStatus(id, "New", `"${title}" reopened`)}
          onResolve={(id, title) =>
            setStatus(id, "Resolved", `"${title}" marked resolved`)
          }
        />
      )}

      {resolvedItems.length > 0 && (
        <ResolvedSection
          items={resolvedItems}
          onReopen={(id, title) => setStatus(id, "New", `"${title}" reopened`)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-lg px-4 py-2.5 text-sm shadow-xl flex items-center gap-2 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" /> {toast}
        </div>
      )}
    </div>
  );
}

function iconForType(type: SiteType) {
  if (type === "Cold Store") return Snowflake;
  if (type === "Retail") return Store;
  return Building2;
}

function StatCard({
  label,
  value,
  unit,
  tone = "default",
}: {
  label: string;
  value: number | string;
  unit?: string;
  tone?: "default" | "muted";
}) {
  const valueTone = tone === "muted" ? "text-ink-muted" : "text-ink";
  return (
    <div className="card p-6">
      <div className="micro-label">{label}</div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className={`display-num text-[40px] ${valueTone}`}>{value}</span>
        {unit && <span className="text-[13px] text-ink-muted font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function HeroStat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="card-hero p-6">
      <div className="micro-label-on-hero">{label}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="display-num text-[40px] text-white">{value}</span>
        {suffix && (
          <span className="text-[14px] text-white/70 font-medium">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function ImprovementRow({
  i,
  onAcknowledge,
  onResolve,
  onReopen,
}: {
  i: Improvement;
  onAcknowledge: () => void;
  onResolve: () => void;
  onReopen: () => void;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <PriorityTag priority={i.priority} />
            <h4 className="font-display font-bold text-[17px] tracking-tight">{i.title}</h4>
            <StatusTag status={i.status} />
          </div>
          <div className="flex items-center gap-4 text-[13px] text-ink-muted flex-wrap">
            <span className="font-semibold text-ink">
              Est. Saving: <span className="text-brand">~{gbp(i.savingsPerYear)}/yr</span>
            </span>
            {i.estimatedProjectCost > 0 && (
              <span>Project cost: {gbp(i.estimatedProjectCost)}</span>
            )}
            <span className="chip text-[11px] bg-brand-soft text-brand border-brand/20">
              {i.category}
            </span>
          </div>
          <p className="text-[13px] text-ink-muted leading-relaxed pt-1">{i.detail}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start ml-auto">
          {i.status !== "Acknowledged" && (
            <button onClick={onAcknowledge} className="btn-secondary btn-sm">
              <Eye className="w-3 h-3" /> Acknowledge
            </button>
          )}
          {i.status === "Acknowledged" && (
            <button onClick={onReopen} className="btn-secondary btn-sm">
              <RotateCcw className="w-3 h-3" /> Reopen
            </button>
          )}
          <button onClick={onResolve} className="btn-primary btn-sm">
            Mark resolved
          </button>
        </div>
      </div>
    </div>
  );
}

function PriorityTag({ priority }: { priority: Priority }) {
  if (priority === "High Priority") return <span className="pill-high">High Priority</span>;
  if (priority === "Medium Priority") return <span className="pill-medium">Medium Priority</span>;
  return <span className="pill-neutral">Low Priority</span>;
}

function StatusTag({ status }: { status: string }) {
  if (status === "New") return <span className="pill-new">New</span>;
  if (status === "In Progress") return <span className="pill-in-progress">In Progress</span>;
  if (status === "Acknowledged") return <span className="pill-acknowledged">Acknowledged</span>;
  return null;
}

function siteNameFor(id: string) {
  return sites.find((s) => s.id === id)?.name ?? "Unknown site";
}

function AcknowledgedSection({
  items,
  onReopen,
  onResolve,
}: {
  items: Improvement[];
  onReopen: (id: string, title: string) => void;
  onResolve: (id: string, title: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 text-left flex items-center justify-between gap-3"
      >
        <div>
          <div className="font-bold">Acknowledged ({items.length})</div>
          <div className="text-xs text-ink-muted">Items you've flagged to come back to</div>
        </div>
        <span className="text-sm text-ink-muted">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <div className="border-t border-line divide-y divide-line">
          {items.map((i) => (
            <div key={i.id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">{i.title}</div>
                <div className="text-xs text-ink-muted">
                  {siteNameFor(i.siteId)} · {i.category} · ~{gbp(i.savingsPerYear)}/yr
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => onReopen(i.id, i.title)}
                >
                  <RotateCcw className="w-3 h-3" /> Reopen
                </button>
                <button
                  className="btn-primary btn-sm"
                  onClick={() => onResolve(i.id, i.title)}
                >
                  <CheckCircle2 className="w-3 h-3" /> Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResolvedSection({
  items,
  onReopen,
}: {
  items: Improvement[];
  onReopen: (id: string, title: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 text-left flex items-center justify-between gap-3"
      >
        <div>
          <div className="font-bold">Resolved ({items.length})</div>
          <div className="text-xs text-ink-muted">Items you've marked as actioned</div>
        </div>
        <span className="text-sm text-ink-muted">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <div className="border-t border-line divide-y divide-line">
          {items.map((i) => (
            <div key={i.id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">{i.title}</div>
                <div className="text-xs text-ink-muted">
                  {siteNameFor(i.siteId)} · {i.category} · ~{gbp(i.savingsPerYear)}/yr
                </div>
              </div>
              <button className="btn-secondary btn-sm" onClick={() => onReopen(i.id, i.title)}>
                <RotateCcw className="w-3 h-3" /> Reopen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
