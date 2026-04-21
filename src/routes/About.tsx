import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <>
      <Header />
      <Narrative />
      <FactFile />
    </>
  );
}

function Header() {
  return (
    <section className="pt-xl-2 md:pt-2xl-2 pb-xl-2">
      <div className="container-edit">
        <p className="eyebrow animate-fade-up">About · who we are</p>
        <h1
          className="mt-md-2 font-display text-display-xl tracking-display text-ink max-w-3xl animate-fade-up"
          style={{
            fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
            animationDelay: "60ms",
          }}
        >
          A small team helping Australian businesses <span className="text-brand">understand their electricity.</span>
        </h1>
        <p
          className="mt-lg-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          We work with businesses that are big enough for electricity to show up
          on the P&L, but not so big that hiring a full-time energy manager
          makes sense. That's who we built Arcadigm for.
        </p>
      </div>
    </section>
  );
}

const chapters = [
  {
    num: "01",
    head: "You already watch the bill. We help you understand it.",
    body: "Most businesses we work with are already keeping an eye on their electricity spend — they just don't have the time or tools to see where it's going. Our job is to take your own meter data and give it back to you in a form you can actually use.",
  },
  {
    num: "02",
    head: "A service, not a software subscription.",
    body: "The portal is how we show you what's happening. The work itself is a person reading your data and writing you back in plain English. If a project is worth doing, we can scope, quote, and install it too — so you're not stitching four vendors together.",
  },
  {
    num: "03",
    head: "We use the Consumer Data Right to connect quickly.",
    body: "CDR is the same system your bank uses to share data with accounting apps. It lets us read your meter data in minutes instead of waiting weeks for retailer paperwork. Nothing goes on site, nothing gets installed.",
  },
  {
    num: "04",
    head: "On projects, we get paid from the savings.",
    body: "Monitoring starts free. When we deliver a project, our fee comes out of what the meter actually saves — measured against your own pre-project baseline. That way our interests line up with yours.",
  },
];

function Narrative() {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <div className="grid gap-xl-2 md:gap-2xl-2 md:grid-cols-[220px_1fr] items-start">
          <div>
            <p className="eyebrow">Why we exist</p>
            <p
              className="mt-md-2 font-display text-[22px] tracking-tightish text-ink-muted leading-[1.35] max-w-[220px]"
              style={{ fontVariationSettings: '"wght" 500, "opsz" 36, "GRAD" 0' }}
            >
              Four notes on what we do and how.
            </p>
          </div>

          <ol className="flex flex-col">
            {chapters.map((c, i) => (
              <li
                key={c.num}
                className={`grid grid-cols-[auto_1fr] gap-lg-2 py-xl-2 ${
                  i < chapters.length - 1 ? "border-b border-ink-hairline" : ""
                }`}
              >
                <span className="num font-mono text-caption uppercase tracking-[0.18em] text-ink-faint pt-2">
                  {c.num}
                </span>
                <div className="max-w-3xl">
                  <h2
                    className="font-display text-display-m tracking-display text-ink leading-[1.08]"
                    style={{ fontVariationSettings: '"wght" 700, "opsz" 64, "GRAD" 0' }}
                  >
                    {c.head}
                  </h2>
                  <p className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const facts = [
  { l: "Registered", v: "Arcadigm Pty Ltd" },
  { l: "Founded", v: "2026" },
  { l: "Based", v: "Adelaide · Melbourne" },
  { l: "Team", v: "Eight — engineers and technicians" },
  { l: "Data partner", v: "Fiskil (Consumer Data Right)" },
  { l: "Monitoring partner", v: "Optimal Monitoring (UK)" },
  { l: "Service area", v: "Australia-wide" },
  { l: "How we're paid", v: "Free tier · annual plan · success fee" },
];

function FactFile() {
  return (
    <section className="py-3xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <header className="mb-xl-2">
          <p className="eyebrow">Fact file</p>
          <h2
            className="mt-md-2 font-display text-display-l tracking-display text-ink max-w-2xl leading-[1.04]"
            style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
          >
            The company, on one page.
          </h2>
        </header>

        <dl className="grid gap-0 md:grid-cols-2">
          {facts.map((f) => (
            <div
              key={f.l}
              className="grid grid-cols-[160px_1fr] gap-md-2 py-md-2 border-t border-ink-hairline"
            >
              <dt className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint pt-1">
                {f.l}
              </dt>
              <dd
                className="font-display text-[18px] tracking-tightish text-ink"
                style={{ fontVariationSettings: '"wght" 550, "opsz" 36, "GRAD" 0' }}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-xl-2 pt-lg-2 border-t border-ink-hairline flex flex-wrap justify-end gap-md-2">
          <Link to="/why-us" className="btn-primary">
            Why Arcadigm <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
          <Link to="/sign-up" className="btn-secondary">
            Get started <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}

