import type { ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./Pills.module.css";

/** Red pill with a location pin, e.g. on hero photo cards: 📍 Bali */
export function LocationPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={[styles.location, className].filter(Boolean).join(" ")}>
      <Icon name="pin" size={14} />
      {children}
    </span>
  );
}

/** Small neutral label, e.g. "Honeymoon" or "5N / 6D" */
export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "glass" }) {
  return <span className={[styles.tag, styles[`tag-${tone}`]].join(" ")}>{children}</span>;
}

interface PillToggleProps<T extends string> {
  /** Accessible name for the group, e.g. "Destination region" */
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Segmented pill switch, e.g. India | International.
 * Built as a radio group so keyboard and screen readers understand it.
 */
export function PillToggle<T extends string>({ label, options, value, onChange }: PillToggleProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.toggle}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className={[styles.option, active && styles.active].filter(Boolean).join(" ")}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const i = options.findIndex((o) => o.value === value);
              const next = options[(i + (e.key === "ArrowRight" ? 1 : options.length - 1)) % options.length];
              onChange(next.value);
              (e.currentTarget.parentElement?.querySelector(`[data-value="${next.value}"]`) as HTMLElement | null)?.focus();
            }}
            data-value={opt.value}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
