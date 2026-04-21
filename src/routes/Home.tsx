import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <Promise />
      <Pricing />
      <ProjectDelivery />
      <HowItWorks />
      <Evidence />
    </>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function Hero() {
  return (
    <section className="pt-lg-2 md:pt-xl-2 pb-lg-2">
      <div className="container-edit">
        {/* Top row: heading/paragraph on left, launch offer on right */}
        <div className="grid gap-lg-2 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="max-w-[640px]">
            <h1
              className="font-display text-display-xl tracking-display text-ink animate-fade-up"
              style={{
                fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
                animationDelay: "60ms",
                textWrap: "balance",
              }}
            >
              <span className="block">Understand your electricity use.</span>
              <span className="block text-brand">See where you can save.</span>
            </h1>

            <p
              className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
              style={{ animationDelay: "140ms" }}
            >
              Arcadigm gives Australian businesses a clear view of every meter.
              We connect through the Consumer Data Right — your data is in the
              portal the moment you sign up. Want a written readout with
              recommendations? It lands in five business days.
            </p>
          </div>

          {/* Launch offer — right column */}
          <div
            className="animate-fade-up lg:pl-xl-2 lg:border-l lg:border-ink-hairline"
            style={{ animationDelay: "220ms" }}
          >
            <p className="eyebrow" style={{ color: "oklch(0.34 0.075 155)" }}>
              <span className="dot-warn" aria-hidden /> Launch offer · currently in testing
            </p>
            <p className="mt-2xs text-ui text-ink leading-prose">
              <span className="font-mono">50% off</span> your first year of{" "}
              <span className="font-medium">Monitor &amp; Minimise</span> or{" "}
              <span className="font-medium">Develop &amp; Decarbonise</span>.
              Applied at sign-up, no code needed.
            </p>

            <div className="mt-md-2 flex items-center gap-md-2 flex-wrap">
              <Link to="/sign-up" className="btn-primary">
                Get started <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
              <Link to="/sign-up" className="btn-secondary">
                Start free
              </Link>
            </div>
          </div>
        </div>

        {/* Graphic — full width horizontal below */}
        <div
          className="mt-lg-2 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <LiveReadout />
        </div>

        {/* Trust strip */}
        <div
          className="mt-lg-2 pt-md-2 border-t border-ink-hairline animate-fade-up"
          style={{ animationDelay: "440ms" }}
        >
          <div className="grid gap-lg-2 md:grid-cols-[auto_1fr] md:items-end md:gap-2xl-2">
            <div className="grid grid-cols-3 gap-x-xl-2 gap-y-md-2 md:flex md:gap-2xl-2">
              <Metric label="Sites connected" value="47" unit="live" />
              <Metric label="Data points / day" value="2.41" unit="M" />
              <Metric label="Median bill reduction" value="23.4" unit="%" />
            </div>
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint leading-[1.6] md:text-right md:max-w-[320px] md:justify-self-end">
              Figures from Optimal Monitoring (UK) — our monitoring partner. Australian data pending launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex flex-col">
      <span className="eyebrow mb-2xs">{label}</span>
      <span className="flex items-baseline gap-2xs num text-ink">
        <span className="text-[28px] font-medium tracking-tight">{value}</span>
        {unit && <span className="text-caption text-ink-faint">{unit}</span>}
      </span>
    </div>
  );
}

/* ───────────────────────────── LIVE READOUT ───────────────────────────── */

