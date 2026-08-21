import { notFound } from "next/navigation";
import { BookingWrapper } from "@/components/page/dashboard/flight/booking/bookingWrapper";
import { getFlightDetail } from "@/lib/supabase/flights";
import { PageTransition } from "@/components/utility/pageTransition";

export default async function FlightBookingPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  const flight = await getFlightDetail(flightId);

  if (!flight) notFound();

  return (
    <PageTransition className="py-6">
      <BookingWrapper flight={flight} />
    </PageTransition>
  );
}
