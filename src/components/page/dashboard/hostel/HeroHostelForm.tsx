"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchForm } from "./hostelresults/searchForm";
import { ALL_DESTINATIONS } from "./hostelresults/hostelFilterUtils";

export function HeroHostelForm({ destinationOptions }: { destinationOptions: string[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState(ALL_DESTINATIONS);
  const [guests, setGuests] = useState("1 room, 2 guests");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  function handleSubmit() {
    const params = new URLSearchParams();
    if (destination !== ALL_DESTINATIONS) params.set("destination", destination);
    if (guests) params.set("guests", guests);
    const query = params.toString();
    router.push(`/dashboard/hostel/results${query ? `?${query}` : ""}`);
  }

  return (
    <div className="z-2 relative flex__center md:mt-18">
      <SearchForm
        title="Where are you staying?"
        destination={destination}
        onDestinationChange={setDestination}
        destinationOptions={destinationOptions}
        guests={guests}
        onGuestsChange={setGuests}
        checkIn={checkIn}
        checkOut={checkOut}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
