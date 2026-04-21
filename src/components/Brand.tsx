import { Link } from "react-router-dom";

export default function Brand({ to = "/", light = false }: { to?: string; light?: boolean }) {
  const iconSrc = light ? "/arcadigm-icon-light.svg" : "/arcadigm-icon.svg";

  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 relative z-[2]"
      aria-label="Arcadigm, home"
    >
      <span
        aria-hidden
        className={`grid place-items-center w-9 h-9 rounded-[10px] border ${
          light
            ? "border-white/20 bg-white/[0.04]"
            : "border-ink-hairline bg-paper-card"
        } transition-colors duration-med ease-out-quart group-hover:border-brand`}
      >
        <img src={iconSrc} alt="" className="w-6 h-6" />
      </span>
      <span
        className={`font-display tracking-display text-[22px] leading-none ${
          light ? "text-white" : "text-ink"
        }`}
        style={{ fontVariationSettings: '"wght" 700, "opsz" 96, "GRAD" 0' }}
      >
        Arcadigm
      </span>
    </Link>
  );
}
