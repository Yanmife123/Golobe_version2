import { Card } from "@/components/shadcn-ul/card";
import {
  Wifi,
  PlaneTakeoff,
  UtensilsCrossed,
  Tv,
  Accessibility,
  Plane,
} from "lucide-react";
import { FlightSegment } from "@/static-data/flightDetailData";
import { AirlineLogo } from "../shared/airlineLogo";

const amenityIcons = {
  wifi: Wifi,
  plane: PlaneTakeoff,
  meal: UtensilsCrossed,
  entertainment: Tv,
  accessibility: Accessibility,
};

export function SegmentCard({
  segment,
  airline,
  brandColor,
}: {
  segment: FlightSegment;
  airline: string;
  brandColor: string;
}) {
  return (
    <Card className="p-5 gap-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          {segment.label} {segment.date}
        </p>
        <p className="text-sm text-grey">{segment.durationText}</p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="border rounded-lg px-3 py-2">
          <AirlineLogo airline={airline} brandColor={brandColor} size="sm" />
          <p className="text-xs text-grey">{segment.aircraft}</p>
        </div>

        <div className="flex items-center gap-3 text-grey">
          {segment.amenities.map(({ icon, label }) => {
            const Icon = amenityIcons[icon];
            return <Icon key={label} aria-label={label} className="w-4 h-4" />;
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{segment.departTime}</p>
          <p className="text-xs text-grey">{segment.departAirport}</p>
        </div>
        <div className="flex-1 flex items-center px-4">
          <span className="flex-1 border-t border-dashed border-grey/50" />
          <Plane className="w-4 h-4 mx-2 rotate-90 text-primaryT" />
          <span className="flex-1 border-t border-dashed border-grey/50" />
        </div>
        <div className="text-right">
          <p className="font-semibold">{segment.arriveTime}</p>
          <p className="text-xs text-grey">{segment.arriveAirport}</p>
        </div>
      </div>
    </Card>
  );
}
