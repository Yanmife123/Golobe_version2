"use client";
import { useState } from "react";
import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { Download, Share2, Plane } from "lucide-react";
import { FlightDetail } from "@/static-data/flightDetailData";
import { FlightBreadcrumb } from "../shared/flightBreadcrumb";
import type { FlightBooking } from "@/lib/supabase/bookings";

export function ConfirmationStep({
  flight,
  booking,
  passengerName,
  fareClass,
}: {
  flight: FlightDetail;
  booking: FlightBooking;
  passengerName: string;
  fareClass: string;
}) {
  const [copied, setCopied] = useState(false);
  const segment = flight.segments[0];
  const bookingRef = booking.bookingRef;

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/dashboard/flight/${flight.id}/booking`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-4xl px-5 space-y-6">
        <FlightBreadcrumb
          items={[
            { label: "Flights", href: "/dashboard/flight/results" },
            { label: flight.fromCity },
            { label: flight.toCity },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{flight.title}</h1>
            <p className="text-sm text-grey mt-1">
              {flight.fromCity} ({flight.fromCode}) → {flight.toCity} (
              {flight.toCode})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-salmon">${flight.price}</p>
            <Button
              variant="outline"
              size="icon"
              className="border-secondaryT"
              onClick={handleShare}
              aria-label="Copy booking link"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              className="bg-secondaryT text-primaryT font-semibold hover:bg-mintygreen"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
        {copied && (
          <p className="text-sm text-secondaryT text-right -mt-4">
            Link copied to clipboard
          </p>
        )}

        <Card className="p-0 overflow-hidden flex-row flex-wrap md:flex-nowrap">
          <div className="flex-1 flex">
            <div className="p-5 flex flex-col justify-center gap-4 border-r border-dashed border-grey/30 min-w-[110px]">
              <div>
                <p className="font-semibold">{segment.departTime}</p>
                <p className="text-xs text-grey">{segment.departAirport}</p>
              </div>
              <Plane className="w-5 h-5 rotate-90 text-grey" />
              <div>
                <p className="font-semibold">{segment.arriveTime}</p>
                <p className="text-xs text-grey">{segment.arriveAirport}</p>
              </div>
            </div>

            <div className="flex-1 p-5 space-y-4">
              <div className="flex items-center justify-between bg-secondaryT text-primaryT rounded-md px-4 py-2 -mx-1">
                <div>
                  <p className="font-semibold">{passengerName}</p>
                  <p className="text-xs opacity-80">
                    Boarding Pass N°{bookingRef}
                  </p>
                </div>
                <span className="text-sm font-semibold">{fareClass}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>
                  <p className="text-grey">Date</p>
                  <p className="font-semibold">{segment.date}</p>
                </div>
                <div>
                  <p className="text-grey">Flight time</p>
                  <p className="font-semibold">{segment.departTime}</p>
                </div>
                <div>
                  <p className="text-grey">Gate</p>
                  <p className="font-semibold">{booking.gate}</p>
                </div>
                <div>
                  <p className="text-grey">Seat</p>
                  <p className="font-semibold">{booking.seat}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-lg font-semibold">
                  {flight.airline.slice(0, 2).toUpperCase()}
                </p>
                <div
                  aria-hidden
                  className="h-8 flex-1 max-w-[220px] ml-4"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, #112211 0 2px, transparent 2px 5px)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-56 bg-secondaryLight/30 p-5 flex flex-col justify-center gap-2">
            <p className="text-sm font-semibold">{flight.fromCode}</p>
            <div className="border-t border-dashed border-grey/40" />
            <p className="text-sm font-semibold self-end">{flight.toCode}</p>
            <p className="text-xs text-grey mt-2">{passengerName}</p>
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Terms and Conditions</h2>
          <div className="space-y-2 text-sm text-grey">
            <p className="font-semibold text-primaryT">Payments</p>
            <p>
              Payments made via debit or credit card are processed through an
              automated, secure payment gateway subject to fraud screening.
            </p>
            <p>
              If billing details cannot be verified, golobe reserves the right
              to cancel the booking; any resulting costs or expenses remain
              the responsibility of the cardholder.
            </p>
            <p>
              golobe may request additional verification at check-in or at
              the airport before boarding passes or tickets are issued.
            </p>
          </div>
          <div className="space-y-1 text-sm text-grey">
            <p className="font-semibold text-primaryT">Contact Us</p>
            <p>Questions about your booking or our Terms of Use?</p>
            <p>Golobe Group Q.C.S.C, Golobe Tower, P.O. Box 22550</p>
            <p>
              Further details at{" "}
              <span className="underline">golobe.com/help</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