function LiveReadout() {
  return (
    <figure className="relative">
      <div className="relative rounded-xl border border-ink-hairline bg-paper-card p-md-2 shadow-ringed overflow-hidden">
        {/* grid hairlines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <defs>
            <pattern id="grid" width="40" height="28" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 28" fill="none" stroke="oklch(0.86 0.010 130)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.55" />
        </svg>

        <SceneIllustration />

        <div className="relative mt-sm-2 pt-sm-2 border-t border-ink-hairline grid grid-cols-2 md:grid-cols-4 gap-xs">
          <SceneLabel
            n="01"
            label="Your site"
            items={["Warehouse", "Factory", "Retail"]}
          />
          <SceneLabel
            n="02"
            label="Smart meter"
            items={["Read every 30 minutes", "No new hardware", "Consent via CDR"]}
          />
          <SceneLabel
            n="03"
            label="Reports"
            items={["Data analysed", "Reports provided", "Improvements acted on"]}
          />
          <SceneLabel
            n="04"
            label="Lower bill"
            items={["Measured on the meter", "Reported each month"]}
          />
        </div>
      </div>
    </figure>
  );
}

function SceneLabel({ n, label, items }: { n: string; label: string; items: string[] }) {
  return (
    <div className="flex flex-col items-center text-center gap-xs">
      <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink-faint">
        {n}
      </span>
      <span
        className="font-display text-[22px] tracking-tightish text-ink leading-[1.2]"
        style={{ fontVariationSettings: '"wght" 700, "opsz" 36, "GRAD" 0' }}
      >
        {label}
      </span>
      <ul className="mt-xs text-left flex flex-col gap-[5px] text-[15px] text-ink-muted leading-snug">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span
              className="w-[4px] h-[4px] rounded-full bg-brand shrink-0 mt-[8px]"
              aria-hidden
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SceneIllustration() {
  // viewBox: 1200 x 240 — icons centered on 4-column grid below (centers at x=150, 450, 750, 1050)
  return (
    <div className="relative">
      <svg
        viewBox="0 0 1200 240"
        className="w-full aspect-[5/1]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* ground line */}
        <line
          x1="30"
          y1="200"
          x2="1170"
          y2="200"
          stroke="oklch(0.86 0.010 130)"
          strokeWidth="0.8"
        />

        {/* Warehouse (col 1, center x=150): sawtooth roof, 3 loading bays */}
        <g transform="translate(75 90)">
          {/* Sawtooth roof, 5 peaks */}
          <polygon points="0,40 0,14 30,40" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="30,40 30,14 60,40" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="60,40 60,14 90,40" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="90,40 90,14 120,40" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="120,40 120,14 150,40" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" strokeLinejoin="round" />

          {/* North-facing glazing strip on each sawtooth */}
          <rect x="0" y="14" width="3" height="26" fill="oklch(0.86 0.010 130)" opacity="0.7" />
          <rect x="30" y="14" width="3" height="26" fill="oklch(0.86 0.010 130)" opacity="0.7" />
          <rect x="60" y="14" width="3" height="26" fill="oklch(0.86 0.010 130)" opacity="0.7" />
          <rect x="90" y="14" width="3" height="26" fill="oklch(0.86 0.010 130)" opacity="0.7" />
          <rect x="120" y="14" width="3" height="26" fill="oklch(0.86 0.010 130)" opacity="0.7" />

          {/* Body */}
          <rect x="0" y="40" width="150" height="70" fill="oklch(0.995 0.004 90)" stroke="oklch(0.22 0.018 150)" strokeWidth="1.4" />

          {/* Loading bay 1 */}
          <rect x="10" y="62" width="38" height="48" fill="oklch(0.940 0.010 88)" stroke="oklch(0.22 0.018 150)" strokeWidth="1" />
          <path d="M 10 72 L 48 72 M 10 82 L 48 82 M 10 92 L 48 92 M 10 102 L 48 102" stroke="oklch(0.62 0.010 140)" strokeWidth="0.5" />

          {/* Loading bay 2 */}
          <rect x="56" y="62" width="38" height="48" fill="oklch(0.940 0.010 88)" stroke="oklch(0.22 0.018 150)" strokeWidth="1" />
          <path d="M 56 72 L 94 72 M 56 82 L 94 82 M 56 92 L 94 92 M 56 102 L 94 102" stroke="oklch(0.62 0.010 140)" strokeWidth="0.5" />

          {/* Loading bay 3 */}
          <rect x="102" y="62" width="38" height="48" fill="oklch(0.940 0.010 88)" stroke="oklch(0.22 0.018 150)" strokeWidth="1" />
          <path d="M 102 72 L 140 72 M 102 82 L 140 82 M 102 92 L 140 92 M 102 102 L 140 102" stroke="oklch(0.62 0.010 140)" strokeWidth="0.5" />

          {/* Wall vents */}
          <rect x="4" y="46" width="6" height="3" fill="none" stroke="oklch(0.62 0.010 140)" strokeWidth="0.6" />
          <rect x="142" y="46" width="4" height="3" fill="none" stroke="oklch(0.62 0.010 140)" strokeWidth="0.6" />

          {/* Label */}
          <text
            x="75"
            y="130"
            textAnchor="middle"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="9"
            letterSpacing="1.4"
            fill="oklch(0.62 0.010 140)"
          >
            YOUR SITE
          </text>
        </g>

        {/* ── All three data cables (drawn behind dot and icons) ── */}
        <path
          d="M 225 185 C 300 185, 350 150, 410 150"
          stroke="oklch(0.34 0.075 155)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 490 150 Q 517 138 545 150 T 600 150 T 655 150 T 710 150"
          stroke="oklch(0.34 0.075 155)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 790 150 C 880 150, 910 50, 965 40"
          stroke="oklch(0.34 0.075 155)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Single traveling pulse — passes behind meter, reports, chart ── */}
        <circle r="2.4" fill="oklch(0.34 0.075 155)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M 225 185 C 300 185, 350 150, 410 150 L 490 150 Q 517 138 545 150 T 600 150 T 655 150 T 710 150 L 790 150 C 880 150, 910 50, 965 40"
          />
        </circle>

        {/* ── Smart meter (col 2, center x=450) ── */}
        <g transform="translate(410 120)">
          <rect
            x="0"
            y="0"
            width="80"
            height="60"
            rx="4"
            fill="oklch(0.995 0.004 90)"
            stroke="oklch(0.22 0.018 150)"
            strokeWidth="1.4"
          />
          {/* screen */}
          <rect
            x="8"
            y="10"
            width="64"
            height="22"
            rx="2"
            fill="oklch(0.22 0.018 150)"
          />
          {/* LCD segments */}
          <text
            x="40"
            y="26"
            textAnchor="middle"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="13"
            fontWeight="600"
            fill="oklch(0.97 0.012 100)"
            letterSpacing="1"
          >
            ◼︎ ◼︎ ◼︎
          </text>
          {/* indicator dots */}
          <circle cx="14" cy="44" r="2" fill="oklch(0.34 0.075 155)" />
          <circle cx="24" cy="44" r="2" fill="oklch(0.86 0.010 130)" />
          <circle cx="34" cy="44" r="2" fill="oklch(0.86 0.010 130)" />
          {/* "live" blink */}
          <circle cx="14" cy="44" r="2" fill="oklch(0.34 0.075 155)">
            <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          {/* rail label */}
          <text
            x="66"
            y="49"
            textAnchor="end"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="7"
            letterSpacing="1.2"
            fill="oklch(0.62 0.010 140)"
          >
            METER
          </text>
        </g>

        {/* ── Reports (col 3, center x=750) ── */}
        <g transform="translate(710 120)">
          <rect
            x="0"
            y="0"
            width="80"
            height="60"
            rx="4"
            fill="oklch(0.995 0.004 90)"
            stroke="oklch(0.22 0.018 150)"
            strokeWidth="1.4"
          />
          {/* folded corner */}
          <path
            d="M 68 0 L 80 12 L 68 12 Z"
            fill="oklch(0.940 0.010 88)"
            stroke="oklch(0.22 0.018 150)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <line x1="68" y1="0" x2="68" y2="12" stroke="oklch(0.22 0.018 150)" strokeWidth="1" />

          {/* title bar */}
          <rect x="8" y="10" width="44" height="4" fill="oklch(0.22 0.018 150)" />

          {/* body text lines */}
          <rect x="8" y="19" width="54" height="1.4" fill="oklch(0.22 0.018 150)" opacity="0.3" />
          <rect x="8" y="24" width="62" height="1.4" fill="oklch(0.22 0.018 150)" opacity="0.3" />
          <rect x="8" y="29" width="48" height="1.4" fill="oklch(0.22 0.018 150)" opacity="0.3" />

          {/* mini sparkline — trending down */}
          <path
            d="M 8 42 C 20 39, 30 41, 40 40 C 50 39, 58 35, 66 33"
            stroke="oklch(0.34 0.075 155)"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* pulse dot */}
          <circle cx="66" cy="33" r="1.8" fill="oklch(0.34 0.075 155)">
            <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* rail label */}
          <text
            x="72"
            y="54"
            textAnchor="end"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="7"
            letterSpacing="1.2"
            fill="oklch(0.62 0.010 140)"
          >
            REPORTS
          </text>
        </g>

        {/* ── Chart (col 4, center x=1050): electricity going down ── */}
        <g transform="translate(965 10)">
          {/* chart frame */}
          <line x1="0" y1="0" x2="0" y2="170" stroke="oklch(0.86 0.010 130)" strokeWidth="0.6" />
          <line x1="0" y1="170" x2="170" y2="170" stroke="oklch(0.86 0.010 130)" strokeWidth="0.6" />

          {/* baseline dashed */}
          <path
            d="M 0 30 L 170 30"
            stroke="oklch(0.62 0.010 140)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            fill="none"
          />
          <text
            x="170"
            y="22"
            textAnchor="end"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="7"
            letterSpacing="1.2"
            fill="oklch(0.62 0.010 140)"
          >
            BASELINE
          </text>

          {/* descending line (the saving) — area fill first */}
          <path
            d="M 0 30 C 28 40, 48 52, 68 62 C 92 74, 116 104, 140 128 C 152 140, 162 148, 170 154 L 170 170 L 0 170 Z"
            fill="oklch(0.34 0.075 155)"
            opacity="0.08"
          />
          <path
            d="M 0 30 C 28 40, 48 52, 68 62 C 92 74, 116 104, 140 128 C 152 140, 162 148, 170 154"
            stroke="oklch(0.34 0.075 155)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* end dot */}
          <circle cx="170" cy="154" r="3" fill="oklch(0.34 0.075 155)" />
          <circle cx="170" cy="154" r="6" fill="none" stroke="oklch(0.34 0.075 155)" strokeWidth="0.6" opacity="0.5">
            <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
          </circle>

          {/* saving arrow */}
          <path
            d="M 120 50 L 120 140 M 120 140 L 115 132 M 120 140 L 125 132"
            stroke="oklch(0.22 0.018 150)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="126"
            y="100"
            fontFamily="Bricolage Grotesque, ui-sans-serif, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="oklch(0.22 0.018 150)"
          >
            saving
          </text>

          {/* chart label */}
          <text
            x="0"
            y="186"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="7"
            letterSpacing="1.2"
            fill="oklch(0.62 0.010 140)"
          >
            ELECTRICITY · OVER TIME
          </text>
        </g>
      </svg>
    </div>
  );
}


