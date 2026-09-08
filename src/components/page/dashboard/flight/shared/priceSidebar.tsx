import Image from "next/image";
import { Card } from "@/components/shadcn-ul/card";
import { FlightDetail } from "@/static-data/flightDetailData";

export function PriceSidebar({
  flight,
  classLabel = "Economy",
}: {
  flight: FlightDetail;
  classLabel?: string;
}) {
  const { priceBreakdown } = flight;

  return (
    <Card className="p-5 gap-4 sticky top-24">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={flight.heroImage}
            alt={flight.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs text-grey">{classLabel}</p>
          <p className="font-semibold leading-tight">{flight.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded font-semibold">
              {flight.rating}
            </span>
            <span className="text-xs text-grey">
              {flight.ratingLabel} · {flight.reviews} reviews
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-grey border-t pt-4">
        Your booking is protected by{" "}
        <span className="font-semibold text-primaryT">golobe</span>
      </p>

      <div className="space-y-2 border-t pt-4">
        <p className="font-semibold">Price Details</p>
        <div className="flex justify-between text-sm">
          <span className="text-grey">Base Fare</span>
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
