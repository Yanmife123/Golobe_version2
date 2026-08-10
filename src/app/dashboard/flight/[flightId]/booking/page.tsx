import { notFound } from "next/navigation";
import { BookingWrapper } from "@/components/page/dashboard/flight/booking/bookingWrapper";
import { getFlightDetail } from "@/static-data/flightDetailData";

export default async function FlightBookingPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  const flight = getFlightDetail(flightId);

  if (!flight) notFound();

  return (
    <div className="py-6">
      <BookingWrapper flight={flight} />
    </div>
  );
}
