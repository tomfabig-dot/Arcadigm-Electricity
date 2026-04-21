import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function TrackRecord() {
  return (
    <>
      <Header />
      <LedgerStrip />
      <Case
        file="Case · A"
        sector="Cold-store logistics · 24/7 · Victoria"
        head="Backup compressors were running through the most expensive window of the night."
        body="A distribution hub with a large electricity bill suspected their compressors weren't running on schedule. A few weeks after connecting, the portal showed backup units firing up during the peak tariff window, five nights a week. Our engineer adjusted the control strategy on site — no new equipment needed, and the change showed on the meter the following month."
        metrics={[
          { v: "148", u: "k AUD / yr", l: "annual saving" },
          { v: "5.0", u: "months", l: "payback" },
          { v: "100", u: "%", l: "measured on the meter" },
          { v: "0", u: "capex", l: "controls only" },
        ]}
      />
      <Case
        file="Case · B"
        sector="National fashion retailer · 34 sites"
        head="Store HVAC was being overridden overnight across a third of the estate."
        body="Store managers were manually overriding after-hours temperature settings. We identified the eleven worst offenders in the first week and sent a simple alert to the operations director. Later we managed an estate-wide lighting upgrade — quoted, installed, commissioned, and reported on the same meter feed we started with."
        metrics={[
          { v: "18.2", u: "%", l: "consumption reduction" },
          { v: "412", u: "MWh / yr", l: "removed" },
          { v: "34", u: "sites", l: "in program" },
          { v: "9.4", u: "months", l: "blended payback" },
        ]}
        reversed
      />
      <Case
        file="Case · C"
        sector="Food manufacturer · single site · SA"
        head="A quiet drift on the main supply was showing up as a quarterly penalty."
        body="Not every fix is a big project. The portal flagged a slow power-factor drift on the main supply, which was being charged back as a quarterly penalty on the bill. We installed correction over one weekend. The penalty line was gone from the next invoice."
        metrics={[
          { v: "12.8", u: "k AUD / yr", l: "penalty removed" },
          { v: "1", u: "weekend", l: "install" },
          { v: "100", u: "%", l: "measured on the meter" },
          { v: "3.2", u: "months", l: "payback" },
        ]}
      />
      <BottomCTA />
    </>
  );
}

function Header() {
  return (
    <section className="pt-xl-2 md:pt-2xl-2 pb-xl-2">
      <div className="container-edit">
        <p className="eyebrow animate-fade-up">Results · three customers</p>
        <h1
          className="mt-md-2 font-display text-display-xl tracking-display text-ink max-w-3xl animate-fade-up"
          style={{
            fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
            animationDelay: "60ms",
          }}
        >
          Savings we can point to on <span className="text-brand">the meter.</span>
        </h1>
        <p
          className="mt-lg-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Customer names withheld. Every number below was measured against that
          site's own pre-project baseline, adjusted for weather, and reconciled
          on the electricity bill.
        </p>
      </div>
    </section>
  );
}

const ledger = [
  { v: "47", u: "", l: "Sites connected" },
  { v: "$4.1", u: "M", l: "Savings measured" },
  { v: "23.4", u: "%", l: "Median bill reduction" },
  { v: "22", u: "", l: "Projects delivered" },
  { v: "6.8", u: "months", l: "Median payback" },
  { v: "100", u: "%", l: "Measured on the meter" },
];

function LedgerStrip() {
  return (
    <section className="py-xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-lg-2 md:gap-x-0">
          {ledger.map((s, i) => (
            <div
              key={s.l}
              className={`pl-md-2 md:pl-lg-2 ${
                i > 0 ? "md:border-l md:border-ink-hairline" : ""
              }`}
            >
              <p className="num text-[36px] font-medium text-ink leading-none tracking-tight">
                {s.v}
                {s.u && <span className="text-ink-faint text-[18px] ml-1">{s.u}</span>}
              </p>
              <p className="mt-xs font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Case({
  file,
  sector,
  head,
  body,
  metrics,
  reversed,
}: {
  file: string;
  sector: string;
  head: string;
  body: string;
  metrics: { v: string; u: string; l: string }[];
  reversed?: boolean;
}) {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <article
          className={`grid gap-lg-2 md:gap-xl-2 md:grid-cols-[1fr_1.4fr] ${
            reversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <p className="eyebrow">{file}</p>
            <p
              className="mt-xs font-display text-[20px] tracking-tightish text-ink-muted"
              style={{ fontVariationSettings: '"wght" 500, "opsz" 36, "GRAD" 0' }}
            >
              {sector}
            </p>

            <dl className="mt-lg-2 grid grid-cols-2 gap-md-2 pt-md-2 border-t border-ink-hairline">
              {metrics.map((m) => (
                <div key={m.l} className="flex flex-col gap-2xs">
                  <dt className="font-mono text-micro uppercase tracking-[0.14em] text-ink-faint order-2">
                    {m.u && `${m.u} · `}
                    {m.l}
                  </dt>
                  <dd className="num text-[28px] font-medium text-ink leading-none order-1">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2
              className="font-display text-display-m tracking-display text-ink leading-[1.08]"
              style={{ fontVariationSettings: '"wght" 650, "opsz" 64, "GRAD" 0' }}
            >
              {head}
            </h2>
            <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">{body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-3xl-2 border-t border-ink-hairline">
      <div className="container-edit grid gap-lg-2 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2
          className="font-display text-display-l tracking-display text-ink leading-[1.04] max-w-2xl"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 25' }}
        >
          Curious what your own meter would show?
        </h2>
        <div className="flex flex-wrap gap-md-2 md:justify-end">
          <Link to="/sign-up" className="btn-primary">
            Start free <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
          <Link to="/process" className="btn-secondary">
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
