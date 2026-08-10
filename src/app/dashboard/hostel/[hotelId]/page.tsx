import { notFound } from "next/navigation";
import { HotelDetailWrapper } from "@/components/page/dashboard/hostel/hosteldetail/hotelDetailWrapper";
import { getHotel } from "@/static-data/hotelData";

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  const hotel = getHotel(hotelId);

  if (!hotel) notFound();

  return (
    <div className="py-6">
      <HotelDetailWrapper hotel={hotel} />
    </div>
  );
}
