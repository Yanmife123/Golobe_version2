import { SearchResultSection } from "./resultsSection";
import { Hotel } from "@/static-data/hotelData";

export function HotelResultsWrapper({
  hotels,
  initialDestination,
  initialGuests,
}: {
  hotels: Hotel[];
  initialDestination?: string;
  initialGuests?: string;
}) {
  return (
    <SearchResultSection
      hotels={hotels}
      initialDestination={initialDestination}
      initialGuests={initialGuests}
    />
  );
}
