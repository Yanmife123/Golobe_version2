import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { SortOption } from "./hostelFilterUtils";

interface ResultHeaderProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  shownCount: number;
  totalCount: number;
}

export default function ResultHeader({
  sort,
  onSortChange,
  shownCount,
  totalCount,
}: ResultHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 flex-wrap gap-2">
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
            <SelectItem value="priciest">Priciest</SelectItem>
            <SelectItem value="rating">Top rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
