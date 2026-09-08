import Image from "next/image";
import { Card } from "@/components/shadcn-ul/card";
import { Hotel, Room } from "@/static-data/hotelData";

export interface StayPriceBreakdown {
  baseFare: number;
  discount: number;
  taxes: number;
  serviceFee: number;
  total: number;
}

export function StayPriceSidebar({
  hotel,
  room,
  nights,
  priceBreakdown,
}: {
  hotel: Hotel;
  room: Room;
  nights: number;
  priceBreakdown: StayPriceBreakdown;
}) {
  return (
    <Card className="p-5 gap-4 sticky top-24">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
          <Image src={hotel.images[0]} alt={hotel.name} fill sizes="56px" className="object-cover" />
        </div>
        <div>
          <p className="text-xs text-grey">
            {nights} {nights === 1 ? "night" : "nights"}
          </p>
          <p className="font-semibold leading-tight">{hotel.name}</p>
          <p className="text-xs text-grey mt-0.5">{room.name}</p>
        </div>
      </div>

      <p className="text-xs text-grey border-t pt-4">
        Your booking is protected by{" "}
        <span className="font-semibold text-primaryT">golobe</span>
      </p>

      <div className="space-y-2 border-t pt-4">
        <p className="font-semibold">Price Details</p>
        <div className="flex justify-between text-sm">
          <span className="text-grey">
            ${room.pricePerNight} x {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span>${priceBreakdown.baseFare}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-grey">Discount</span>
          <span>-${priceBreakdown.discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-grey">Taxes</span>
          <span>${priceBreakdown.taxes}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-grey">Service Fee</span>
          <span>${priceBreakdown.serviceFee}</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold border-t pt-4">
        <span>Total</span>
        <span>${priceBreakdown.total}</span>
      </div>
    </Card>
  );
}
