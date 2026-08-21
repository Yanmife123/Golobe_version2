"use client";
import { useMemo, useState } from "react";
import { FilterSidebar } from "./filterSidebar";
import { FlightList } from "./flightList";
import ResultHeader from "./resultHeader";
import { FlightDeal } from "@/static-data/flightData";
import {
  FilterState,
  SortOption,
  defaultFilters,
  parseClockToMinutes,
  parseDurationToMinutes,
} from "./flightFilterUtils";

export function SearchResultSection({
  deals,
  fromCode,
  toCode,
}: {
  deals: FlightDeal[];
  fromCode: string | null;
  toCode: string | null;
}) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("recommended");

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const [departCode, arriveCode] = deal.route.split(" - ");
      if (fromCode && departCode !== fromCode) return false;
      if (toCode && arriveCode !== toCode) return false;

      if (
        deal.price < filters.priceRange[0] ||
        deal.price > filters.priceRange[1]
      )
        return false;

      const departMinutes = parseClockToMinutes(deal.departTime);
      if (
        departMinutes < filters.timeRange[0] ||
        departMinutes > filters.timeRange[1]
      )
        return false;

      if (deal.rating < filters.minRating) return false;

      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(deal.airline)
      )
        return false;

      return true;
    });
  }, [deals, filters, fromCode, toCode]);

  const sortedDeals = useMemo(() => {
    const list = [...filteredDeals];
    switch (sort) {
      case "cheapest":
        return list.sort((a, b) => a.price - b.price);
      case "quickest":
        return list.sort(
          (a, b) =>
            parseDurationToMinutes(a.duration) -
            parseDurationToMinutes(b.duration),
        );
      case "best":
        return list.sort((a, b) => b.rating - a.rating);
      case "rating":
        return list.sort(
          (a, b) => b.reviews - a.reviews || b.rating - a.rating,
        );
      default:
        return list;
    }
  }, [filteredDeals, sort]);

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl flex gap-6">
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar deals={deals} filters={filters} onChange={setFilters} />
          </div>
        </aside>
        <main className="flex-1 min-w-0 sm:border-l-1 sm:border-primaryT/20 sm:px-5 space-y-6">
          <ResultHeader
            deals={filteredDeals}
            sort={sort}
            onSortChange={setSort}
            shownCount={sortedDeals.length}
            totalCount={deals.length}
          />
          <FlightList deals={sortedDeals} />
        </main>
      </div>
    </div>
  );
}
