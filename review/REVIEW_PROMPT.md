# External Review Prompt — Arcadigm Portal (V2)

> Hand this file **and** a deployed Netlify link to the reviewer. Everything
> they need to evaluate the product is on this page. Treat the brief as
> read-only — reviewers edit only `FINDINGS.md`.

---

## 1. Who you are reviewing for

**Arcadigm** is an Australian energy-services company (Adelaide + Melbourne)
selling to C&I SMEs with $200k–$1m+ annual electricity bills — manufacturers,
multi-site retail, cold-store/logistics.

The audience is **not** energy experts. They've been burned by one-off audits
that produced dusty PDFs. They want continuous visibility, and a partner who
**executes projects**, not another generic SaaS dashboard.

Arcadigm's product funnel is:

1. **Free tier** — NMI / NEM12 ingest, baseline profile, 1-page diagnostic.
2. **Monitor (paid)** — continuous monitoring, alerts, quarterly reports.
3. **Project Delivery (services)** — Arcadigm scopes, commissions and validates
   the efficiency projects that surface in Monitor.

The portal you're reviewing is tier 2/3 — the logged-in experience a paying
Monitor customer or Project Delivery client would use daily / weekly.

## 2. What you are reviewing

- **Marketing site** (`/`, `/about`, `/why-us`, `/track-record`, `/process`,
  `/contact`, `/sign-in`, `/sign-up`).
- **Portal** (`/portal/*`) — auth-gated. Any email + any password works for the
  demo; or click "Continue with Google" to fast-path.
  - Dashboard (portfolio snapshot)
  - Sites grid / Site Detail (Demand, Estimated Consumption Breakdown, Load
    Heatmap, Cost & Carbon)
  - Improvements (formerly "Notifications")
  - Projects (library + savings calculator)
  - Integrations (HH meters + Sub-metering)
  - Users (team + access control)
  - Settings (profile + notification prefs)

**All data is mock data.** The screens are static-from-data — nothing is wired
to a real back-end yet. The goal is to pressure-test the *product shape*, *IA*
and *visual language* before we wire up Fiskil (CDR intermediary) and the
warehouse pipeline.

## 3. What we want from the review

A ranked list of findings, most impactful first, grouped by the dimensions
below. Keep judgements **evidence-based** — cite the screen, the element, and
(if relevant) the user task. Avoid taste-only comments unless they touch the
brand brief.

We are specifically *not* asking for a re-skin or a swap-in of a different
design system. Stay inside the established aesthetic (see §4). Point out where
we've strayed from it.

### 3a. Dimensions (weighted)

| # | Dimension | Weight | Guiding questions |
|---|-----------|--------|---|
| 1 | **Value legibility** | 30% | Inside 30 seconds on Dashboard, does a facilities lead understand their portfolio cost, open savings, and what needs attention? Where does attention get wasted? |
| 2 | **Task completion** | 20% | Pick the 5 tasks in §5 and attempt each. Note exactly where friction appears — label wording, hierarchy, missing state, unexpected navigation. |
| 3 | **Information architecture** | 15% | Do the tabs / sub-pages match a user's mental model of their energy portfolio? Is anything hiding in the wrong place? |
| 4 | **Data presentation** | 15% | Charts, tables, KPI blocks — are units correct, comparable, honest? Is time-range switching predictable across pages? Flag any "dashboard theatre" (vanity metrics without decisions). |
| 5 | **Trust signals** | 10% | Does the product feel like it is run by engineers, not marketers? Where does it drift into SaaS puffery or unsupported claims? |
| 6 | **Accessibility & responsiveness** | 5% | WCAG AA colour contrast, keyboard nav, reduced-motion, sensible behaviour 375 → 1440 → 1920. |
| 7 | **Brand coherence** | 5% | Voice, typography, colour, motion vs. the brief in §4. |

Please score each dimension **1–5** with a one-sentence justification, and
include **three (3) most-impactful fixes** — things that, if we shipped only
those, would meaningfully move the product.

### 3b. Report format

