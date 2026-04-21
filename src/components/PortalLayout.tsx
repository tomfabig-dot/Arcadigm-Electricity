import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Building2,
  Bell,
  FolderKanban,
  Users,
  Plug,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Brand from "./Brand";
import { getSession, signOut } from "../lib/auth";

const groups = [
  {
    label: "MONITOR",
    items: [
      { to: "/portal/dashboard", label: "Overview", icon: LayoutGrid },
      { to: "/portal/sites", label: "Sites", icon: Building2 },
      { to: "/portal/notifications", label: "Improvements", icon: Bell },
    ],
  },
  {
    label: "OPTIMISE",
    items: [{ to: "/portal/projects", label: "Projects & Savings", icon: FolderKanban }],
  },
  {
    label: "ADMIN",
    items: [
      { to: "/portal/users", label: "User Management", icon: Users },
      { to: "/portal/integrations", label: "Integrations", icon: Plug },
      { to: "/portal/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
];

export default function PortalLayout() {
  const nav = useNavigate();
  const session = getSession();
  const [open, setOpen] = useState(false);

  function onSignOut() {
    signOut();
    nav("/", { replace: true });
  }

  useEffect(() => {
    document.body.setAttribute("data-surface", "portal");
    return () => document.body.setAttribute("data-surface", "marketing");
  }, []);

  const initials = (session?.email || "U")
    .split("@")[0]
    .split(/[._-]/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");

  return (
    <div className="min-h-screen flex bg-bg">
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen w-64 shrink-0 flex-col bg-white border-r border-line">
        <div className="h-20 flex items-center px-5 border-b border-line">
          <Brand to="/portal/dashboard" />
        </div>
        <nav className="flex-1 overflow-y-auto py-5 px-3">
          {groups.map((g) => (
            <div key={g.label} className="mb-6">
              <div className="px-3 text-[10px] font-bold tracking-[0.18em] text-ink-faint mb-2">
                {g.label}
              </div>
              <div className="space-y-0.5">
                {g.items.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                        isActive
                          ? "text-brand font-semibold"
                          : "text-ink-muted hover:bg-bg-muted hover:text-ink"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-brand" />
                        )}
                        <it.icon className={`w-[18px] h-[18px] ${isActive ? "stroke-[2.2]" : ""}`} />
                        <span className="flex-1">{it.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-soft grid place-items-center text-[11px] font-bold text-brand">
              {initials || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold truncate">
                {session?.name || "User"}
              </div>
              <div className="text-[11.5px] text-ink-muted truncate">
                {session?.email}
              </div>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="mt-3 w-full flex items-center gap-2 text-[13px] text-ink-muted hover:text-ink py-2"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-white border-b border-line flex items-center justify-between px-4">
        <Brand to="/portal/dashboard" />
        <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setOpen(false)}>
          <div
            className="absolute top-14 left-0 right-0 bg-white border-b border-line p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {groups.map((g) => (
              <div key={g.label} className="mb-5">
                <div className="text-[10px] font-bold tracking-widest text-ink-faint mb-2">
                  {g.label}
                </div>
                {g.items.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                        isActive ? "bg-brand text-white" : "text-ink"
                      }`
                    }
                  >
                    <it.icon className="w-4 h-4" />
                    {it.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <button
              onClick={onSignOut}
              className="w-full flex items-center gap-2 text-sm text-ink py-2 border-t border-line pt-4"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="sticky top-14 md:top-0 z-20 bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-2.5 flex items-center gap-2.5 text-[13px]">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold shrink-0">
            !
          </span>
          <p className="text-amber-900 leading-snug">
            <strong className="font-semibold">Demo environment.</strong>{" "}
            All figures shown are placeholder data — not a live meter. Currency
            displayed in AUD.
          </p>
        </div>
        <div className="px-4 sm:px-8 py-8 max-w-[1280px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
