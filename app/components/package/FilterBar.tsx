/*
  Filter bar for the Holidays page. Changing a dropdown updates the URL
  (?where=…&theme=…), and the list below re-filters instantly.
*/
import type { ReactNode } from "react";
import { useSearchParams } from "react-router";
import { DURATIONS, MONTHS, type HolidayFilters } from "../../lib/filters";
import type { Destination, Theme } from "../../types/content";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  filters: HolidayFilters;
  destinations: Destination[];
  themes: Theme[];
  resultCount: number;
}

export function FilterBar({ filters, destinations, themes, resultCount }: FilterBarProps) {
  const [, setSearchParams] = useSearchParams();
  const hasIndia = destinations.some((d) => d.region === "india");
  const hasInternational = destinations.some((d) => d.region === "international");
  const active = Object.values(filters).some(Boolean);

  const update = (key: keyof HolidayFilters, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { preventScrollReset: true, replace: true },
    );
  };

  return (
    <div className={styles.bar}>
      <div className={styles.fields} role="group" aria-label="Filter holidays">
        <Select label="Where" value={filters.where} onChange={(v) => update("where", v)}>
          <option value="">Anywhere</option>
          {hasIndia && <option value="india">All of India</option>}
          {hasInternational && <option value="international">All international</option>}
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </Select>
        <Select label="Kind of holiday" value={filters.theme} onChange={(v) => update("theme", v)}>
          <option value="">Any</option>
          {themes.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </Select>
        <Select label="Length" value={filters.duration} onChange={(v) => update("duration", v)}>
          <option value="">Any length</option>
          {DURATIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
        <Select label="When" value={filters.month} onChange={(v) => update("month", v)}>
          <option value="">Not sure yet</option>
          {MONTHS.map((m) => (
            <option key={m} value={m.slice(0, 3).toLowerCase()}>
              {m}
            </option>
          ))}
        </Select>
      </div>
      <div className={styles.summary}>
        <p aria-live="polite">
          {resultCount} {resultCount === 1 ? "holiday" : "holidays"}
        </p>
        {active && (
          <button type="button" className={styles.clear} onClick={() => setSearchParams({}, { preventScrollReset: true })}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className={[styles.field, value && styles.fieldActive].filter(Boolean).join(" ")}>
      <span className={styles.label}>{label}</span>
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </label>
  );
}
