/** Date math for the auto-updating "years of experience" counter and role durations. */

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

/** Precise fractional years between a start date and now (or a fixed end). */
export function yearsBetween(startISO: string, endISO?: string): number {
  const start = new Date(startISO).getTime();
  const end = endISO ? new Date(endISO).getTime() : Date.now();
  return Math.max(0, (end - start) / MS_PER_YEAR);
}

/** Whole completed years of experience since the given start date. */
export function fullYears(startISO: string, endISO?: string): number {
  return Math.floor(yearsBetween(startISO, endISO));
}

/**
 * Human-readable duration like "4 yrs 5 mos" or "8 mos".
 * Used on the experience timeline; "Present" roles compute against today.
 */
export function durationLabel(startISO: string, endISO?: string): string {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const rem = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rem > 0) parts.push(`${rem} mo${rem > 1 ? 's' : ''}`);
  if (parts.length === 0) parts.push('1 mo');
  return parts.join(' ');
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Short "Jan 2022" style label; undefined end -> "Present". */
export function monthYear(iso?: string): string {
  if (!iso) return 'Present';
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "Jan 2022 — Present · 4 yrs 5 mos" range label for a role. */
export function rangeLabel(startISO: string, endISO?: string): string {
  return `${monthYear(startISO)} — ${monthYear(endISO)} · ${durationLabel(startISO, endISO)}`;
}
