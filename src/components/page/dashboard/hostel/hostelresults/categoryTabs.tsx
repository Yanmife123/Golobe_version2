import { Card } from "@/components/shadcn-ul/card";
import { HotelCategory } from "@/static-data/hotelData";
import { categoryOrder } from "./hostelFilterUtils";

interface CategoryTabsProps {
  active: HotelCategory;
  onChange: (category: HotelCategory) => void;
  counts: Record<HotelCategory, number>;
}

export function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <Card className="w-full flex-row gap-6 px-6 py-0">
      {categoryOrder.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`py-4 text-left cursor-pointer border-b-2 transition-colors ${
            active === category
              ? "border-secondaryT text-primaryT"
              : "border-transparent text-grey hover:text-primaryT"
          }`}
        >
          <p className="font-semibold">{category}</p>
          <p className="text-xs text-grey">{counts[category]} places</p>
        </button>
      ))}
    </Card>
  );
}
