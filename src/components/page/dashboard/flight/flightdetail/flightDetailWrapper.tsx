"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { Clock, Heart, Share2, MapPin, Check } from "lucide-react";
import { FlightBreadcrumb } from "../shared/flightBreadcrumb";
import { PriceSidebar } from "../shared/priceSidebar";
import { SegmentCard } from "./segmentCard";
import {
  FlightDetail,
  flightClasses,
  FlightClass,
  scaleFlightForClass,
} from "@/static-data/flightDetailData";

export function FlightDetailWrapper({ flight }: { flight: FlightDetail }) {
  const [selectedClass, setSelectedClass] = useState<FlightClass>("Economy");
  const [activeImage, setActiveImage] = useState(flight.heroImage);
  const [saved, setSaved] = useState(false);

  const priced = scaleFlightForClass(flight, selectedClass);

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl px-5 space-y-6">
        <FlightBreadcrumb
          items={[
            { label: "Flights", href: "/dashboard/flight/results" },
            { label: flight.fromCity },
            { label: flight.toCity },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{flight.title}</h1>
            <p className="flex items-center gap-1 text-sm text-grey">
              <MapPin className="w-4 h-4" />
              {flight.fromCity} ({flight.fromCode}) → {flight.toCity} (
              {flight.toCode})
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded font-semibold">
                {flight.rating}
              </span>
              <span className="text-sm text-grey">
                {flight.ratingLabel} · {flight.reviews} reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-3xl font-bold text-salmon">
                ${priced.price}
              </p>
              {priced.originalPrice > priced.price && (
                <p className="text-sm text-gray-400 line-through">
                  ${priced.originalPrice}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSaved((s) => !s)}
                className="border-secondaryT"
              >
                <Heart
                  className="h-5 w-5"
                  fill={saved ? "#fd736e" : "none"}
                  stroke={saved ? "#fd736e" : "currentColor"}
                />
              </Button>
              <Button variant="outline" size="icon" className="border-secondaryT">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                asChild
                className="bg-secondaryT text-primaryT font-semibold hover:bg-mintygreen"
              >
                <Link href={`/dashboard/flight/${flight.id}/booking`}>
                  Book now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[340px] rounded-xl overflow-hidden">
          <Image
            src={activeImage}
            alt={flight.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-semibold">Basic Economy Features</h2>
              <div className="flex items-center gap-4">
                {flightClasses.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedClass(c)}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <span
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${
                        selectedClass === c
                          ? "bg-secondaryT border-secondaryT"
                          : "border-grey"
                      }`}
                    >
                      {selectedClass === c && (
                        <Check className="w-3 h-3 text-primaryT" />
                      )}
                    </span>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {flight.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 ${
                    activeImage === src ? "ring-2 ring-secondaryT" : ""
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            <Card className="bg-secondaryLight border-none p-5 gap-3">
              <h3 className="font-semibold">{flight.airline} Airlines Policies</h3>
              <ul className="space-y-2">
                {flight.policies.map((policy) => (
                  <li
                    key={policy}
                    className="flex items-start gap-2 text-sm text-primaryT"
                  >
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {policy}
                  </li>
                ))}
              </ul>
            </Card>

            {flight.segments.map((segment) => (
              <SegmentCard
                key={segment.label}
                segment={segment}
                airline={flight.airline}
                brandColor={flight.brandColor}
              />
            ))}
          </div>

          <div>
            <PriceSidebar flight={priced} classLabel={selectedClass} />
          </div>
        </div>
      </div>
    </div>
  );
}
