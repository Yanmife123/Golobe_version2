import Link from "next/link";
import { FlightCard } from "./flightresults/flightList";
import { FlightDeal } from "@/static-data/flightData";

export function FeaturedFlights({ deals }: { deals: FlightDeal[] }) {
  if (deals.length === 0) return null;

  return (
    <section className="py-10 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Flight deals you might like</h2>
        <Link
          href="/dashboard/flight/results"
          className="text-sm text-salmon font-medium hover:underline"
        >
          See all flights
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <FlightCard deal={deal} key={deal.id} />
        ))}
      </div>
    </section>
  );
}
