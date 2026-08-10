"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shadcn-ul/button";
import { Heart, Share2, MapPin, Star } from "lucide-react";
import { FlightBreadcrumb } from "../../flight/shared/flightBreadcrumb";
import { Hotel } from "@/static-data/hotelData";
import { Gallery } from "./gallery";
import { HighlightsRow } from "./highlightsRow";
import { RoomsList } from "./roomsList";
import { LocationMap } from "./locationMap";
import { AmenitiesGrid } from "./amenitiesGrid";
import { ReviewsSection } from "./reviewsSection";

export function HotelDetailWrapper({ hotel }: { hotel: Hotel }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl px-5 space-y-6">
        <FlightBreadcrumb
          items={[
            { label: hotel.country, href: "/dashboard/hostel/results" },
            { label: hotel.city },
            { label: hotel.name },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-semibold">{hotel.name}</h1>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: hotel.starRating }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-salmon text-salmon" />
                ))}
              </span>
              <span className="text-sm text-grey">
                {hotel.starRating} Star Hotel
              </span>
            </div>
            <p className="flex items-center gap-1 text-sm text-grey">
              <MapPin className="w-4 h-4" /> {hotel.address}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded font-semibold">
                {hotel.rating}
              </span>
              <span className="text-sm text-grey">
                {hotel.ratingLabel} · {hotel.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <p className="text-3xl font-bold text-salmon">
              ${hotel.pricePerNight}
              <span className="text-base font-normal">/night</span>
            </p>
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
                <Link href={`/dashboard/hostel/${hotel.id}/booking`}>
                  Book now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Gallery images={hotel.images} name={hotel.name} />

        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Overview</h2>
          <p className="text-sm text-grey leading-relaxed">{hotel.overview}</p>
        </div>

        <HighlightsRow
          rating={hotel.rating}
          ratingLabel={hotel.ratingLabel}
          reviewCount={hotel.reviewCount}
          highlights={hotel.highlights}
        />

        <div className="space-y-3 border-t pt-6">
          <h2 className="font-semibold text-lg">Available Rooms</h2>
          <RoomsList hotelId={hotel.id} rooms={hotel.rooms} />
        </div>

        <div className="border-t pt-6">
          <LocationMap address={`${hotel.address}, ${hotel.city}, ${hotel.country}`} />
        </div>

        <div className="border-t pt-6">
          <AmenitiesGrid amenities={hotel.amenities} />
        </div>

        <div className="border-t pt-6">
          <ReviewsSection
            rating={hotel.rating}
            ratingLabel={hotel.ratingLabel}
            initialReviews={hotel.reviews}
          />
        </div>
      </div>
    </div>
  );
}
