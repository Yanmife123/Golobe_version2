"use client";
import { Checkbox } from "@/components/shadcn-ul/checkbox";
import { Slider } from "@/components/shadcn-ul/slider";
import { Card } from "@/components/shadcn-ul/card";
import { mockDeals } from "@/static-data/flightData";
import {
  FilterState,
  PRICE_MIN,
  PRICE_MAX,
  TIME_MIN,
  TIME_MAX,
  formatMinutesToClock,
} from "./flightFilterUtils";

const ratingOptions = [0, 1, 2, 3, 4];
const airlineOptions = Array.from(new Set(mockDeals.map((d) => d.airline)));

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function toggleAirline(airline: string) {
    const airlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onChange({ ...filters, airlines });
  }

  return (
    <Card className="p-4 gap-5">
      <h2 className="text-lg font-semibold">Filters</h2>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Price</p>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={filters.priceRange}
          onValueChange={(value) =>
            onChange({ ...filters, priceRange: value as [number, number] })
          }
        />
        <div className="flex justify-between text-xs text-grey">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Departure Time</p>
        <Slider
          min={TIME_MIN}
          max={TIME_MAX}
          step={15}
          value={filters.timeRange}
          onValueChange={(value) =>
            onChange({ ...filters, timeRange: value as [number, number] })
          }
        />
        <div className="flex justify-between text-xs text-grey">
          <span>{formatMinutesToClock(filters.timeRange[0])}</span>
          <span>{formatMinutesToClock(filters.timeRange[1])}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">Rating</p>
        <div className="flex gap-2 flex-wrap">
          {ratingOptions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  minRating: filters.minRating === r ? 0 : r,
                })
              }
              className={`px-3 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                filters.minRating === r && r > 0
                  ? "bg-secondaryT border-secondaryT text-primaryT"
                  : "border-grey/40 text-primaryT hover:border-secondaryT"
              }`}
            >
              {r}+
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold">Airlines</p>
        <div className="space-y-2">
          {airlineOptions.map((airline) => (
            <label
              key={airline}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={filters.airlines.includes(airline)}
                onCheckedChange={() => toggleAirline(airline)}
              />
              {airline}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            priceRange: [PRICE_MIN, PRICE_MAX],
            timeRange: [TIME_MIN, TIME_MAX],
            minRating: 0,
            airlines: [],
          })
        }
        className="text-sm text-primaryT underline underline-offset-4 hover:text-secondaryT self-start cursor-pointer"
      >
        Clear all filters
      </button>
    </Card>
  );
}
