import { Hotel, HotelCategory } from "@/static-data/hotelData";

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  freebies: string[];
  amenities: string[];
}

export type SortOption = "recommended" | "cheapest" | "priciest" | "rating";

export const PRICE_MIN = 50;
export const PRICE_MAX = 1200;

export const defaultFilters: FilterState = {
  priceRange: [PRICE_MIN, PRICE_MAX],
  minRating: 0,
  freebies: [],
  amenities: [],
};

export const categoryOrder: HotelCategory[] = ["Hotels", "Motels", "Resorts"];

export const ALL_DESTINATIONS = "All destinations";

export function getDestinationOptions(hotels: Hotel[]): string[] {
  return Array.from(new Set(hotels.map((h) => `${h.city}, ${h.country}`))).sort();
}
