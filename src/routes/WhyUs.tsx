import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function WhyUs() {
  return (
    <>
      <Header />
      <Comparison />
      <BottomCTA />
    </>
  );
}

function Header() {
  return (
    <section className="pt-xl-2 md:pt-2xl-2 pb-xl-2">
      <div className="container-edit">
        <p className="eyebrow animate-fade-up">Why Arcadigm · how we work</p>
        <h1
          className="mt-md-2 font-display text-display-xl tracking-display text-ink max-w-3xl animate-fade-up leading-[1.05]"
          style={{
            fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
            animationDelay: "60ms",
          }}
        >
          Constant monitoring.{" "}
          <span className="text-brand">Continual improvement.</span>
        </h1>
        <p
          className="mt-lg-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          We provide an easy and supportive pathway to better understanding
          your electricity and what steps you can take to reduce it.
        </p>
      </div>
    </section>
  );
}

/* Two approaches, paired row-by-row so the contrast is unmistakable */

const rows = [
  {
    dimension: "Data",
    old: {
      h: "Annual audit",
      b: "A consultant reviews your site once and writes a report. Good snapshot of that week, less helpful for anything that changes after.",
    },
    neu: {
      h: "Live readings",
      b: "Your meter reads every 30 minutes and we watch them. The portal shows what's happening now, not what was true three months ago.",
    },
  },
  {
    dimension: "Reporting",
    old: {
      h: "Findings on paper",
      b: "Drift between audits is invisible. If a plant starts running overnight in month two, you'll see it on the bill first.",
    },
    neu: {
      h: "Notifications, with periodic reporting",
      b: "Anomalies are reported as notifications when they happen, with the dollar impact next to each one to facilitate change. Routine reports and detailed data to underpin future investment decisions.",
    },
  },
  {
    dimension: "Delivery",
    old: {
      h: "You run delivery",
      b: "Recommendations are handed to you. Your team manages quotes, contractors, and the install.",
    },
    neu: {
      h: "We help you organise delivery",
      b: "When a project makes sense, we help connect you with our trusted engineering partners to simplify the process to get a quote and install. This integrated approach means you aren't chasing contractors.",
    },
  },
  {
    dimension: "Verification",
    old: {
      h: "Savings reported on paper",
      b: "Claimed savings live in the spreadsheet. Whether the meter actually agrees is a later question.",
    },
    neu: {
      h: "Monitor change",
      b: "Ongoing data connection allows you to monitor how implementing a project has impacted your electricity use.",
    },
  },
];

function Comparison() {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <header className="mb-xl-2 max-w-3xl">
          <p className="eyebrow">Two approaches, side by side</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display text-ink leading-[1.05]"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            A report every quarter, or a live feed?
          </h2>
          <p className="mt-md-2 text-body-l text-ink-muted leading-prose">
            Four dimensions where the usual setup and ours look different.
            Same site, same meter, different plumbing.
          </p>
        </header>

        {/* Desktop column headers */}
        <div className="hidden md:grid grid-cols-[120px_1fr_1fr] gap-lg-2 pb-md-2 border-b border-ink-hairline">
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-ink-faint">
            Dimension
          </span>
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-ink-faint">
            The usual way
          </span>
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-brand inline-flex items-center gap-1.5">
            <span className="dot-live" aria-hidden />
            Arcadigm
          </span>
        </div>

        <ol className="flex flex-col">
          {rows.map((r, i) => (
            <li
              key={r.dimension}
              className={`grid gap-lg-2 py-xl-2 md:grid-cols-[120px_1fr_1fr] ${
                i < rows.length - 1 ? "border-b border-ink-hairline" : ""
              }`}
            >
              {/* Dimension marker */}
              <div className="md:pt-1">
                <span className="num font-mono text-caption uppercase tracking-[0.18em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="mt-xs font-display text-[22px] tracking-tightish text-ink"
                  style={{ fontVariationSettings: '"wght" 600, "opsz" 36, "GRAD" 0' }}
                >
                  {r.dimension}
                </p>
              </div>

              {/* The usual way (muted, lighter, no accent) */}
              <div className="md:pr-lg-2 opacity-80">
                <p className="md:hidden font-mono text-micro uppercase tracking-[0.18em] text-ink-faint mb-2xs">
                  The usual way
                </p>
                <h3
                  className="font-display text-[18px] tracking-tightish text-ink-muted"
                  style={{ fontVariationSettings: '"wght" 500, "opsz" 36, "GRAD" 0' }}
                >
                  {r.old.h}
                </h3>
                <p className="mt-2xs text-ui text-ink-faint leading-prose">
                  {r.old.b}
                </p>
              </div>

              {/* Arcadigm (full contrast, live dot, stronger weight) */}
              <div className="md:pl-lg-2 md:border-l md:border-ink-hairline">
                <p className="md:hidden font-mono text-micro uppercase tracking-[0.18em] text-brand mb-2xs inline-flex items-center gap-1.5">
                  <span className="dot-live" aria-hidden />
                  Arcadigm
                </p>
                <h3
                  className="font-display text-[20px] tracking-tightish text-ink"
                  style={{ fontVariationSettings: '"wght" 700, "opsz" 36, "GRAD" 0' }}
                >
                  {r.neu.h}
                </h3>
                <p className="mt-2xs text-ui text-ink leading-prose">
                  {r.neu.b}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-3xl-2 border-t border-ink-hairline">
      <div className="container-edit grid gap-lg-2 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2
          className="font-display text-display-l tracking-display leading-[1.04] text-ink max-w-2xl"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 25' }}
        >
          See how it looks on a working meter.
        </h2>
        <div className="flex flex-wrap gap-md-2 md:justify-end">
          <Link to="/process" className="btn-primary">
            See how it works <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
          <Link to="/sign-up" className="btn-secondary">
            Start free <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
