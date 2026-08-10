"use client";
import { useState } from "react";
import {
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Wifi,
  Coffee,
  Sparkles,
  Car,
  BellRing,
  Building2,
  Wind,
  WashingMachine,
  Ban,
  Briefcase,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "Outdoor pool": Waves,
  "Indoor pool": Waves,
  "Spa and wellness center": Sparkles,
  Restaurant: UtensilsCrossed,
  "Room service": BellRing,
  "Fitness center": Dumbbell,
  "Bar/Lounge": UtensilsCrossed,
  "Free Wi-Fi": Wifi,
  "Tea/coffee machine": Coffee,
  "24hr front desk": Building2,
  "Air-conditioned": Wind,
  "Laundry service": WashingMachine,
  "Non-smoking rooms": Ban,
  "Airport shuttle": Car,
  "Business center": Briefcase,
  Concierge: BellRing,
};

const INITIAL_VISIBLE = 8;

export function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? amenities : amenities.slice(0, INITIAL_VISIBLE);
  const remaining = amenities.length - INITIAL_VISIBLE;

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {visible.map((amenity) => {
          const Icon = iconMap[amenity] ?? Sparkles;
          return (
            <div key={amenity} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-primaryT" /> {amenity}
            </div>
          );
        })}
      </div>
      {!expanded && remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-sm text-salmon font-medium cursor-pointer"
        >
          +{remaining} more
        </button>
      )}
    </div>
  );
}
