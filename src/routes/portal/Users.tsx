import { useEffect, useMemo, useRef, useState } from "react";
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Users as UsersIcon,
  Mail,
  Pencil,
  Trash2,
  CheckCircle2,
  Undo2,
} from "lucide-react";
import { teamMembers, Role, TeamMember, UserStatus } from "../../lib/data";
import { getSession } from "../../lib/auth";
import Dialog from "../../components/Dialog";

const UNDO_MS = 10_000;

const roleTone: Record<Role, string> = {
  "Client Admin": "bg-brand text-white border-brand",
  "Regional Manager": "bg-brand-soft text-brand border-brand/25",
  "Site Manager": "bg-bg-muted text-ink border-ink-hairline",
  Viewer: "bg-white text-ink-muted border-ink-hairline",
};

const statusTone: Record<UserStatus, string> = {
  Active: "bg-brand-soft text-brand border-brand/25",
  Invited: "border-transparent",
  Pending: "bg-bg-muted text-ink-muted border-ink-hairline",
};

const statusStyle: Partial<Record<UserStatus, React.CSSProperties>> = {
  Invited: { background: "oklch(0.94 0.055 90)", color: "oklch(0.42 0.12 65)" },
};

type Capability = [string, boolean, boolean, boolean, boolean];

const capabilities: Capability[] = [
  ["View dashboards", true, true, true, true],
  ["Acknowledge improvements", true, true, true, false],
  ["Invite users", true, true, false, false],
  ["Manage integrations", true, false, false, false],
];

const roleIndex: Record<Role, number> = {
  "Client Admin": 1,
  "Regional Manager": 2,
  "Site Manager": 3,
  Viewer: 4,
};

