"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchForm, TripType } from "./flightresults/searchForm";
import { AirportOption } from "@/lib/supabase/flights";

export function HeroFlightForm({ airports }: { airports: AirportOption[] }) {
  const router = useRouter();
  const [fromCode, setFromCode] = useState<string | null>(null);
  const [toCode, setToCode] = useState<string | null>(null);
  const [tripType, setTripType] = useState<TripType>("return");
  const [departDate, setDepartDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  function swapAirports() {
    setFromCode(toCode);
    setToCode(fromCode);
  }

  function handleDatesChange(depart: Date | null, ret: Date | null) {
    setDepartDate(depart);
    setReturnDate(ret);
  }

  function handleSubmit() {
    const params = new URLSearchParams();
    if (fromCode) params.set("from", fromCode);
    if (toCode) params.set("to", toCode);
    const query = params.toString();
    router.push(`/dashboard/flight/results${query ? `?${query}` : ""}`);
  }

  return (
    <div className="z-2 relative flex__center md:mt-18">
      <SearchForm
        title="Where are you flying?"
        airports={airports}
        fromCode={fromCode}
        toCode={toCode}
        onFromChange={setFromCode}
        onToChange={setToCode}
        onSwap={swapAirports}
        tripType={tripType}
        onTripTypeChange={setTripType}
        departDate={departDate}
        returnDate={returnDate}
        onDatesChange={handleDatesChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
