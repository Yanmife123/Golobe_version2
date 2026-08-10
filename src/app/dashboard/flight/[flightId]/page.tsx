import { notFound } from "next/navigation";
import { FlightDetailWrapper } from "@/components/page/dashboard/flight/flightdetail/flightDetailWrapper";
import { getFlightDetail } from "@/static-data/flightDetailData";

export default async function FlightDetailPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  const flight = getFlightDetail(flightId);

  if (!flight) notFound();

  return (
    <div className="py-6">
      <FlightDetailWrapper flight={flight} />
    </div>
  );
}