Create `review/FINDINGS.md` with this structure:

```markdown
# Review Findings — <YYYY-MM-DD> — <Reviewer Name>

## Scores (1–5)
| Dimension | Score | Justification |
|-----------|-------|---------------|
| Value legibility | | |
| Task completion | | |
| Information architecture | | |
| Data presentation | | |
| Trust signals | | |
| Accessibility & responsiveness | | |
| Brand coherence | | |
| **Weighted total** | /5 | |

## Top 3 impactful fixes
1. **<Title>** — <what / why / where>
2. **<Title>** — <what / why / where>
3. **<Title>** — <what / why / where>

## Detailed findings
(Each finding = Severity [Critical/High/Med/Low], Screen, Element,
Observation, Recommendation. Use plain markdown, no screenshots unless a
thing is genuinely unclear without one — paste them into `review/img/` and
link.)

## Notes / positives worth keeping
(3–6 bullets. What is working — so we don't regress it.)
```

## 4. Brand brief (non-negotiable)

Arcadigm's aesthetic is **editorial-industrial, warm paper + deep green**.
Full token set lives in `design-system/arcadigm/MASTER.md` and the design
intent in `.impeccable.md`. Highlights:

- **Deep green `#164d35`** is rare and earns its place — CTAs, key numerals,
  one editorial accent per section. Never as a gradient. Never as a glow.
- **Typography:** Bricolage Grotesque (display), Figtree (UI/body), JetBrains
  Mono (numerals). Inter / DM Sans / Space Grotesk are banned.
- **Voice:** plainspoken Australian. Concrete verbs. No "Elevate / Seamless /
  Unleash / Next-Gen". Zero exclamation marks.
- **Motion is evidence of life, not spectacle.** Perpetual micro-motion on
  live elements is welcome; scroll-hijack, parallax, bounce easing are banned.
- **Light mode only** for marketing. Portal is light-dominant with one dark
  hero card.

If the product strays from any of the above, call it out with screen +
element.

## 5. Task scripts (please walk these, in order)

Time yourself. Record where you hesitate, misclick, or lose confidence.

1. **"Is anything urgent right now?"** Land on `/portal/dashboard`. Within 30s,
   identify (a) the one site that needs attention, (b) the dollar value of
   open savings, (c) what action is being recommended first.
2. **"What is Parkside Supermarket's daytime load doing?"** Navigate to
   Parkside Supermarket's site detail. Switch to the 7-day view on the Demand
   profile. Interpret peak vs. off-peak. Does the period label on the chart
   match the filter?
3. **"Acknowledge an improvement."** Open Improvements. Find any New item,
   acknowledge it. Then go to the site detail for that improvement's site —
   verify the acknowledgement is visible there too.
4. **"Add a team member."** On Users → Team Members, invite a fictional
   Regional Manager. Then change their role to Site Manager via the row menu.
   Remove them and test the 10-second undo.
5. **"Turn on SMS alerts."** Open Settings. Enable SMS on Critical Alerts.
   Note what the product asks you to do next. Attempt to save an invalid
   mobile number, then a valid Australian mobile.

## 6. Known limitations (don't flag these)

- No real auth — localStorage stub.
- No real data — all values are deterministic mock.
- No backend — CSV/NEM12 upload is visual only.
- No email/SMS delivery — notification prefs are persisted to localStorage.
- "Continue with Google / Microsoft" buttons fast-path to the demo session.
- Some placeholder copy ("Oakfield Retail Group") is demo-only.

## 7. How to run locally (optional)

```
nvm use       # Node 20
npm install
npm run dev   # http://localhost:5173
```

Netlify preview URL: _(paste the link you were given at the top of your
report)._

## 8. Deliverable & timing

- **Deliverable:** `review/FINDINGS.md` + any supporting images in
  `review/img/`.
- **Suggested effort:** 90 minutes. Target 12–20 findings, quality over
  volume.
- **Tone:** direct, evidence-led, no hedging. Call out the best bits too.

Thank you.
