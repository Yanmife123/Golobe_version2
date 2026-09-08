import { notFound } from "next/navigation";
import { BookingWrapper } from "@/components/page/dashboard/flight/booking/bookingWrapper";
import { getFlightDetail } from "@/lib/supabase/flights";
import { getPaymentMethods } from "@/lib/supabase/bookings";
import { createClient } from "@/lib/supabase/server";
import { PageTransition } from "@/components/utility/pageTransition";

export default async function FlightBookingPage({
  params,
}: {
  params: Promise<{ flightId: string }>;
}) {
  const { flightId } = await params;
  const supabase = await createClient();

  const [flight, paymentMethods, { data: userData }] = await Promise.all([
    getFlightDetail(flightId),
    getPaymentMethods(),
    supabase.auth.getUser(),
  ]);

  if (!flight) notFound();

  const passengerName =
    (userData.user?.user_metadata?.name as string | undefined) ||
    userData.user?.email ||
    "Guest";

  return (
    <PageTransition className="py-6">
      <BookingWrapper
        flight={flight}
        paymentMethods={paymentMethods}
        passengerName={passengerName}
      />
    </PageTransition>
  );
}
