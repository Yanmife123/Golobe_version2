"use client";
import { useState } from "react";
import { SearchResultSection } from "./resultsSection";
import { SearchForm, TripType } from "./searchForm";
import { FlightDeal } from "@/static-data/flightData";
import { AirportOption } from "@/lib/supabase/flights";

export function FlightResultsWrapper({
  deals,
  airports,
  initialFromCode = null,
  initialToCode = null,
}: {
  deals: FlightDeal[];
  airports: AirportOption[];
  initialFromCode?: string | null;
  initialToCode?: string | null;
}) {
  const [fromCode, setFromCode] = useState<string | null>(initialFromCode);
  const [toCode, setToCode] = useState<string | null>(initialToCode);
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

  return (
    <div className=" flex flex-col gap-6 items-center ">
      <SearchForm
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
      />
      <SearchResultSection deals={deals} fromCode={fromCode} toCode={toCode} />
    </div>
  );
}
