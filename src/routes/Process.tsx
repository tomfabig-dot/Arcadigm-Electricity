const steps = [
  {
    n: "01",
    label: "Day one",
    title: "Sign up and log into your portal.",
    body: "Sign up takes less than five minutes. You give consent through the secure Fiskil Consumer Data Right portal and we connect to your meter data. No hardware needed, no site visit, and no hassle. After a quick data update, your readings appear in the portal straight away.",
    meta: ["About two minutes", "No hardware", "Data in the portal immediately"],
  },
  {
    n: "02",
    label: "First few days",
    title: "We map your baseline.",
    body: "We quiz you on your operating hours, type of site, and the key equipment you have and how it operates. We also map out other context like local weather, and develop a view of what normal looks like for each site.",
    meta: ["Half-hourly readings", "Weather-adjusted", "Tariff overlay"],
  },
  {
    n: "03",
    label: "Ongoing",
    title: "Notifications when it happens, reports when it matters.",
    body: "We analyse the data and estimate the key inputs of your electricity use. If something shifts on the meter — like a chiller running overnight — we ping you to provide a short-term feedback loop to correct behaviour in future.",
    meta: ["Alerts on change", "Engineer readouts", "Costed suggestions"],
  },
  {
    n: "04",
    label: "Each month",
    title: "A short update, every month.",
    body: "To ensure smooth operations, we provide simple ongoing reporting to cover high-level updates. When we spot an electricity consumption pattern worth more serious intervention, an engineer writes it up in plain English: what to do, what it's likely worth, and what we'd suggest first.",
    meta: ["Monthly note", "Anomalies flagged", "Ranked by dollar impact"],
  },
  {
    n: "05",
    label: "When a project makes sense",
    title: "We deliver it, paid from the savings.",
    body: "When a site is ready for an upgrade, we scope, quote, install, and commission the work. Our fee comes out of the savings we measure on the same meter we started with, so your costs track directly to the result.",
    meta: ["Scoped against your data", "Measured on the meter", "Paid from savings"],
  },
];

export default function Process() {
  return (
    <>
      <Header />
      <Timeline />
    </>
  );
}

function Header() {
  return (
    <section className="pt-xl-2 md:pt-2xl-2 pb-xl-2">
      <div className="container-edit">
        <p className="eyebrow animate-fade-up">Process · five steps</p>
        <h1
          className="mt-md-2 font-display text-display-xl tracking-display text-ink max-w-3xl animate-fade-up"
          style={{
            fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
            animationDelay: "60ms",
          }}
        >
          Sign up today. <span className="text-brand">See your meter tomorrow.</span>
        </h1>
        <p
          className="mt-lg-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Your data is in the portal the moment you sign up. A written readout
          with suggestions follows within five business days. Everything after that
          is steady — a monthly note, and only the projects that are worth doing.
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-2xl-2 border-t border-ink-hairline">
      <div className="container-edit">
        <ol className="flex flex-col gap-2xl-2 md:gap-3xl-2">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`grid gap-lg-2 md:gap-xl-2 items-start md:grid-cols-[120px_1fr_1fr] pb-xl-2 ${
                i < steps.length - 1 ? "border-b border-ink-hairline" : ""
              }`}
            >
              <div className="flex md:flex-col gap-md-2 md:gap-2xs items-baseline md:items-start">
                <span
                  className="num font-display text-[64px] leading-none text-ink"
                  style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" -25' }}
                >
                  {s.n}
                </span>
                <span className="font-mono text-micro uppercase tracking-[0.18em] text-ink-faint">
                  {s.label}
                </span>
              </div>

              <div>
                <h2
                  className="font-display text-display-m tracking-display text-ink leading-[1.1]"
                  style={{ fontVariationSettings: '"wght" 700, "opsz" 64, "GRAD" 0' }}
                >
                  {s.title}
                </h2>
              </div>

              <div>
                <p className="text-body-l text-ink-muted max-prose leading-prose">{s.body}</p>
                <ul className="mt-md-2 flex flex-wrap gap-2xs">
                  {s.meta.map((m) => (
                    <li key={m} className="chip">
                      <span className="dot-live" style={{ width: 6, height: 6 }} aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