/* ─────────────────────────────── PROMISE ─────────────────────────────── */

function Promise() {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <p className="eyebrow">What we do</p>
        <p
          className="mt-md-2 font-display text-display-l tracking-display leading-[1.05] text-ink max-w-[880px]"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" -25' }}
        >
          Electricity shouldn't be complicated.{" "}
          <span className="text-ink-muted">We help you understand:</span>
        </p>
        <ul className="mt-xl-2 max-w-[880px] border-t border-ink-hairline">
          {[
            "Are you on a good electricity contract?",
            "What can you do without spending to reduce your energy bills?",
            "What would the highest-impact projects look like if you want to reduce your energy spend?",
          ].map((q, i) => (
            <li
              key={q}
              className="grid grid-cols-[48px_1fr] gap-md-2 py-lg-2 border-b border-ink-hairline"
            >
              <span className="num font-mono text-caption uppercase tracking-[0.16em] text-ink-faint pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display text-display-m tracking-tightish text-ink-muted leading-[1.15]"
                style={{ fontVariationSettings: '"wght" 600, "opsz" 64, "GRAD" 0' }}
              >
                {q}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────── PRICING ─────────────────────────────── */

type Tier = {
  key: "free" | "mm" | "dd";
  name: string;
  tagline: string;
  year1: string;
  year1Note: string;
  ongoing?: string;
  cta: { label: string; href: string; variant: "primary" | "secondary" };
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    key: "free",
    name: "Free",
    tagline: "Assess your usage and compare to other contracts.",
    year1: "$0",
    year1Note: "always — no card required",
    cta: { label: "Start for free", href: "/sign-up", variant: "secondary" },
  },
  {
    key: "mm",
    name: "Monitor & Minimise",
    tagline: "Identify, enact and monitor no-spend steps to reduce your consumption.",
    year1: "$900",
    year1Note: "per site · year one",
    ongoing: "$1,800 / year thereafter",
    cta: { label: "Start monitoring", href: "/sign-up", variant: "primary" },
    highlight: true,
  },
  {
    key: "dd",
    name: "Develop & Decarbonise",
    tagline: "Understand your electricity's emissions, with support to decide what projects to investigate and how to deliver them.",
    year1: "$1,600",
    year1Note: "per site · year one",
    ongoing: "$3,200 / year thereafter",
    cta: { label: "Start decarbonising", href: "/sign-up", variant: "secondary" },
  },
];

type FeatureRow = {
  group: string;
  label: string;
  free: boolean;
  mm: boolean;
  dd: boolean;
};

const featureMatrix: FeatureRow[] = [
  // Connect
  { group: "Connect", label: "CDR connection to your retailer", free: true, mm: true, dd: true },
  { group: "Connect", label: "30-minute meter data, back-filled*", free: true, mm: true, dd: true },
  // Portal
  { group: "Portal", label: "Portal access — simple view", free: true, mm: true, dd: true },
  { group: "Portal", label: "Anomaly alerts, with notifications", free: false, mm: true, dd: true },
  { group: "Portal", label: "AI-identified savings (EMMA AI)", free: false, mm: true, dd: true },
  { group: "Portal", label: "Project assessment tools in the portal", free: false, mm: true, dd: true },
  { group: "Portal", label: "Live grid emissions matching", free: false, mm: false, dd: true },
  // Report
  { group: "Report", label: "Contract comparison report", free: true, mm: true, dd: true },
  { group: "Report", label: "Peak-factor cost breakdown", free: true, mm: true, dd: true },
  { group: "Report", label: "Automated tariff checks, with notifications", free: false, mm: false, dd: true },
  { group: "Report", label: "AASB-compliant report output", free: false, mm: false, dd: true },
  { group: "Report", label: "Shortlisted projects with engineer descriptions", free: false, mm: false, dd: true },
];

const groupOrder = ["Connect", "Portal", "Report"] as const;

function Pricing() {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline" id="pricing">
      <div className="container-edit">
        <header className="mb-xl-2">
          <p className="eyebrow">Plans · annual pricing</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display leading-[1.02] text-ink max-w-3xl"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            Three ways to work with us.
          </h2>
          <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
            Every plan gets a CDR connection, portal access, and a report.
            Start on Free. Launch customers
            pay half-price on both paid plans for the first year.
          </p>
        </header>

        <div className="overflow-x-auto -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr className="border-y border-ink-hairline align-bottom">
                <th scope="col" className="text-left py-sm-2 pr-md-2 w-[34%]">
                  <p className="eyebrow">Compare plans</p>
                </th>
                {tiers.map((t) => (
                  <th
                    key={t.key}
                    scope="col"
                    className={`text-left align-bottom py-sm-2 px-md-2 w-[22%] ${
                      t.highlight ? "bg-paper-card" : ""
                    }`}
                  >
                    <h3
                      className="font-display text-[20px] tracking-tightish text-ink leading-[1.15]"
                      style={{ fontVariationSettings: '"wght" 700, "opsz" 36, "GRAD" 0' }}
                    >
                      {t.name}
                    </h3>
                    <div className="mt-xs pt-xs border-t border-ink-hairline/70">
                      <p className="flex items-baseline gap-xs">
                        <span className="num text-[26px] font-medium text-ink leading-none">
                          {t.year1}
                        </span>
                        <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-faint">
                          {t.year1Note}
                        </span>
                      </p>
                      {t.ongoing && (
                        <p className="mt-2xs text-caption text-ink-muted num">
                          {t.ongoing}
                        </p>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groupOrder.flatMap((g) => {
                const rows = featureMatrix.filter((r) => r.group === g);
                return [
                  <tr key={`g-${g}`}>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="text-left pt-sm-2 pb-2xs"
                    >
                      <span className="eyebrow">{g}</span>
                    </th>
                  </tr>,
                  ...rows.map((r, i) => (
                    <tr
                      key={`${g}-${i}`}
                      className="border-t border-ink-hairline/70"
                    >
                      <th
                        scope="row"
                        className="text-left font-normal py-xs pr-md-2 text-ui text-ink leading-[1.35]"
                      >
                        {r.label}
                      </th>
                      <TickCell on={r.free} />
                      <TickCell on={r.mm} highlight />
                      <TickCell on={r.dd} />
                    </tr>
                  )),
                ];
              })}

              <tr className="border-t border-ink-hairline">
                <td className="py-sm-2 pr-md-2" />
                {tiers.map((t) => (
                  <td
                    key={t.key}
                    className={`py-sm-2 px-md-2 align-top ${t.highlight ? "bg-paper-card" : ""}`}
                  >
                    <PricingCTA tier={t} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-lg-2 text-caption text-ink-faint max-prose leading-prose">
          *We access data through the CDR (Consumer Data Right) process. This
          requires opt-in for digital meter readings.
        </p>
        <p className="mt-xs text-caption text-ink-faint max-prose leading-prose">
          Pricing is per NMI (meter) and billed annually. Portfolios of ten or
          more sites get volume pricing. Ask us.
        </p>
      </div>
    </section>
  );
}

function TickCell({ on, highlight = false }: { on: boolean; highlight?: boolean }) {
  return (
    <td
      className={`py-xs px-md-2 align-middle w-[22%] ${
        highlight ? "bg-paper-card" : ""
      }`}
    >
      {on ? (
        <Check
          className="w-[16px] h-[16px] text-brand"
          strokeWidth={2}
          aria-label="Included"
        />
      ) : (
        <span
          className="block w-[16px] h-px bg-ink-hairline"
          aria-label="Not included"
          role="img"
        />
      )}
    </td>
  );
}

function PricingCTA({ tier }: { tier: Tier }) {
  const isExternal = tier.cta.href.startsWith("mailto:") || tier.cta.href.startsWith("http");
  const cls = `${tier.cta.variant === "primary" ? "btn-primary" : "btn-secondary"} w-full justify-center`;
  const inner = (
    <>
      {tier.cta.label} <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
    </>
  );
  return isExternal ? (
    <a href={tier.cta.href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={tier.cta.href} className={cls}>
      {inner}
    </Link>
  );
}

/* ─────────────────────────── PROJECT DELIVERY ─────────────────────────── */

function ProjectDelivery() {
  return (
    <section className="py-3xl-2 border-t border-ink-hairline" id="project-delivery">
      <div className="container-edit">
        <header className="mb-xl-2">
          <p className="eyebrow">Project delivery · separate service</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display leading-[1.02] text-ink max-w-3xl"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            We can help you deliver the projects, too.{" "}
            <span className="text-ink-muted">Zero upfront capex.</span>
          </h2>
          <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
            Once a shortlist is worth building, we can help you build it. You
            don't need to lay out capital; our fee comes out of what the meter
            actually saves. We're growing a database of customer sites so we
            can negotiate competitive rates with engineers, delivering a high,
            consistent standard across every project.
          </p>
        </header>

        <div className="flex flex-wrap gap-md-2">
          <a
            href="mailto:hello@arcadigm.com.au?subject=Project%20delivery"
            className="btn-primary"
          >
            Talk to us <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */

const steps = [
  {
    index: "01",
    title: "Sign up",
    lede: "Two-click consent through Fiskil. No hardware, no site visit. Your portal is ready in minutes, and your historic data back-fills within the hour.",
    meta: ["About 2 minutes", "No hardware", "Consumer Data Right"],
    align: "left" as const,
  },
  {
    index: "02",
    title: "Explore your data",
    lede: "Every site, every 30 minutes, tariff-aware and weather-normalised. Browse on your own, or let us walk you through what we're seeing.",
    meta: ["Live portal", "Weather-normalised", "Tariff overlay"],
    align: "right" as const,
  },
  {
    index: "03",
    title: "Get your written readout",
    lede: "Want more than the portal? Within five business days you'll have a written report per site — what's working, what isn't, and what it's worth to fix.",
    meta: ["5 business days", "Per-site plan", "Payback estimates"],
    align: "left" as const,
  },
];

function HowItWorks() {
  return (
    <section className="py-xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <header className="mb-lg-2">
          <p className="eyebrow">How it works</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display leading-[1.02] text-ink max-w-3xl"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            From sign-up to a clear plan, in a week.
          </h2>
          <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
            Your data is in the portal the moment you sign up. If you'd like
            a human to walk you through it, that takes five business days.
          </p>
        </header>

        <ol className="flex flex-col gap-xl-2">
          {steps.map((a) => (
            <Step key={a.index} {...a} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  lede,
  meta,
  align,
}: {
  index: string;
  title: string;
  lede: string;
  meta: string[];
  align: "left" | "right";
}) {
  return (
    <li
      className={`grid gap-md-2 md:gap-lg-2 items-start ${
        align === "left"
          ? "md:grid-cols-[1fr_1.6fr]"
          : "md:grid-cols-[1.6fr_1fr] md:[&>*:first-child]:order-2"
      }`}
    >
      <div className="flex md:flex-col items-baseline md:items-start gap-md-2 md:gap-2xs">
        <span
          className="num font-display text-[56px] leading-none text-ink-hairline"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" -50' }}
        >
          {index}
        </span>
        <span className="eyebrow">Step · {title}</span>
      </div>

      <div>
        <h3
          className="font-display text-display-m tracking-display leading-[1.05] text-ink"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 64, "GRAD" 0' }}
        >
          {title}.
        </h3>
        <p className="mt-sm-2 text-body-l text-ink-muted max-prose leading-prose">{lede}</p>

        <ul className="mt-md-2 flex flex-wrap gap-2xs">
          {meta.map((m) => (
            <li key={m} className="chip">
              <span className="dot-live" style={{ width: 6, height: 6 }} aria-hidden />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ─────────────────────────────── EVIDENCE ─────────────────────────────── */

const evidence = [
  {
    kicker: "EMMA AI · UK · Cambridge",
    sector: "Cambridge institution · mixed-use estate",
    head: "Hidden waste in a mixed-use estate, priced in pounds.",
    body: "EMMA pulled billing, BMS, solar and sub-meter data across offices, production and learning spaces — surfacing out-of-hours HVAC, bad time clocks, and inefficient AHU cycles. Every anomaly came priced, so facilities could act the same week.",
    metrics: [
      { value: "8", unit: "£k / yr", label: "per fix" },
      { value: "45", unit: "%", label: "emissions cut" },
      { value: "3", unit: "sites", label: "in pilot" },
    ],
    source: "https://optimalmonitoring.com/project/ai-energy-management-in-action-how-intelligent-monitoring-uncovered-hidden-waste-and-cut-costs-in-cambridge/",
  },
  {
    kicker: "EMMA AI · UK · HTEC",
    sector: "HTEC · 46k sq ft HQ · Southampton",
    head: "£5,000 in annual savings, found in the first month.",
    body: "HTEC's mixed-use headquarters blends manufacturing with sub-tenants — and had no visibility into who used what. EMMA split the site into 11 monitored zones (lighting, HVAC, IT, production), surfacing savings within weeks and making sub-tenant billing fair.",
    metrics: [
      { value: "5", unit: "£k / yr", label: "found in month 1" },
      { value: "11", unit: "zones", label: "sub-metered" },
    ],
    source: "https://optimalmonitoring.com/project/htec-cuts-energy-costs-and-improves-tenant-billing-with-data-driven-energy-monitoring/",
  },
];

function Evidence() {
  return (
    <section className="py-3xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <header className="mb-2xl-2">
          <p className="eyebrow">Results</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display leading-[1.02] text-ink max-w-3xl"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            What EMMA AI has found.
          </h2>
          <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
            These are case studies from{" "}
            <a
              href="https://optimalmonitoring.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink font-medium underline-offset-4 hover:underline"
            >
              Optimal Group
            </a>
            , our UK monitoring partner. They are not Arcadigm customers. Their
            EMMA AI engine identified the savings and measured each one on the
            meter. Arcadigm now runs the same engine on Australian sites.
          </p>
        </header>

        <div className="grid gap-2xl-2 md:gap-3xl-2">
          {evidence.map((e, i) => (
            <article
              key={e.kicker}
              className={`grid gap-lg-2 md:gap-xl-2 pb-xl-2 ${
                i < evidence.length - 1 ? "border-b border-ink-hairline" : ""
              } md:grid-cols-[1fr_1.4fr]`}
            >
              <div>
                <p className="eyebrow">{e.kicker}</p>
                <p
                  className="mt-xs font-display text-[20px] tracking-tightish text-ink-muted"
                  style={{ fontVariationSettings: '"wght" 500, "opsz" 36, "GRAD" 0' }}
                >
                  {e.sector}
                </p>

                <div
                  className="mt-lg-2 grid gap-md-2 pt-md-2 border-t border-ink-hairline"
                  style={{ gridTemplateColumns: `repeat(${e.metrics.length}, minmax(0, 1fr))` }}
                >
                  {e.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-2xs">
                      <span className="num text-[28px] font-medium text-ink leading-none">
                        {m.value}
                      </span>
                      <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-faint">
                        {m.unit} · {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="font-display text-display-m tracking-display leading-[1.04] text-ink"
                  style={{ fontVariationSettings: '"wght" 600, "opsz" 64, "GRAD" 0' }}
                >
                  {e.head}
                </h3>
                <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
                  {e.body}
                </p>
                <a
                  href={e.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-md-2 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.16em] text-ink-faint hover:text-ink transition-colors"
                >
                  Read on optimalmonitoring.com
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-xl-2 pt-lg-2 border-t border-ink-hairline flex flex-wrap items-center justify-between gap-md-2">
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
            Case studies © Optimal Group (UK). Reproduced with permission.
          </p>
          <div className="flex flex-wrap items-center gap-md-2">
            <Link to="/about" className="btn-secondary">
              Learn about Arcadigm
            </Link>
            <Link to="/sign-up" className="btn-primary">
              Get started <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