export default function Users() {
  const session = getSession();
  const viewAs: Role = (session?.role as Role) ?? "Client Admin";
  const sessionName = session?.name ?? "You";

  const [tab, setTab] = useState<"team" | "access">("team");
  const [q, setQ] = useState("");
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<{
    user: TeamMember;
    deadline: number;
  } | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const removalTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!pendingRemoval) return;
    const tick = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(tick);
  }, [pendingRemoval]);

  useEffect(() => {
    if (!openMenu) return;
    const onClick = () => setOpenMenu(null);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [openMenu]);

  const filtered = useMemo(
    () =>
      members
        .filter((m) => m.id !== pendingRemoval?.user.id)
        .filter(
          (u) =>
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase()),
        ),
    [q, members, pendingRemoval],
  );

  function handleInvite(newMember: TeamMember) {
    setMembers((prev) => [...prev, newMember]);
    setInviteOpen(false);
    setToast(`Invitation sent to ${newMember.email}`);
  }

  function handleResend(u: TeamMember) {
    setOpenMenu(null);
    setToast(`Invitation resent to ${u.email}`);
  }

  function clearRemovalTimer() {
    if (removalTimer.current !== null) {
      window.clearTimeout(removalTimer.current);
      removalTimer.current = null;
    }
  }

  function handleRemove(u: TeamMember) {
    setOpenMenu(null);
    clearRemovalTimer();
    const deadline = Date.now() + UNDO_MS;
    setPendingRemoval({ user: u, deadline });
    setNow(Date.now());
    removalTimer.current = window.setTimeout(() => {
      setMembers((prev) => prev.filter((m) => m.id !== u.id));
      setPendingRemoval(null);
      removalTimer.current = null;
      setToast(`${u.name} removed from team`);
    }, UNDO_MS);
  }

  function handleUndoRemoval() {
    clearRemovalTimer();
    const name = pendingRemoval?.user.name;
    setPendingRemoval(null);
    if (name) setToast(`Removal of ${name} undone`);
  }

  function handleSaveRole(u: TeamMember, nextRole: Role) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === u.id
          ? {
              ...m,
              role: nextRole,
              sites: nextRole === "Client Admin" ? ["All sites"] : m.sites,
            }
          : m,
      ),
    );
    setEditing(null);
    setToast(`${u.name} is now ${nextRole}`);
  }

  useEffect(
    () => () => {
      if (removalTimer.current !== null) window.clearTimeout(removalTimer.current);
    },
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md bg-bg-muted grid place-items-center shrink-0">
            <UsersIcon className="w-5 h-5 text-ink" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              User Management
            </h1>
            <p className="text-ink-muted mt-1 max-w-md">
              Control who has access to your Arcadigm portal and what they can see.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-line bg-white">
            <span className="text-xs text-ink-muted">Viewing as</span>
            <span className="h-4 w-px bg-line" />
            <span className="text-sm font-semibold text-ink" title={sessionName}>
              {sessionName}
            </span>
            <span
              className={`text-[10.5px] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full border ${roleTone[viewAs]}`}
            >
              {viewAs}
            </span>
          </div>
          <button className="btn-primary" onClick={() => setInviteOpen(true)}>
            <UserPlus className="w-4 h-4" /> Invite User
          </button>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-bold tracking-widest uppercase text-ink-muted">
            Role Hierarchy:
          </span>
          {(["Client Admin", "Regional Manager", "Site Manager", "Viewer"] as Role[]).map(
            (r, i, arr) => (
              <span key={r} className="inline-flex items-center gap-2">
                <span
                  className={`text-[10.5px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border ${roleTone[r]} ${
                    r === viewAs ? "ring-2 ring-brand ring-offset-2 ring-offset-white" : ""
                  }`}
                >
                  {r}
                </span>
                {i < arr.length - 1 && <span className="text-ink-faint">›</span>}
              </span>
            ),
          )}
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Each role can only invite users at a lower level than themselves. Site access is inherited
          automatically for Client Admin; for Regional Manager and below it must be explicitly
          assigned.
        </p>
      </div>

      <div className="inline-flex gap-1 bg-white border border-line rounded-lg p-1">
        {[
          { id: "team", label: "Team Members" },
          { id: "access", label: "Access Control" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "team" | "access")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              tab === t.id ? "bg-bg-muted text-ink" : "text-ink-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "team" ? (
        <div className="card p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold">Your team</h3>
              <div className="text-sm text-ink-muted">{filtered.length} members</div>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="input pl-9 w-64"
                placeholder="Search users..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  <th className="pb-3 pr-4">User</th>
                  <th className="pb-3 pr-4">Role</th>
                  <th className="pb-3 pr-4">Site Access</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Last Active</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-bg-muted grid place-items-center text-xs font-bold">
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 1)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold">{u.name}</div>
                          <div className="text-xs text-ink-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`text-[10.5px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border ${roleTone[u.role]}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-ink-muted">
                      <div className="flex flex-col gap-1">
                        {u.sites.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`text-[10.5px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border ${statusTone[u.status]}`}
                        style={statusStyle[u.status]}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-ink-muted">{u.lastActive}</td>
                    <td className="py-4 relative">
                      <RowMenu
                        user={u}
                        open={openMenu === u.id}
                        onToggle={(e) => {
                          e.stopPropagation();
                          setOpenMenu(openMenu === u.id ? null : u.id);
                        }}
                        onEdit={() => {
                          setOpenMenu(null);
                          setEditing(u);
                        }}
                        onResend={() => handleResend(u)}
                        onRemove={() => handleRemove(u)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-5">
          <h3 className="font-bold">Access Control</h3>
          <p className="text-sm text-ink-muted mt-1">
            Matrix of what each role can do across your portal. The{" "}
            <span className="font-semibold text-ink">{viewAs}</span> column is
            highlighted below.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  <th className="pb-3 pr-4">Capability</th>
                  {(["Client Admin", "Regional Manager", "Site Manager", "Viewer"] as Role[]).map(
                    (r) => (
                      <th
                        key={r}
                        className={`pb-3 pr-4 ${
                          r === viewAs ? "text-ink" : ""
                        }`}
                      >
                        {r === "Regional Manager"
                          ? "Regional Mgr"
                          : r === "Site Manager"
                          ? "Site Mgr"
                          : r}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {capabilities.map(([cap, ca, rm, sm, v]) => (
                  <tr key={cap}>
                    <td className="py-3 pr-4 font-medium">{cap}</td>
                    <Cell yes={ca} active={viewAs === "Client Admin"} />
                    <Cell yes={rm} active={viewAs === "Regional Manager"} />
                    <Cell yes={sm} active={viewAs === "Site Manager"} />
                    <Cell yes={v} active={viewAs === "Viewer"} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Currently viewing as{" "}
            <span className="font-semibold text-ink">{viewAs}</span> — rank{" "}
            {roleIndex[viewAs]} of 4.
          </p>
        </div>
      )}

      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        existingEmails={members.map((m) => m.email.toLowerCase())}
        onInvite={handleInvite}
      />

      <EditRoleModal
        user={editing}
        onClose={() => setEditing(null)}
        onSave={handleSaveRole}
      />

      {pendingRemoval && (
        <UndoToast
          user={pendingRemoval.user}
          remainingMs={Math.max(0, pendingRemoval.deadline - now)}
          onUndo={handleUndoRemoval}
        />
      )}

      {toast && !pendingRemoval && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-lg px-4 py-2.5 text-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-mint" /> {toast}
        </div>
      )}
    </div>
  );
}

function UndoToast({
  user,
  remainingMs,
  onUndo,
}: {
  user: TeamMember;
  remainingMs: number;
  onUndo: () => void;
}) {
  const seconds = Math.ceil(remainingMs / 1000);
  const progress = Math.max(0, Math.min(1, remainingMs / UNDO_MS));
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] bg-ink text-white rounded-lg shadow-xl overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-3">
        <Trash2 className="w-4 h-4 text-white/70 shrink-0" />
        <div className="flex-1 min-w-0 text-sm">
          <div className="font-semibold truncate">{user.name} removed</div>
          <div className="text-white/60 text-xs">Undo within {seconds}s</div>
        </div>
        <button
          onClick={onUndo}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-mint hover:text-white transition-colors"
        >
          <Undo2 className="w-3.5 h-3.5" /> Undo
        </button>
      </div>
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-brand-mint transition-[width] duration-200 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function RowMenu({
  user,
  open,
  onToggle,
  onEdit,
  onResend,
  onRemove,
}: {
  user: TeamMember;
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onResend: () => void;
  onRemove: () => void;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className="p-1 text-ink-muted hover:text-ink"
        aria-label="Row actions"
        onClick={onToggle}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-7 z-30 w-48 bg-white border border-line rounded-lg shadow-lg py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-bg-muted flex items-center gap-2"
            onClick={onEdit}
          >
            <Pencil className="w-3.5 h-3.5" /> Edit role & access
          </button>
          {user.status === "Invited" && (
            <button
              className="w-full text-left px-3 py-2 text-sm hover:bg-bg-muted flex items-center gap-2"
              onClick={onResend}
            >
              <Mail className="w-3.5 h-3.5" /> Resend invite
            </button>
          )}
          <div className="my-1 h-px bg-line" />
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-danger flex items-center gap-2"
            onClick={onRemove}
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}

function EditRoleModal({
  user,
  onClose,
  onSave,
}: {
  user: TeamMember | null;
  onClose: () => void;
  onSave: (user: TeamMember, role: Role) => void;
}) {
  const [role, setRole] = useState<Role>("Site Manager");

  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  const roleOptions: { value: Role; summary: string }[] = [
    {
      value: "Client Admin",
      summary: "Full access. Can manage users, integrations and all sites.",
    },
    {
      value: "Regional Manager",
      summary: "Views and manages assigned sites. Can invite Site Managers and Viewers.",
    },
    {
      value: "Site Manager",
      summary: "Runs a single site. Can acknowledge improvements.",
    },
    {
      value: "Viewer",
      summary: "Read-only access to assigned dashboards.",
    },
  ];

  return (
    <Dialog
      open={!!user}
      onClose={onClose}
      title={user ? `Edit ${user.name}` : "Edit role"}
      subtitle={user ? user.email : undefined}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={() => user && onSave(user, role)}
            disabled={!user || role === user.role}
          >
            Save changes
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Role level
        </div>
        <div className="space-y-2">
          {roleOptions.map((opt) => {
            const selected = role === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selected
                    ? "border-brand bg-brand-soft/40"
                    : "border-line hover:bg-bg-muted"
                }`}
              >
                <input
                  type="radio"
                  name="edit-role"
                  className="mt-0.5 accent-[oklch(0.33_0.085_155)]"
                  checked={selected}
                  onChange={() => setRole(opt.value)}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10.5px] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full border ${roleTone[opt.value]}`}
                    >
                      {opt.value}
                    </span>
                    {user?.role === opt.value && (
                      <span className="text-[10px] text-ink-faint uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-muted mt-1">{opt.summary}</p>
                </div>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-ink-muted">
          Site access stays the same unless the new role is Client Admin — in that case
          access switches to all sites.
        </p>
      </div>
    </Dialog>
  );
}

function InviteModal({
  open,
  onClose,
  existingEmails,
  onInvite,
}: {
  open: boolean;
  onClose: () => void;
  existingEmails: string[];
  onInvite: (m: TeamMember) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("Site Manager");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setName("");
      setRole("Site Manager");
      setError(null);
    }
  }, [open]);

  function submit() {
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    if (existingEmails.includes(trimmed)) {
      setError("Someone with that email is already on the team.");
      return;
    }
    const inferred = name.trim() || trimmed.split("@")[0].replace(/[._-]/g, " ");
    onInvite({
      id: `u-${Date.now()}`,
      name: inferred
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" "),
      email: trimmed,
      role,
      sites: role === "Client Admin" ? ["All sites"] : [],
      status: "Invited",
      lastActive: "—",
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Invite a team member"
      subtitle="They'll receive an email with a sign-in link."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={submit}>
            Send invite
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Email
          </label>
          <input
            type="email"
            className="input mt-1.5 w-full"
            placeholder="name@company.com.au"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            autoFocus
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Name (optional)
          </label>
          <input
            className="input mt-1.5 w-full"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Role
          </label>
          <select
            className="input mt-1.5 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="Regional Manager">Regional Manager</option>
            <option value="Site Manager">Site Manager</option>
            <option value="Viewer">Viewer</option>
          </select>
          <p className="mt-1.5 text-xs text-ink-muted">
            You can change role and site access later from the row menu.
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 text-danger text-sm px-3 py-2">
            {error}
          </div>
        )}
      </div>
    </Dialog>
  );
}

function Cell({ yes, active }: { yes: boolean; active?: boolean }) {
  return (
    <td className={`py-3 pr-4 ${active ? "bg-brand-soft/40" : ""}`}>
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
          yes ? "bg-brand-soft text-brand" : "bg-bg-muted text-ink-faint"
        }`}
      >
        {yes ? "✓" : "—"}
      </span>
    </td>
  );
}
