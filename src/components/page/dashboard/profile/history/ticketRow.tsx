"use client";
import Link from "next/link";
import { Card } from "@/components/shadcn-ul/card";
import { Button } from "@/components/shadcn-ul/button";
import { CalendarDays, Clock, DoorOpen, Armchair, ChevronRight } from "lucide-react";
import { AirlineLogo } from "../../flight/shared/airlineLogo";
import { BookingHistoryItem } from "@/static-data/bookingHistory";

export function TicketRow({ booking }: { booking: BookingHistoryItem }) {
  const segment = booking.flight.segments[0];

  return (
    <Card className="p-4 md:p-5 flex-row items-center flex-wrap gap-4">
      <div className="w-20 h-14 border rounded-md flex__center flex-shrink-0">
        <AirlineLogo
          airline={booking.flight.airline}
          brandColor={booking.flight.brandColor}
          size="sm"
        />
      </div>

      <div className="flex items-center gap-2 min-w-[180px]">
        <div>
          <p className="font-semibold text-sm">{segment.departTime}</p>
          <p className="text-xs text-grey">{segment.departAirport}</p>
        </div>
        <span className="text-grey">—</span>
        <div>
          <p className="font-semibold text-sm">{segment.arriveTime}</p>
          <p className="text-xs text-grey">{segment.arriveAirport}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-grey" />
          <div>
            <p className="text-grey">Date</p>
            <p className="font-semibold">{segment.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-grey" />
          <div>
            <p className="text-grey">Flight time</p>
            <p className="font-semibold">{segment.departTime}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <DoorOpen className="w-4 h-4 text-grey" />
          <div>
            <p className="text-grey">Gate</p>
            <p className="font-semibold">{booking.gate}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Armchair className="w-4 h-4 text-grey" />
          <div>
            <p className="text-grey">Seat no.</p>
            <p className="font-semibold">{booking.seat}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button
          onClick={() => window.print()}
          className="bg-secondaryT text-primaryT font-semibold hover:bg-mintygreen"
        >
          Download Ticket
        </Button>
        <Button variant="outline" size="icon" className="border-secondaryT" asChild>
          <Link href={`/dashboard/flight/${booking.flightId}`}>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
