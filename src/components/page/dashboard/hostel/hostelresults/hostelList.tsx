"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hotel } from "@/static-data/hotelData";
import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { Heart, MapPin, Star, BedDouble } from "lucide-react";

const INITIAL_VISIBLE = 4;

export function HotelList({ hotels }: { hotels: Hotel[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleHotels = hotels.slice(0, visibleCount);

  if (hotels.length === 0) {
    return (
      <Card className="p-8 text-center text-grey">
        No places match your filters. Try widening your search.
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {visibleHotels.map((hotel) => (
        <HotelCard hotel={hotel} key={hotel.id} />
      ))}
      {visibleCount < hotels.length && (
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

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const [saved, setSaved] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 p-0 flex-row flex-wrap md:flex-nowrap">
      <div className="relative w-full md:w-[380px] h-[220px] md:h-auto flex-shrink-0">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {hotel.images.length} images
        </span>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-grey">starting from</p>
            <p className="text-2xl font-bold text-salmon">
              ${hotel.pricePerNight}
              <span className="text-sm font-normal">/night</span>
            </p>
            <p className="text-xs text-grey">excl. tax</p>
          </div>
        </div>

        <p className="flex items-center gap-1 text-sm text-grey">
          <MapPin className="w-4 h-4 flex-shrink-0" /> {hotel.address}
        </p>

        <div className="flex items-center gap-4 text-sm flex-wrap">
          <span className="flex items-center gap-1">
            {Array.from({ length: hotel.starRating }, (_, i) => (
              <Star key={i} className="w-4 h-4 fill-salmon text-salmon" />
            ))}
            <span className="text-grey ml-1">{hotel.starRating} Star Hotel</span>
          </span>
          <span className="flex items-center gap-1 text-grey">
            <BedDouble className="w-4 h-4" /> {hotel.amenities.length}+ Amenities
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold px-2 py-0.5 bg-gray-100 rounded">
            {hotel.rating}
          </span>
          <span className="text-sm font-semibold">{hotel.ratingLabel}</span>
          <span className="text-sm text-grey">{hotel.reviewCount} reviews</span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex gap-3 mt-auto">
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
            className="flex-1 font-semibold bg-secondaryT text-primaryT hover:bg-mintygreen"
          >
            <Link href={`/dashboard/hostel/${hotel.id}`}>View Place</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
