"use client";
import { useState } from "react";
import { Plane, Hotel } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { Card } from "@/components/shadcn-ul/card";
import { bookingHistory } from "@/static-data/bookingHistory";
import { TicketRow } from "./ticketRow";

type Status = "upcoming" | "past";
type Category = "flights" | "stays";

export function HistorySection() {
  const [status, setStatus] = useState<Status>("upcoming");
  const [category, setCategory] = useState<Category>("flights");

  const flights = bookingHistory.filter((b) => b.status === status);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Tickets/Bookings</h1>
        <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-2 flex-row gap-0 mb-5 w-fit">
        <button
          type="button"
          onClick={() => setCategory("flights")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
            category === "flights"
              ? "bg-secondaryT text-primaryT"
              : "text-grey hover:text-primaryT"
          }`}
        >
          <Plane className="w-4 h-4" /> Flights
        </button>
        <button
          type="button"
          onClick={() => setCategory("stays")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
            category === "stays"
              ? "bg-secondaryT text-primaryT"
              : "text-grey hover:text-primaryT"
          }`}
        >
          <Hotel className="w-4 h-4" /> Stays
        </button>
      </Card>

      {category === "stays" ? (
        <Card className="p-10 text-center text-grey">
          No stay bookings yet.
        </Card>
      ) : flights.length === 0 ? (
        <Card className="p-10 text-center text-grey">
          No {status} flights.
        </Card>
      ) : (
        <div className="space-y-4">
          {flights.map((booking) => (
            <TicketRow key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
