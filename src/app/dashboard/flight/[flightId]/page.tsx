import { notFound } from "next/navigation";
import { FlightDetailWrapper } from "@/components/page/dashboard/flight/flightdetail/flightDetailWrapper";
import { getFlightDetail } from "@/lib/supabase/flights";
import { PageTransition } from "@/components/utility/pageTransition";

export default async function FlightDetailPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  const flight = await getFlightDetail(flightId);

  if (!flight) notFound();

  return (
    <PageTransition className="py-6">
      <FlightDetailWrapper flight={flight} />
    </PageTransition>
  );
}
