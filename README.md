# Arcadigm Website V2

Rebuild of the Arcadigm marketing site + client portal using Vite + React + TypeScript + Tailwind. Produced by Playwright-driven capture of the Replit-hosted original, then fully re-implemented for deployment via Netlify + GitHub.

## Stack

- **Vite** 5 (SPA build)
- **React** 18 + **TypeScript**
- **React Router v6** (client-side routing)
- **Tailwind CSS** 3
- **Recharts** (demand-profile chart)
- **lucide-react** (icon set)

## Routes

### Marketing
- `/` — Home
- `/about` — About
- `/why-us` — Why Us & pricing
- `/track-record` — Results & case studies
- `/process` — 5-step process
- `/sign-in`, `/sign-up` — Auth (demo, localStorage)

### Portal (auth-gated)
- `/portal/dashboard` — Overview + action cards
- `/portal/sites` — Sites grid
- `/portal/sites/:id` — Site detail (Demand / Circuits / Heatmap / Cost)
- `/portal/notifications` — Potential Improvements
- `/portal/projects` — Project Library + Savings Calculator
- `/portal/users` — User Management
- `/portal/integrations` — HH meters / Sub-metering
- `/portal/settings` — Profile & notification prefs

## Local development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # -> dist/
npm run preview # serve dist/ locally
```

Node 20 recommended (`.nvmrc` provided).

## Deployment (Netlify + GitHub)

1. Push this directory to a GitHub repo. From `website_V2/`:

   ```bash
   git init
   git add .
   git commit -m "Initial commit — Arcadigm website V2"
   git branch -M main
   git remote add origin git@github.com:<org>/<repo>.git
   git push -u origin main
   ```

2. In Netlify:
   - **Add new site → Import from GitHub** and select the repo.
   - Build settings are read from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `20`
   - SPA fallback (`/* → /index.html 200`) and security headers are pre-configured.
3. **Custom domain:** Netlify → Domain management → Add custom domain. Point your DNS `A` / `CNAME` as prompted, then enable Let's Encrypt TLS (one click).

No environment variables are required for the demo. For production Clerk/Supabase integration, add env vars in **Site settings → Environment variables** and wire them into `src/lib/auth.ts`.

## Auth

Sign-in is a localStorage stub (any email works). The "Continue with Google" button fast-paths to a demo session. Swap `src/lib/auth.ts` for real auth when you wire up Clerk or Supabase.

## Structure

```
src/
  App.tsx                  route table
  main.tsx                 app bootstrap
  components/              Brand, MarketingLayout, PortalLayout, RequireAuth
  lib/auth.ts              session stub
  lib/data.ts              mock data (sites, improvements, projects, users, integrations)
  routes/                  marketing pages
  routes/portal/           portal pages
  styles/index.css         Tailwind layers + component utilities
public/
  favicon.svg
  og-image.svg
  _redirects               SPA fallback (Netlify)
netlify.toml               build + headers + redirects
```
