"use client";
import { useMemo, useState } from "react";
import { FilterSidebar } from "./hostelSidebar";
import { HotelList } from "./hostelList";
import ResultHeader from "./hostelHeader";
import { CategoryTabs } from "./categoryTabs";
import { SearchForm } from "./searchForm";
import { Hotel, HotelCategory } from "@/static-data/hotelData";
import {
  ALL_DESTINATIONS,
  FilterState,
  SortOption,
  defaultFilters,
  getDestinationOptions,
} from "./hostelFilterUtils";

export function SearchResultSection({
  hotels,
  initialDestination = ALL_DESTINATIONS,
  initialGuests = "1 room, 2 guests",
}: {
  hotels: Hotel[];
  initialDestination?: string;
  initialGuests?: string;
}) {
  const [destination, setDestination] = useState(initialDestination);
  const [guests, setGuests] = useState(initialGuests);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [category, setCategory] = useState<HotelCategory>("Hotels");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("recommended");

  const destinationOptions = useMemo(() => getDestinationOptions(hotels), [hotels]);

  const counts = useMemo(() => {
    const base: Record<HotelCategory, number> = {
      Hotels: 0,
      Motels: 0,
      Resorts: 0,
    };
    hotels.forEach((h) => {
      base[h.category] += 1;
    });
    return base;
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    const normalize = (s: string) =>
      s.toLowerCase().replace(/,/g, "").replace(/\s+/g, " ").trim();
    const query = destination === ALL_DESTINATIONS ? "" : normalize(destination);
    return hotels.filter((hotel) => {
      if (hotel.category !== category) return false;

      if (
        hotel.pricePerNight < filters.priceRange[0] ||
        hotel.pricePerNight > filters.priceRange[1]
      )
        return false;

      if (hotel.rating < filters.minRating) return false;

      if (
        filters.freebies.length > 0 &&
        !filters.freebies.every((f) => hotel.freebies.includes(f))
      )
        return false;

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => hotel.amenities.includes(a))
      )
        return false;

      if (
        query &&
        !normalize(`${hotel.name} ${hotel.city} ${hotel.country}`).includes(
          query
        )
      )
        return false;

      return true;
    });
  }, [hotels, category, filters, destination]);

  const sortedHotels = useMemo(() => {
    const list = [...filteredHotels];
    switch (sort) {
      case "cheapest":
        return list.sort((a, b) => a.pricePerNight - b.pricePerNight);
      case "priciest":
        return list.sort((a, b) => b.pricePerNight - a.pricePerNight);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [filteredHotels, sort]);

  return (
    <div className="flex flex-col gap-6 items-center">
      <SearchForm
        destination={destination}
        onDestinationChange={setDestination}
        destinationOptions={destinationOptions}
        guests={guests}
        onGuestsChange={setGuests}
        checkIn={checkIn}
        checkOut={checkOut}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
      />

      <div className="w-full flex__center">
        <div className="w-full max-w-6xl flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </aside>
          <main className="flex-1 min-w-0 space-y-4">
            <CategoryTabs
              active={category}
              onChange={(c) => setCategory(c)}
              counts={counts}
            />
            <ResultHeader
              sort={sort}
              onSortChange={setSort}
              shownCount={sortedHotels.length}
              totalCount={counts[category]}
            />
            <HotelList hotels={sortedHotels} />
          </main>
        </div>
      </div>
    </div>
  );
}
