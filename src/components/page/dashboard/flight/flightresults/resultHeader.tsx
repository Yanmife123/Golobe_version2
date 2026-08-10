import { DynamicResultHeader } from "@/components/UI/dashboard/searchFlightHostelResult/resultHeaderUI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { List } from "lucide-react";
import { FlightDeal } from "@/static-data/flightData";
import { SortOption, parseDurationToMinutes } from "./flightFilterUtils";

interface ResultHeaderProps {
  deals: FlightDeal[];
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  shownCount: number;
  totalCount: number;
}

export default function ResultHeader({
  deals,
  sort,
  onSortChange,
  shownCount,
  totalCount,
}: ResultHeaderProps) {
  const cheapest = deals.reduce(
    (min, d) => (d.price < min.price ? d : min),
    deals[0]
  );
  const quickest = deals.reduce(
    (min, d) =>
      parseDurationToMinutes(d.duration) < parseDurationToMinutes(min.duration)
        ? d
        : min,
    deals[0]
  );
  const best = deals.reduce(
    (max, d) => (d.rating > max.rating ? d : max),
    deals[0]
  );

  return (
    <div className="space-y-3">
      <DynamicResultHeader
        activeId={sort}
        onSelect={(id) => onSortChange(id as SortOption)}
        data={[
          {
            id: "cheapest",
            title: "Cheapest",
            description: deals.length
              ? `$${cheapest.price} · ${cheapest.duration}`
              : undefined,
          },
          {
            id: "best",
            title: "Best",
            description: deals.length
              ? `$${best.price} · ${best.duration}`
              : undefined,
          },
          {
            id: "quickest",
            title: "Quickest",
            description: deals.length
              ? `$${quickest.price} · ${quickest.duration}`
              : undefined,
          },
        ]}
      >
        <button
          type="button"
          onClick={() => onSortChange("rating")}
          className={`flex-1 flex items-center gap-2 text-sm font-medium cursor-pointer ${
            sort === "rating" ? "text-secondaryT" : "text-primaryT"
          }`}
        >
          <List className="w-4 h-4" /> Other sort
        </button>
      </DynamicResultHeader>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm">
          Showing {shownCount} of {totalCount} places
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-grey">Sort by</span>
          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger size="sm" className="border-none shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="cheapest">Cheapest</SelectItem>
              <SelectItem value="best">Best</SelectItem>
              <SelectItem value="quickest">Quickest</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
