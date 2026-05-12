import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../lib/auth";

type Step = {
  n: string;
  label: string;
  head: string;
  body: string;
  levels?: { tier: string; detail: string }[];
};

const steps: Step[] = [
  {
    n: "01",
    label: "About two minutes",
    head: "Give consent through the CDR.",
    body: "A pop-up from your retailer asks you to verify your account and tick a consent box. The Consumer Data Right then connects us directly to your retailer, so we see the exact same meter data they bill you on. No hardware, no site visit, no paperwork.",
  },
  {
    n: "02",
    label: "Straight away",
    head: "Your data appears in the portal.",
    body: "What you see in the portal depends on the plan you choose.",
    levels: [
      {
        tier: "Simple",
        detail: "30-minute readings, what you actually paid, and an indicative comparison showing what the same period would have cost on other contracts (for example, wholesale pricing).",
      },
      {
        tier: "Detailed",
        detail: "Everything in Simple, plus AI-identified savings powered by EMMA AI, a reputable platform well proven in the UK. You can set notifications that fire shortly after periods of wastage, so your team can act while it's still fresh.",
      },
    ],
  },
  {
    n: "03",
    label: "Five business days",
    head: "A written readout lands in your inbox.",
    body: "What the readout covers also depends on the plan you choose.",
    levels: [
      {
        tier: "Summary",
        detail: "A plain-English snapshot. How your bill would look on alternative plans, and how much of your cost is driven by peak factor (i.e. what you could save by operating differently, without reducing total usage).",
      },
      {
        tier: "Detailed",
        detail: "Everything in Summary, plus a high-level assessment of site improvements worth considering, and real-time matched CO\u2082 emissions from your electricity use. Supports Scope 2 reporting, and Scope 3 where corporate partners need it.",
      },
    ],
  },
];

export default function SignUp() {
  return (
    <section className="min-h-[calc(100dvh-80px)] border-t border-ink-hairline">
      <div className="grid lg:grid-cols-[1.05fr_1fr] min-h-[calc(100dvh-80px)]">
        {/* Left: editorial panel */}
        <aside className="hidden lg:flex flex-col justify-between bg-paper-2 border-r border-ink-hairline p-2xl-2 relative overflow-hidden">
          <div>
            <p className="eyebrow">Get started · three steps</p>

            <h2
              className="mt-xl-2 font-display text-display-l tracking-display text-ink leading-[1.04] max-w-lg"
              style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 25' }}
            >
              Connect one site. <span className="text-brand">See your meter today.</span>
            </h2>

            <p className="mt-md-2 max-w-md font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
              <span className="dot-live" aria-hidden /> Target flow · post-pilot
            </p>
            <p className="mt-2xs max-w-md text-ui text-ink-muted leading-prose">
              This is how sign-up will run once we've successfully pilot tested
              the end-to-end flow. During early access we set each workspace up
              by hand, usually the same business day.
            </p>

            <ol className="mt-xl-2 max-w-md">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className={`grid grid-cols-[56px_1fr] gap-md-2 py-lg-2 ${
                    i < steps.length - 1 ? "border-b border-ink-hairline" : ""
                  }`}
                >
                  <span
                    className="num font-display text-[32px] leading-none text-ink"
                    style={{ fontVariationSettings: '"wght" 700, "opsz" 64, "GRAD" 0' }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                      {s.label}
                    </p>
                    <h3
                      className="mt-2xs font-display text-[20px] tracking-tightish text-ink leading-[1.2]"
                      style={{ fontVariationSettings: '"wght" 650, "opsz" 36, "GRAD" 0' }}
                    >
                      {s.head}
                    </h3>
                    <p className="mt-2xs text-ui text-ink-muted leading-prose">
                      {s.body}
                    </p>
                    {s.levels && (
                      <ul className="mt-md-2 flex flex-col gap-md-2">
                        {s.levels.map((lv) => (
                          <li
                            key={lv.tier}
                            className="pt-md-2 border-t border-ink-hairline/70"
                          >
                            <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink">
                              {lv.tier}
                            </p>
                            <p className="mt-2xs text-ui text-ink-muted leading-prose">
                              {lv.detail}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Launch offer ribbon */}
          <div className="max-w-md pt-lg-2 border-t border-ink-hairline">
            <p className="eyebrow text-brand">Launch offer · first 20 sites</p>
            <p
              className="mt-2xs font-display text-[20px] tracking-tightish text-ink leading-[1.35]"
              style={{ fontVariationSettings: '"wght" 550, "opsz" 36, "GRAD" 0' }}
            >
              50% off for life for our first 20 sites. Launch customers also get
              a free product walkthrough and extended support.
            </p>
          </div>
        </aside>

        {/* Right: form panel */}
        <div className="flex items-center justify-center p-xl-2 md:p-2xl-2">
          <div className="w-full max-w-[440px]">
            <p className="eyebrow">Sign up · early access</p>
            <h1
              className="mt-md-2 font-display text-display-l tracking-display text-ink leading-[1.04]"
              style={{ fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25' }}
            >
              Connect your <span className="text-brand">first site.</span>
            </h1>
            <p className="mt-md-2 text-body-l text-ink-muted leading-prose">
              We're setting up customer workspaces by hand while we're in early access. Walk the
              demo account first to see what you're getting, then send us a note and we'll
              have yours ready, usually the same business day.
            </p>

            {/* Launch offer: mobile-visible */}
            <div className="mt-xl-2 pt-md-2 border-t border-ink-hairline lg:hidden">
              <p className="font-mono text-micro uppercase tracking-[0.16em] text-brand">
                Launch offer · first 20 sites
              </p>
              <p className="mt-2xs text-ui text-ink leading-prose">
                50% off for life for our first 20 sites. Launch customers also get a free product walkthrough and extended support.
              </p>
            </div>

            {/* Demo: hairline block, no card */}
            <div className="mt-xl-2 pt-md-2 border-t border-ink-hairline">
              <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                Walk the portal · demo account
              </p>
              <dl className="mt-md-2 space-y-xs">
                <div className="grid grid-cols-[96px_1fr] gap-md-2 items-baseline">
                  <dt className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                    Email
                  </dt>
                  <dd className="font-mono text-ui text-ink">{DEMO_EMAIL}</dd>
                </div>
                <div className="grid grid-cols-[96px_1fr] gap-md-2 items-baseline">
                  <dt className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                    Password
                  </dt>
                  <dd className="font-mono text-ui text-ink">{DEMO_PASSWORD}</dd>
                </div>
              </dl>

              <Link to="/sign-in" className="btn-primary w-full mt-lg-2">
                Continue to sign in <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
            </div>

            {/* Production workspace */}
            <div className="mt-xl-2 pt-md-2 border-t border-ink-hairline">
              <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                Set up your workspace
              </p>
              <p className="mt-md-2 text-body-l text-ink-muted leading-prose">
                Skip the demo, just send your site list and we can discuss configuration and help you get started!
              </p>
              <a
                href="mailto:hello@arcadigm.com.au?subject=Workspace%20request"
                className="btn-secondary mt-md-2"
              >
                hello@arcadigm.com.au
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>

            <p className="mt-xl-2 pt-md-2 border-t border-ink-hairline text-ui text-ink-muted">
              Already have access?{" "}
              <Link to="/sign-in" className="text-ink font-medium hover:text-brand underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
