import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingWrapper } from "@/components/page/dashboard/hostel/booking/bookingWrapper";
import { getHotel } from "@/static-data/hotelData";

export default async function HotelBookingPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  const hotel = getHotel(hotelId);

  if (!hotel) notFound();

  return (
    <div className="py-6">
      <Suspense>
        <BookingWrapper hotel={hotel} />
      </Suspense>
    </div>
  );
}
