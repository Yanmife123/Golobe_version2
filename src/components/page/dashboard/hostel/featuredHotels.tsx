import Link from "next/link";
import { HotelCard } from "./hostelresults/hostelList";
import { Hotel } from "@/static-data/hotelData";

export function FeaturedHotels({ hotels }: { hotels: Hotel[] }) {
  if (hotels.length === 0) return null;

  return (
    <section className="py-10 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Places you might like</h2>
        <Link
          href="/dashboard/hostel/results"
          className="text-sm text-salmon font-medium hover:underline"
        >
          See all places
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </section>
  );
}
