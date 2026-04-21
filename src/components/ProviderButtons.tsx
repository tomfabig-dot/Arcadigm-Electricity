import { Lock } from "lucide-react";

type Props = {
  onGoogle: () => void;
  onMicrosoft: () => void;
  loadingProvider?: "google" | "microsoft" | null;
  disabled?: boolean;
};

export default function ProviderButtons(_props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <LockedProviderButton label="Continue with Google" icon={<GoogleG />} />
      <LockedProviderButton label="Continue with Microsoft" icon={<MicrosoftSquares />} />
    </div>
  );
}

function LockedProviderButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <span
      className="btn-secondary w-full justify-center text-ink-faint cursor-not-allowed select-none opacity-70"
      aria-disabled="true"
      title="Coming soon"
    >
      <span className="opacity-50">{icon}</span>
      {label}
      <Lock className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

export function Separator({ label = "or email" }: { label?: string }) {
  return (
    <div className="flex items-center gap-md-2 mt-lg-2">
      <div className="flex-1 h-px bg-ink-hairline" />
      <span className="font-mono text-micro uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </span>
      <div className="flex-1 h-px bg-ink-hairline" />
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 01-2.3 3.5v2.9h3.7c2.2-2 3.4-4.9 3.4-8.5z" />
      <path fill="#34A853" d="M12 23c3 0 5.6-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.6-2-6.5-4.8H1.7v3C3.6 20.5 7.5 23 12 23z" />
      <path fill="#FBBC05" d="M5.5 13.6a6.6 6.6 0 010-4.2V6.4H1.7a11 11 0 000 10.2l3.8-3z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0012 1 11 11 0 001.7 6.4l3.8 3c1-2.9 3.5-4.9 6.5-4.9z" />
    </svg>
  );
}

function MicrosoftSquares() {
  return (
    <svg viewBox="0 0 23 23" className="w-4 h-4" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}
