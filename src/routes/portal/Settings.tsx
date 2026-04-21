import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { getSession, updateSession } from "../../lib/auth";

type NotificationKey = "criticalAlerts" | "quarterlyReports" | "weeklyDigest";

type NotificationPrefs = Record<NotificationKey, { email: boolean; sms: boolean }>;

const defaults: NotificationPrefs = {
  criticalAlerts: { email: true, sms: true },
  quarterlyReports: { email: true, sms: false },
  weeklyDigest: { email: false, sms: false },
};

function isValidAuMobile(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("61")) return digits.length === 11;
  return digits.startsWith("04") && digits.length === 10;
}

export default function Settings() {
  const session = getSession();
  const displayName =
    session?.name?.replace(/^\w/, (c) => c.toUpperCase()) || "Portal User";
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaults);
  const [mobile, setMobile] = useState(session?.mobile ?? "");
  const [mobileSaved, setMobileSaved] = useState<string>(session?.mobile ?? "");
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  function toggle(key: NotificationKey, channel: "email" | "sms") {
    setPrefs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }));
  }

  function saveMobile() {
    const trimmed = mobile.trim();
    if (trimmed && !isValidAuMobile(trimmed)) {
      setMobileError("Enter an Australian mobile (e.g. 04xx xxx xxx or +61 4xx xxx xxx).");
      return;
    }
    setMobileError(null);
    updateSession({ mobile: trimmed });
    setMobileSaved(trimmed);
    setToast(trimmed ? "Mobile number updated" : "Mobile number removed");
  }

  const mobileDirty = mobile.trim() !== mobileSaved.trim();
  const smsEnabled = Object.values(prefs).some((p) => p.sms);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-ink-muted mt-1">Manage your account preferences</p>
      </div>

      <div className="card p-6">
        <h2 className="font-bold">Profile Information</h2>
        <p className="text-sm text-ink-muted">Update your personal details here.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input bg-bg-muted/40" defaultValue={displayName} readOnly />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input
              className="input bg-bg-muted/40"
              defaultValue={session?.email || ""}
              readOnly
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="mobile">
                Mobile Number <span className="text-ink-faint font-normal">(for SMS alerts)</span>
              </label>
              {smsEnabled && !mobileSaved && (
                <span className="text-[11px] font-semibold text-amber-600">
                  Required for SMS notifications
                </span>
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="input flex-1"
                placeholder="04xx xxx xxx or +61 4xx xxx xxx"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setMobileError(null);
                }}
              />
              <button
                type="button"
                className="btn-primary"
                onClick={saveMobile}
                disabled={!mobileDirty}
              >
                Save
              </button>
            </div>
            {mobileError ? (
              <p className="mt-1.5 text-xs text-danger">{mobileError}</p>
            ) : (
              <p className="mt-1.5 text-xs text-ink-muted">
                Used for critical-alert SMS. We'll only text on events you enable below.
              </p>
            )}
          </div>
          <p className="text-sm text-ink-muted">
            To update your name or email, please use the authentication provider settings.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-bold">Notifications</h2>
        <p className="text-sm text-ink-muted">Choose what alerts you receive.</p>

        <div className="mt-5 divide-y divide-line">
          <NotifRow
            title="Critical Alerts"
            sub="Immediate notifications for significant demand spikes or meter drop-outs."
            email={prefs.criticalAlerts.email}
            sms={prefs.criticalAlerts.sms}
            onToggle={(c) => toggle("criticalAlerts", c)}
          />
          <NotifRow
            title="Quarterly Reports"
            sub="Get an email when a new written report is published to your portal."
            email={prefs.quarterlyReports.email}
            sms={prefs.quarterlyReports.sms}
            onToggle={(c) => toggle("quarterlyReports", c)}
          />
          <NotifRow
            title="Weekly Digest"
            sub="A short Monday summary of last week's cost, carbon, and open improvements."
            email={prefs.weeklyDigest.email}
            sms={prefs.weeklyDigest.sms}
            onToggle={(c) => toggle("weeklyDigest", c)}
          />
        </div>
        {smsEnabled && !mobileSaved && (
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 text-amber-800 text-xs px-3 py-2">
            You have SMS alerts enabled but no mobile number on file. Add one above to start
            receiving texts.
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-lg px-4 py-2.5 text-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-mint" /> {toast}
        </div>
      )}
    </div>
  );
}

function NotifRow({
  title,
  sub,
  email,
  sms,
  onToggle,
}: {
  title: string;
  sub: string;
  email: boolean;
  sms: boolean;
  onToggle: (channel: "email" | "sms") => void;
}) {
  return (
    <div className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-6 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-ink-muted">{sub}</div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Toggle
          label="Email"
          checked={email}
          onChange={() => onToggle("email")}
        />
        <Toggle label="SMS" checked={sms} onChange={() => onToggle("sms")} />
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-ink-muted">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-bg-muted border border-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
