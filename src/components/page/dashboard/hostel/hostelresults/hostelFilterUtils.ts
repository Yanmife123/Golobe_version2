import { HotelCategory } from "@/static-data/hotelData";

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
