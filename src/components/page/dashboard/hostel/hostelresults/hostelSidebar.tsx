"use client";
import { useState } from "react";
import { Checkbox } from "@/components/shadcn-ul/checkbox";
import { Slider } from "@/components/shadcn-ul/slider";
import { Card } from "@/components/shadcn-ul/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { FilterState, PRICE_MIN, PRICE_MAX } from "./hostelFilterUtils";

const ratingOptions = [0, 1, 2, 3, 4];
const freebieOptions = [
  "Free breakfast",
  "Free parking",
  "Free internet",
  "Free airport shuttle",
  "Free cancellation",
];
const amenityOptions = [
  "24hr front desk",
  "Air-conditioned",
  "Fitness center",
  "Outdoor pool",
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-3 border-t pt-4 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <p className="text-sm font-semibold">{title}</p>
        {open ? (
          <ChevronUp className="w-4 h-4 text-grey" />
        ) : (
          <ChevronDown className="w-4 h-4 text-grey" />
        )}
      </button>
      {open && children}
    </div>
  );
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function toggleIn(key: "freebies" | "amenities", value: string) {
    const list = filters[key].includes(value)
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];
    onChange({ ...filters, [key]: list });
  }

  return (
    <Card className="p-4 gap-0 divide-y-0">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <FilterSection title="Price">
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
      </FilterSection>

      <FilterSection title="Rating">
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
      </FilterSection>

      <FilterSection title="Freebies">
        <div className="space-y-2">
          {freebieOptions.map((freebie) => (
            <label
              key={freebie}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={filters.freebies.includes(freebie)}
                onCheckedChange={() => toggleIn("freebies", freebie)}
              />
              {freebie}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleIn("amenities", amenity)}
              />
              {amenity}
            </label>
          ))}
          <p className="text-xs text-salmon">+24 more</p>
        </div>
      </FilterSection>

      <button
        type="button"
        onClick={() =>
          onChange({
            priceRange: [PRICE_MIN, PRICE_MAX],
            minRating: 0,
            freebies: [],
            amenities: [],
          })
        }
        className="text-sm text-primaryT underline underline-offset-4 hover:text-secondaryT self-start cursor-pointer pt-4"
      >
        Clear all filters
      </button>
    </Card>
  );
}
