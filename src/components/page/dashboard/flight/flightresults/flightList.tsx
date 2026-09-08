"use client";
import { useState } from "react";
import { FlightDeal } from "@/static-data/flightData";
import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ul/radio-group";
import { Badge } from "@/components/shadcn-ul/badge";
import { Heart } from "lucide-react";
import Link from "next/link";
import { AirlineLogo } from "../shared/airlineLogo";

const INITIAL_VISIBLE = 4;

export function FlightList({ deals }: { deals: FlightDeal[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleDeals = deals.slice(0, visibleCount);

  if (deals.length === 0) {
    return (
      <Card className="p-8 text-center text-grey">
        No flights match your filters. Try widening your search.
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {visibleDeals.map((deal) => (
        <FlightCard deal={deal} key={deal.id} />
      ))}
      {visibleCount < deals.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
          className="w-full py-3 rounded-md bg-primaryT text-white font-semibold cursor-pointer hover:bg-primaryT/90 transition-colors"
        >
          Show more results
        </button>
      )}
    </div>
  );
}

export function FlightCard({ deal }: { deal: FlightDeal }) {
  const [selected, setSelected] = useState("outbound");
  const [saved, setSaved] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 py-0">
      <div className="p-6  border-b border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 min-w-0">
            <AirlineLogo airline={deal.airline} brandColor={deal.brandColor} />

            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-gray-100 rounded flex-shrink-0">
                <span className="text-sm font-semibold">{deal.rating}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{deal.ratingLabel}</p>
                <p className="text-xs text-gray-500">
                  {deal.reviews} reviews
                </p>
              </div>
            </div>

            <Badge className={`${deal.badgeColor} w-fit`} variant="secondary">
              {deal.badge}
            </Badge>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-500">starting from</p>
            <p className="text-3xl font-bold text-salmon">${deal.price}</p>
            {deal.originalPrice > deal.price && (
              <p className="text-sm text-gray-400 line-through">
                ${deal.originalPrice}
              </p>
            )}
          </div>
        </div>
      </div>

      {/*<div className=" />*/}

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="sm:p-6 p-4 pt-4 gap-3"
      >
        <label
          htmlFor={`${deal.id}-outbound`}
          className={`flex items-center gap-4 p-3 border rounded-lg transition-colors cursor-pointer ${
            selected === "outbound"
              ? "border-secondaryT bg-secondaryLight/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <RadioGroupItem value="outbound" id={`${deal.id}-outbound`} />
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-sm">
                {deal.departTime} - {deal.arrivalTime}
              </p>
              <p className="text-xs text-gray-500">{deal.airline}</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">{deal.stops}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">{deal.duration}</p>
              <p className="text-xs text-gray-500">{deal.route}</p>
            </div>
          </div>
        </label>

        <label
          htmlFor={`${deal.id}-return`}
          className={`flex items-center gap-4 p-3 border rounded-lg transition-colors cursor-pointer ${
            selected === "return"
              ? "border-secondaryT bg-secondaryLight/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <RadioGroupItem value="return" id={`${deal.id}-return`} />
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-sm">
                {deal.returnDepartTime} - {deal.returnArrivalTime}
              </p>
              <p className="text-xs text-gray-500">{deal.airline}</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">{deal.stops}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">{deal.duration}</p>
              <p className="text-xs text-gray-500">
                {deal.route.split(" - ").reverse().join(" - ")}
              </p>
            </div>
          </div>
        </label>
      </RadioGroup>

      <div className="border-t border-gray-200" />

      <div className="p-6 pt-4 flex gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          className="flex-shrink-0 hover:bg-gray-50 border border-secondaryT"
        >
          <Heart
            className="h-5 w-5"
            fill={saved ? "#fd736e" : "none"}
            stroke={saved ? "#fd736e" : "currentColor"}
          />
        </Button>

        <Button
          asChild
          className="flex-1 bg-mint hover:bg-mint/90 font-semibold bg-secondaryT text-primaryT"
        >
          <Link href={`/dashboard/flight/${deal.id}`}>View Deals</Link>
        </Button>
      </div>
    </Card>
  );
}
