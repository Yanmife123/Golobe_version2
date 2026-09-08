import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingWrapper } from "@/components/page/dashboard/hostel/booking/bookingWrapper";
import { getHotel } from "@/lib/supabase/hotels";
import { getPaymentMethods } from "@/lib/supabase/bookings";
import { PageTransition } from "@/components/utility/pageTransition";

export default async function HotelBookingPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  const [hotel, paymentMethods] = await Promise.all([
    getHotel(hotelId),
    getPaymentMethods(),
  ]);

  if (!hotel) notFound();

  return (
    <PageTransition className="py-6">
      <Suspense>
        <BookingWrapper hotel={hotel} paymentMethods={paymentMethods} />
      </Suspense>
    </PageTransition>
  );
}
