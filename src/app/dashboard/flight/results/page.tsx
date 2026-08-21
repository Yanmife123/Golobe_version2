import { FlightResultsWrapper } from "@/components/page/dashboard/flight/flightresults/flightResultsWrapper";
import { PageTransition } from "@/components/utility/pageTransition";
import { getAirports, getFlightDeals } from "@/lib/supabase/flights";

export default async function FlightResult({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const [deals, airports, params] = await Promise.all([
    getFlightDeals(),
    getAirports(),
    searchParams,
  ]);

  return (
    <PageTransition className="p-5">
      <FlightResultsWrapper
        deals={deals}
        airports={airports}
        initialFromCode={params.from ?? null}
        initialToCode={params.to ?? null}
      />
    </PageTransition>
  );
}
