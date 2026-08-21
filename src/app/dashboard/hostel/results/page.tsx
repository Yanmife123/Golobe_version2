import { HotelResultsWrapper } from "@/components/page/dashboard/hostel/hostelresults/hostelResultsWrapper";
import { PageTransition } from "@/components/utility/pageTransition";
import { getHotels } from "@/lib/supabase/hotels";

export default async function HotelResult({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; guests?: string }>;
}) {
  const [hotels, params] = await Promise.all([getHotels(), searchParams]);

  return (
    <PageTransition className="p-5">
      <HotelResultsWrapper
        hotels={hotels}
        initialDestination={params.destination}
        initialGuests={params.guests}
      />
    </PageTransition>
  );
}
