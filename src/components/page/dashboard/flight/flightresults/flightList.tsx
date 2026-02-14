import { mockDeals } from "@/static-data/flightData";
import { FlightDeal } from "@/static-data/flightData";
import { Button } from "@/components/shadcn-ul/button";
import { FormBtn } from "@/components/utility/button";
import { Card } from "@/components/shadcn-ul/card";
import { Checkbox } from "@/components/shadcn-ul/checkbox";
import { Badge } from "@/components/shadcn-ul/badge";
import { Heart } from "lucide-react";
import Image from "next/image";

export function FlightList() {
  return (
    <div className="w-full flex flex-col gap-4">
      {mockDeals.map((deal) => (
        <FlightCard deal={deal} key={deal.id} />
      ))}
    </div>
  );
}

export function FlightCard({ deal }: { deal: FlightDeal }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      {/* Header Section with Airline and Badge */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-6">
          {/* Left: Logo and Info */}
          <div className="flex items-center gap-4">
            {/* Airline Logo */}
            <div className="w-[90px] h-[90px] relative flex-shrink-0 flex items-center justify-center">
              {deal.logo ? (
                typeof deal.logo === "string" && deal.logo.startsWith("/") ? (
                  <Image
                    src={deal.logo}
                    alt={deal.airline}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="text-5xl">{deal.logo}</div>
                )
              ) : (
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{deal.airline}</span>
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded">
                  <span className="text-sm font-semibold">4.2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Very Good</p>
                  <p className="text-xs text-gray-500">54 reviews</p>
                </div>
              </div>

              {/* Badge if exists */}
              {deal.badge && (
                <Badge
                  className={`${deal.badgeColor} w-fit`}
                  variant="secondary"
                >
                  {deal.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Right: Price */}
          <div className="text-right">
            <p className="text-xs text-gray-500">starting from</p>
            <p className="text-3xl font-bold text-red-500">${deal.price}</p>
            {deal.originalPrice && deal.originalPrice > deal.price && (
              <p className="text-sm text-gray-400 line-through">
                ${deal.originalPrice}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Flight Options */}
      <div className="p-6 pt-4 space-y-3">
        {/* First Flight Option */}
        <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          <Checkbox id={`${deal.id}-1`} />

          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Time */}
            <div>
              <p className="font-semibold text-sm">
                {deal.departTime} - {deal.arrivalTime}
              </p>
              <p className="text-xs text-gray-500">{deal.airline}</p>
            </div>

            {/* Stops */}
            <div className="text-center">
              <p className="font-medium text-sm">{deal.stops}</p>
            </div>

            {/* Duration */}
            <div className="text-right">
              <p className="font-medium text-sm">{deal.duration}</p>
              <p className="text-xs text-gray-500">
                {deal.destination || "EWR-BNA"}
              </p>
            </div>
          </div>
        </div>

        {/* Second Flight Option */}
        <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          <Checkbox id={`${deal.id}-2`} />

          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Time */}
            <div>
              <p className="font-semibold text-sm">
                {deal.departTime} - {deal.arrivalTime}
              </p>
              <p className="text-xs text-gray-500">{deal.airline}</p>
            </div>

            {/* Stops */}
            <div className="text-center">
              <p className="font-medium text-sm">{deal.stops}</p>
            </div>

            {/* Duration */}
            <div className="text-right">
              <p className="font-medium text-sm">{deal.duration}</p>
              <p className="text-xs text-gray-500">
                {deal.destination || "EWR-BNA"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Footer - Favorite and View Deals */}
      <div className="p-6 pt-4 flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className="flex-shrink-0  hover:bg-gray-50 border border-secondaryT"
        >
          <Heart className="h-5 w-5" />
        </Button>

        <Button className="flex-1 bg-mint hover:bg-mint/90 font-semibold bg-secondaryT text-primaryT">
          View Deals
        </Button>
      </div>
    </Card>
  );
}
