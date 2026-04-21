# Arcadigm — Design System (Master)

**Authoritative source.** When any other output (ui-ux-pro-max search, taste-skill default, frontend-design reflex) contradicts this file, this file wins. Derived from `.impeccable.md`.

## Aesthetic Direction
**Editorial-industrial, warm paper + deep green.** The site reads like a considered trade-journal publication, not an app dashboard. Asymmetric, left-aligned, high typographic contrast. Data treated as editorial artefact — numerals in mono, charts drawn with hairlines on paper, no dashboard chrome.

## Typography

| Role | Family | Source | Notes |
|------|--------|--------|-------|
| Display (h1–h3, pull-quotes, marquees) | **Bricolage Grotesque** | Google Fonts (variable: wght, opsz, GRAD) | Weight 600–800. Negative tracking (−0.02em) on large display. Lower GRAD (−50) for light body contexts, higher GRAD (+150) for emphasis |
| Body + UI (h4–h6, paragraphs, labels, buttons) | **Figtree** | Google Fonts (variable: wght) | Weight 400 body, 500 emphasis, 600 button/UI. Line-height 1.6 on body, 1.45 on UI |
| Numerals, NMI IDs, codes, data tables | **JetBrains Mono** | Google Fonts | Weight 400/500. `font-feature-settings: "tnum" 1, "zero" 1`. Used wherever data is shown |

**Banned** (would produce monoculture): Inter, Space Grotesk, DM Sans, Fraunces, Newsreader, Lora, Crimson, Playfair, Cormorant, Syne, IBM Plex, Instrument, Outfit, Plus Jakarta, Satoshi, Geist.

**Type scale** (fluid marketing; clamp):
```
--font-display-xl: clamp(3rem, 2rem + 5vw, 6.5rem);     /* hero */
--font-display-l:  clamp(2.25rem, 1.6rem + 3vw, 4rem);  /* section heads */
--font-display-m:  clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
--font-h4:         1.375rem;   /* 22 */
--font-body-l:     1.125rem;   /* 18 — lead paragraphs */
--font-body:       1rem;       /* 16 */
--font-ui:         0.9375rem;  /* 15 */
--font-caption:    0.8125rem;  /* 13 */
--font-micro:      0.6875rem;  /* 11 — eyebrow labels */
```

## Colour (OKLCH, tinted toward brand green)

Brand green hue ≈ 155° in OKLCH (`oklch(0.34 0.075 155)` ← #164d35). All neutrals tinted toward this hue at chroma 0.004–0.012 for subconscious cohesion.

```css
/* Surfaces — warm paper, green-tinted */
--surface-paper:   oklch(0.965 0.008 90);   /* base */
--surface-paper-2: oklch(0.940 0.010 88);   /* muted section bg */
--surface-card:    oklch(0.995 0.004 90);   /* off-white */
--surface-ink:     oklch(0.22  0.018 150);  /* near-black, green-tinted — inverted panels only */

/* Ink — warm dark tinted toward brand */
--ink:           oklch(0.22 0.018 150);     /* body text */
--ink-muted:     oklch(0.46 0.014 145);     /* secondary */
--ink-faint:     oklch(0.62 0.010 140);     /* tertiary / captions */
--ink-hairline:  oklch(0.86 0.010 130);     /* 1px borders */

/* Brand — deep green, locked */
--brand:         oklch(0.34 0.075 155);     /* #164d35 */
--brand-hover:   oklch(0.28 0.080 155);
--brand-soft:    oklch(0.93 0.022 150);     /* on-paper chip bg */
--brand-fore:    oklch(0.97 0.012 100);     /* text on brand */

/* Semantic */
--signal-warn:   oklch(0.62 0.13 65);       /* ochre, not orange */
--signal-alert:  oklch(0.52 0.15 28);       /* clay red */
```

**Rules**
- 60-30-10 visual weight: **60 paper/ink, 30 ink-muted + hairlines, 10 deep green**.
- Deep green only on: primary CTAs, key numeric highlights, one editorial accent per section.
- **Never** gradient text. **Never** border-left > 1px as accent stripe. **Never** purple, neon, or glow shadows.
- Hairlines tinted toward brand, not pure grey.

## Spacing (4pt semantic)
```
--space-3xs: 4px   --space-2xs: 8px   --space-xs: 12px
--space-sm:  16px  --space-md:  24px  --space-lg:  32px
--space-xl:  48px  --space-2xl: 64px  --space-3xl: 96px
--space-4xl: 128px /* section breathing */
```
Use `gap` not margin for siblings. Rhythm over uniformity.

## Motion
```
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
--dur-fast:   160ms   /* state changes */
--dur-med:    260ms   /* hover, reveal */
--dur-slow:   520ms   /* page-load stagger */
```
- Animate `transform` + `opacity` only.
- No bounce, no elastic, no scroll-hijack, no parallax.
- Perpetual micro-motion allowed on live-data elements: breathing status dots (3s pulse), metric carousel (seamless `x` loop), number ticker.
- `prefers-reduced-motion`: disable all continuous loops.

## Texture
One subtle paper-grain SVG noise overlay, `fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply`, applied once at the app root.

## Landing Structure (Home)
Editorial-publication flow, not template:
1. **Masthead nav** — horizontal rule, small mono "Issue / 2026" tag
2. **Hero** — asymmetric split: left large display H1 + one paragraph, right live NMI data artefact (chart on paper)
3. **Thesis strip** — pull-quote headline + supporting paragraph, no cards
4. **Three-act anatomy** — Connect / Monitor / Deliver — numbered spreads; vary scale, alternate side (not equal cards)
5. **Evidence** — two anonymised case-study spreads with real numerals in mono
6. **Closing CTA** — single editorial line + primary button, plenty of negative space

## Banned patterns (taste-skill + impeccable)
- Centred-hero template
- 3-equal-card feature row
- Card-on-card nesting
- Purple/blue-to-cyan gradients
- Gradient text
- Border-left > 1px accents
- Sparkline-as-decoration
- Emoji as icons
- Bouncy / elastic easing
- Generic drop shadows on rounded rectangles
- Pure black / pure white
- `h-screen` for hero (use `min-h-[100dvh]`)

## Pre-delivery checklist
- [ ] No emojis; all icons from Lucide (stroke-width locked to 1.5)
- [ ] Brand green used rarely — CTAs, key numerals, one accent per section
- [ ] Numerals in JetBrains Mono everywhere they appear
- [ ] Paper grain overlay on root
- [ ] Focus states visible, 2px ring tinted toward brand
- [ ] Body text ≤ 68ch
- [ ] Reduced-motion disables all perpetual loops
- [ ] Contrast ≥ 4.5:1 body, ≥ 3:1 large
- [ ] Responsive at 375 / 768 / 1024 / 1440
