import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Lock } from "lucide-react";
import Brand from "./Brand";
import { getSession } from "../lib/auth";

type NavItem = { to: string; label: string; locked?: boolean };

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/why-us", label: "Why Arcadigm" },
  { to: "/process", label: "Process" },
  { to: "/track-record", label: "Results", locked: true },
  { to: "/contact", label: "Contact" },
];

export default function MarketingLayout() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const session = getSession();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      {/* Masthead */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-med ease-out-quart ${
          scrolled
            ? "bg-paper/85 backdrop-blur border-b border-ink-hairline/70"
            : "bg-paper border-b border-transparent"
        }`}
      >
        <div className="container-edit h-[72px] flex items-center justify-between above-grain">
          <Brand />

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) =>
              n.locked ? (
                <span
                  key={n.to}
                  className="inline-flex items-center gap-1.5 text-ui font-medium tracking-tightish text-ink-faint cursor-not-allowed select-none"
                  aria-disabled="true"
                  title="Coming soon"
                >
                  {n.label}
                  <Lock className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
                </span>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `text-ui font-medium tracking-tightish transition-colors duration-med ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`
                  }
                >
                  <span className="relative">
                    {n.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-transform duration-med ease-out-quart origin-left
                        ${loc.pathname === n.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      aria-hidden
                    />
                  </span>
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <Link to="/portal/dashboard" className="btn-primary">
                Open portal <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-ui font-medium text-ink-muted hover:text-ink transition-colors duration-med"
                >
                  Sign in
                </Link>
                <Link to="/sign-up" className="btn-primary">
                  Get started <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-ink-hairline bg-paper above-grain">
            <div className="container-edit py-6 flex flex-col gap-1">
              {nav.map((n) =>
                n.locked ? (
                  <span
                    key={n.to}
                    className="py-3 inline-flex items-center gap-2 text-body-l font-display tracking-tightish text-ink-faint border-b border-ink-hairline/60 last:border-0 cursor-not-allowed select-none"
                    style={{ fontVariationSettings: '"wght" 600, "opsz" 36, "GRAD" 0' }}
                    aria-disabled="true"
                  >
                    {n.label}
                    <Lock className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className="py-3 text-body-l font-display tracking-tightish text-ink border-b border-ink-hairline/60 last:border-0"
                    style={{ fontVariationSettings: '"wght" 600, "opsz" 36, "GRAD" 0' }}
                  >
                    {n.label}
                  </NavLink>
                )
              )}
              <div className="h-3" />
              {session ? (
                <Link to="/portal/dashboard" className="btn-primary w-full">Open portal</Link>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <Link to="/sign-in" className="btn-secondary w-full">Sign in</Link>
                  <Link to="/sign-up" className="btn-primary w-full">Get started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 above-grain">
        <Outlet />
      </main>

      {/* Editorial footer */}
      <footer className="mt-4xl-2 border-t border-ink-hairline above-grain">
        <div className="container-edit py-xl-2">
          <div className="grid gap-lg-2 md:grid-cols-[1.6fr_1fr_1fr]">
            <div className="flex flex-col gap-md-2 max-w-sm">
              <Brand />
              <p className="text-ui text-ink-muted leading-prose">
                Helping Australian businesses understand their electricity
                and find ways to reduce it.
              </p>
              <p className="font-mono text-caption text-ink-faint">
                ACN · <span className="num">696 825 180</span>
              </p>
            </div>

            <FooterCol
              title="Product"
              links={[
                { to: "/about", label: "About" },
                { to: "/why-us", label: "Why Arcadigm" },
                { to: "/process", label: "Process" },
                { to: "/contact", label: "Contact" },
                { to: "/sign-up", label: "Get started" },
              ]}
            />
            <FooterCol
              title="Portal"
              links={[
                { to: "/sign-in", label: "Sign in" },
                { to: "/sign-up", label: "Create account" },
              ]}
            />
          </div>

          <div className="rule my-xl-2" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-xs font-mono text-micro uppercase tracking-[0.18em] text-ink-faint">
            <span>© {new Date().getFullYear()} Arcadigm Pty Ltd</span>
            <span className="flex items-center gap-2">
              <span className="dot-warn" aria-hidden />
              <span>Currently in testing</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="eyebrow mb-md-2">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-ui text-ink-muted hover:text-ink transition-colors duration-med"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
