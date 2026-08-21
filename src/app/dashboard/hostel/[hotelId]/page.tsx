import { notFound } from "next/navigation";
import { HotelDetailWrapper } from "@/components/page/dashboard/hostel/hosteldetail/hotelDetailWrapper";
import { getHotel } from "@/lib/supabase/hotels";
import { PageTransition } from "@/components/utility/pageTransition";

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  const hotel = await getHotel(hotelId);

  if (!hotel) notFound();

  return (
    <PageTransition className="py-6">
      <HotelDetailWrapper hotel={hotel} />
    </PageTransition>
  );
}
