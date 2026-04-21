const KEY = "arcadigm_session_v1";

export const DEMO_EMAIL = "demo@arcadigm.net";
export const DEMO_PASSWORD = "demo";

export type Provider = "email" | "google" | "microsoft";
export type SessionRole =
  | "Client Admin"
  | "Regional Manager"
  | "Site Manager"
  | "Viewer";

export type Session = {
  email: string;
  name?: string;
  company?: string;
  role: SessionRole;
  mobile?: string;
  provider: Provider;
  signedInAt: string;
};

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Session>;
    return {
      email: parsed.email ?? DEMO_EMAIL,
      name: parsed.name,
      company: parsed.company,
      role: (parsed.role as SessionRole) ?? "Client Admin",
      mobile: parsed.mobile ?? "",
      provider: (parsed.provider as Provider) ?? "email",
      signedInAt: parsed.signedInAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD
  );
}

export function signIn(provider: Provider = "email"): Session {
  const session: Session = {
    email: DEMO_EMAIL,
    name: "Demo User",
    company: "Oakfield Retail Group",
    role: "Client Admin",
    mobile: "",
    provider,
    signedInAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function updateSession(patch: Partial<Session>): Session | null {
  const current = getSession();
  if (!current) return null;
  const next: Session = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function signOut() {
  localStorage.removeItem(KEY);
}
