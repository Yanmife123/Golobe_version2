export interface FilterState {
  priceRange: [number, number];
  timeRange: [number, number];
  minRating: number;
  airlines: string[];
}

export type SortOption =
  | "recommended"
  | "cheapest"
  | "best"
  | "quickest"
  | "rating";

export const PRICE_MIN = 50;
export const PRICE_MAX = 1200;
export const TIME_MIN = 0;
export const TIME_MAX = 24 * 60 - 1;

export const defaultFilters: FilterState = {
  priceRange: [PRICE_MIN, PRICE_MAX],
  timeRange: [TIME_MIN, TIME_MAX],
  minRating: 0,
  airlines: [],
};

export function parseDurationToMinutes(duration: string): number {
  const hourMatch = duration.match(/(\d+)\s*h/);
  const minMatch = duration.match(/(\d+)\s*m/);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  return hours * 60 + minutes;
}

export function parseClockToMinutes(time: string): number {
  const match = time.trim().match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10) % 12;
  const minutes = parseInt(match[2], 10);
  if (match[3].toLowerCase() === "pm") hours += 12;
  return hours * 60 + minutes;
}

export function formatMinutesToClock(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")}${period}`;
}
