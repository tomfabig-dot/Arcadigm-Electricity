import { useEffect, useState } from "react";
import {
  Plug,
  Zap,
  Activity,
  AlertCircle,
  ChevronDown,
  Plus,
  CheckCircle2,
} from "lucide-react";
import {
  sites,
  hhMeters,
  subMeters,
  HHMeter,
  HHMeterStatus,
} from "../../lib/data";
import Dialog from "../../components/Dialog";

type Tab = "hh" | "sub";

export default function Integrations() {
  const [tab, setTab] = useState<Tab>("hh");
  const [meters, setMeters] = useState<HHMeter[]>(hhMeters);
  const [configuringSiteId, setConfiguringSiteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const hhErrors = meters.filter((h) => h.status === "Error").length;
  const hhConnected = meters.filter((h) => h.status === "Connected").length;
  const subOnline = subMeters.filter((s) => s.online).length;

  function updateMeter(siteId: string, patch: Partial<HHMeter>) {
    setMeters((prev) => prev.map((m) => (m.siteId === siteId ? { ...m, ...patch } : m)));
  }

  function handleConfigure({
    siteId,
    nmi,
    provider,
  }: {
    siteId: string;
    nmi: string;
    provider: string;
  }) {
    updateMeter(siteId, {
      nmi,
      provider,
      lastDataPoint: "Just now",
      hhActive: true,
      status: "Connected" as HHMeterStatus,
      errorMessage: undefined,
    });
    setConfiguringSiteId(null);
    setToast("Meter connection configured");
  }

  const configuringMeter = meters.find((m) => m.siteId === configuringSiteId);
  const configuringSite = sites.find((s) => s.id === configuringSiteId);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Plug className="w-7 h-7 text-ink mt-1" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Integrations</h1>
          <p className="text-ink-muted mt-1 max-w-xl">
            Manage data connections for half-hourly meter data and sub-metering.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Summary
          tone={hhErrors > 0 ? "danger" : "brand"}
          icon={<Zap className="w-4 h-4" />}
          label="HH Meter Data"
          value={
            <>
              {hhConnected}/{meters.length} sites
              {hhErrors > 0 && <span className="text-danger"> · {hhErrors} error</span>}
            </>
          }
        />
        <Summary
          tone="neutral"
          icon={<Activity className="w-4 h-4" />}
          label="Sub-Meters"
          value={`${subOnline}/${subMeters.length} online`}
        />
      </div>

      <div className="inline-flex gap-1 bg-white border border-line rounded-lg p-1">
        <TabBtn active={tab === "hh"} onClick={() => setTab("hh")}>
          <Zap className="w-3.5 h-3.5" /> Half-Hourly Meter Data{" "}
          {hhErrors > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold">
              {hhErrors}
            </span>
          )}
        </TabBtn>
        <TabBtn active={tab === "sub"} onClick={() => setTab("sub")}>
          <Activity className="w-3.5 h-3.5" /> Sub-Metering
        </TabBtn>
      </div>

      {tab === "hh" && (
        <HHPanel
          meters={meters}
          onConfigure={(siteId) => setConfiguringSiteId(siteId)}
        />
      )}
      {tab === "sub" && <SubPanel />}

      <ConfigureMeterDialog
        open={!!configuringSiteId}
        siteName={configuringSite?.name || ""}
        existing={configuringMeter}
        onClose={() => setConfiguringSiteId(null)}
        onSubmit={(nmi, provider) =>
          configuringSiteId &&
          handleConfigure({ siteId: configuringSiteId, nmi, provider })
        }
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-lg px-4 py-2.5 text-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
        active ? "bg-bg-muted text-ink" : "text-ink-muted"
      }`}
    >
      {children}
    </button>
  );
}

function Summary({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  tone: "brand" | "danger" | "neutral";
}) {
  const styles =
    tone === "danger"
      ? "bg-danger/5 border-danger/20"
      : tone === "brand"
      ? "bg-brand-soft border-brand/20"
      : "bg-white border-line";
  return (
    <div className={`rounded-xl border p-4 ${styles}`}>
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ink-muted">
        {icon} {label}
      </div>
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}

function HHPanel({
  meters,
  onConfigure,
}: {
  meters: HHMeter[];
  onConfigure: (siteId: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-lg">Half-Hourly (NEM) Meter Data</h2>
        <p className="text-sm text-ink-muted">
          Configure per-site NMIs and data providers to pull automated half-hourly consumption
          readings via the Consumer Data Right.
        </p>
      </div>
      {meters.map((m) => {
        const site = sites.find((s) => s.id === m.siteId)!;
        return (
          <HHRow
            key={m.siteId}
            site={site}
            meter={m}
            onConfigure={() => onConfigure(m.siteId)}
          />
        );
      })}
    </div>
  );
}

function HHRow({
  site,
  meter,
  onConfigure,
}: {
  site: (typeof sites)[number];
  meter: HHMeter;
  onConfigure: () => void;
}) {
  const [open, setOpen] = useState(false);
  const border =
    meter.status === "Error"
      ? "border-danger/30"
      : meter.status === "Connected"
      ? "border-brand/30"
      : "border-line";
  const statusTag =
    meter.status === "Connected" ? (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border bg-brand-soft text-brand border-brand/20">
        <CheckCircle2 className="w-3 h-3" /> Connected
      </span>
    ) : meter.status === "Error" ? (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border bg-danger/10 text-danger border-danger/20">
        <AlertCircle className="w-3 h-3" /> Error
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border bg-bg-muted text-ink-muted border-line">
        <Plug className="w-3 h-3" /> Not configured
      </span>
    );

  if (meter.status === "Not configured") {
    return (
      <div className={`card ${border} overflow-hidden`}>
        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BuildingBadge />
            <div className="font-bold">{site.name}</div>
          </div>
          {statusTag}
        </div>
        <button
          onClick={onConfigure}
          className="w-full p-4 border-t border-line text-sm text-ink-muted hover:text-ink inline-flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Configure meter connection
        </button>
      </div>
    );
  }

  return (
    <div className={`card ${border} overflow-hidden`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <BuildingBadge />
          <div className="min-w-0">
            <div className="font-bold truncate">{site.name}</div>
            <div className="text-xs text-ink-muted">NMI: {meter.nmi}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {statusTag}
          <ChevronDown
            className={`w-4 h-4 text-ink-muted transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-line p-5">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-ink-muted">Data provider</div>
              <div className="font-semibold">{meter.provider}</div>
            </div>
            <div>
              <div className="text-ink-muted">Last data point</div>
              <div
                className={`font-semibold ${
                  meter.status === "Error" ? "text-danger" : ""
                }`}
              >
                {meter.lastDataPoint}
              </div>
            </div>
            <div>
              <div className="text-ink-muted">HH data</div>
              <div className="font-semibold text-brand">
                {meter.hhActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
          {meter.errorMessage && (
            <div className="mt-4 flex items-start gap-2 rounded-md bg-danger/5 border border-danger/20 p-3 text-sm text-danger">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{meter.errorMessage}</span>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button onClick={onConfigure} className="btn-secondary text-sm">
              {meter.status === "Error" ? "Reconnect" : "Reconfigure"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SubPanel() {
  return (
    <div className="card overflow-hidden">
      <div className="p-5 border-b border-line">
        <h2 className="font-bold text-lg">Sub-Metering</h2>
        <p className="text-sm text-ink-muted">
          Circuit-level sub-meters deployed at your sites.
        </p>
      </div>
      <div className="divide-y divide-line">
        {subMeters.map((m) => {
          const site = sites.find((s) => s.id === m.siteId)!;
          return (
            <div key={m.id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">{m.circuit}</div>
                <div className="text-xs text-ink-muted">{site.name}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-xs text-ink-muted">{m.lastReading}</div>
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-md border ${
                    m.online
                      ? "bg-brand-soft text-brand border-brand/20"
                      : "bg-bg-muted text-ink-muted border-line"
                  }`}
                >
                  {m.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BuildingBadge() {
  return (
    <div className="w-9 h-9 rounded-md bg-bg-muted grid place-items-center shrink-0">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
      </svg>
    </div>
  );
}

function ConfigureMeterDialog({
  open,
  siteName,
  existing,
  onClose,
  onSubmit,
}: {
  open: boolean;
  siteName: string;
  existing?: HHMeter;
  onClose: () => void;
  onSubmit: (nmi: string, provider: string) => void;
}) {
  const [nmi, setNmi] = useState("");
  const [provider, setProvider] = useState("Fiskil (CDR)");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setNmi(existing && existing.nmi !== "—" ? existing.nmi : "");
      setProvider(existing && existing.provider !== "—" ? existing.provider : "Fiskil (CDR)");
      setError(null);
    }
  }, [open, existing]);

  function submit() {
    const trimmed = nmi.trim();
    if (!/^\d{10,11}$/.test(trimmed)) {
      setError("Enter a valid 10 or 11-digit NMI (National Meter Identifier).");
      return;
    }
    onSubmit(trimmed, provider);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Configure meter connection"
      subtitle={siteName}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={submit}>
            Connect meter
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            NMI (National Meter Identifier)
          </label>
          <input
            className="input mt-1.5 w-full tabular-nums"
            placeholder="10 or 11 digits"
            value={nmi}
            onChange={(e) => {
              setNmi(e.target.value);
              setError(null);
            }}
            inputMode="numeric"
            autoFocus
          />
          <p className="mt-1.5 text-xs text-ink-muted">
            Your NMI is printed on your electricity bill. It uniquely identifies
            your connection point on the National Electricity Market.
          </p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Data provider
          </label>
          <select
            className="input mt-1.5 w-full"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="Fiskil (CDR)">Fiskil (CDR)</option>
            <option value="Manual NEM12 upload">Manual NEM12 upload</option>
          </select>
        </div>
        <div className="rounded-md bg-bg-muted/60 border border-line p-3 text-xs text-ink-muted">
          We'll redirect you to authorise data sharing via the Consumer Data
          Right. It takes about two minutes and doesn't touch your site.
        </div>
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 text-danger text-sm px-3 py-2">
            {error}
          </div>
        )}
      </div>
    </Dialog>
  );
}
