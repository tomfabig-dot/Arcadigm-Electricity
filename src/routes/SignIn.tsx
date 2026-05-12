import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import {
  signIn,
  validateCredentials,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  Provider,
} from "../lib/auth";
import ProviderButtons, { Separator } from "../components/ProviderButtons";

export default function SignIn() {
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const dest = loc.state?.from || "/portal/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<Provider | null>(null);

  function completeSignIn(provider: Provider) {
    setErr(null);
    setLoading(provider);
    setTimeout(() => {
      signIn(provider);
      nav(dest, { replace: true });
    }, 450);
  }

  function onEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateCredentials(email, password)) {
      setErr(
        `Invalid credentials. This is a demo environment. Sign in with ${DEMO_EMAIL} / ${DEMO_PASSWORD}.`,
      );
      return;
    }
    completeSignIn("email");
  }

  function prefillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErr(null);
  }

  const busy = loading !== null;

  return (
    <section className="min-h-[calc(100dvh-80px)] border-t border-ink-hairline">
      <div className="flex items-center justify-center min-h-[calc(100dvh-80px)] p-xl-2 md:p-2xl-2">
        <div className="w-full max-w-[440px]">
            <p className="eyebrow">Sign in</p>
            <h1
              className="mt-md-2 font-display text-display-l tracking-display text-ink leading-[1.04]"
              style={{ fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25' }}
            >
              Welcome back.
            </h1>
            <p className="mt-md-2 text-body-l text-ink-muted leading-prose">
              Use your work account or continue with email.
            </p>

            <div className="mt-xl-2">
              <ProviderButtons
                onGoogle={() => completeSignIn("google")}
                onMicrosoft={() => completeSignIn("microsoft")}
                loadingProvider={
                  loading === "google" || loading === "microsoft" ? loading : null
                }
                disabled={busy}
              />
            </div>

            <Separator />

            {/* Demo account note (no card, just a hairline block) */}
            <div className="mt-lg-2 pt-md-2 border-t border-ink-hairline flex items-start gap-md-2">
              <div className="flex-1">
                <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                  Demo account
                </p>
                <p className="mt-2xs text-ui text-ink">
                  <span className="font-mono">{DEMO_EMAIL}</span>
                  <span className="text-ink-faint"> · </span>
                  <span className="font-mono">{DEMO_PASSWORD}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={prefillDemo}
                className="btn-link"
                disabled={busy}
              >
                Autofill
              </button>
            </div>

            <form onSubmit={onEmailSubmit} className="mt-lg-2 space-y-md-2">
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-micro uppercase tracking-[0.16em] text-ink-faint mb-2xs"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com.au"
                  className="input"
                  required
                  disabled={busy}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2xs">
                  <label
                    htmlFor="password"
                    className="block font-mono text-micro uppercase tracking-[0.16em] text-ink-faint"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="btn-link"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="input pr-10"
                    required
                    disabled={busy}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-faint hover:text-ink"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" strokeWidth={1.75} /> : <Eye className="w-4 h-4" strokeWidth={1.75} />}
                  </button>
                </div>
              </div>

              {err && (
                <div
                  role="alert"
                  className="border-t border-signal-alert/40 pt-md-2 text-ui text-signal-alert"
                >
                  {err}
                </div>
              )}

              <button type="submit" className="btn-primary w-full" disabled={busy}>
                {loading === "email" ? (
                  "Signing in…"
                ) : (
                  <>
                    Continue <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-xl-2 pt-md-2 border-t border-ink-hairline text-ui text-ink-muted">
              No account yet?{" "}
              <Link to="/sign-up" className="text-ink font-medium hover:text-brand underline-offset-4 hover:underline">
                Connect your first site
              </Link>
            </p>
        </div>
      </div>
    </section>
  );
}
