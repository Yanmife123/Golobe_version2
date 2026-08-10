"use client";
import { useState } from "react";
import { Button } from "@/components/shadcn-ul/button";
import { Card } from "@/components/shadcn-ul/card";
import { Download, Share2, BedDouble } from "lucide-react";
import { Hotel, Room } from "@/static-data/hotelData";
import { FlightBreadcrumb } from "../../flight/shared/flightBreadcrumb";

export function ConfirmationStep({
  hotel,
  room,
  checkIn,
  checkOut,
  total,
}: {
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  total: number;
}) {
  const [copied, setCopied] = useState(false);
  const bookingRef = `${hotel.name.slice(0, 2).toUpperCase()}${hotel.id}23`;

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/dashboard/hostel/${hotel.id}/booking`
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
            { label: hotel.country, href: "/dashboard/hostel/results" },
            { label: hotel.city },
            { label: hotel.name },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{hotel.name}</h1>
            <p className="text-sm text-grey mt-1">{room.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-salmon">${total}</p>
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
                <p className="font-semibold">{checkIn}</p>
                <p className="text-xs text-grey">Check-in</p>
              </div>
              <BedDouble className="w-5 h-5 text-grey" />
              <div>
                <p className="font-semibold">{checkOut}</p>
                <p className="text-xs text-grey">Check-out</p>
              </div>
            </div>

            <div className="flex-1 p-5 space-y-4">
              <div className="flex items-center justify-between bg-secondaryT text-primaryT rounded-md px-4 py-2 -mx-1">
                <div>
                  <p className="font-semibold">John D.</p>
                  <p className="text-xs opacity-80">
                    Booking Confirmation N°{bookingRef}
                  </p>
                </div>
                <span className="text-sm font-semibold">Confirmed</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-grey">Hotel</p>
                  <p className="font-semibold">{hotel.name}</p>
                </div>
                <div>
                  <p className="text-grey">Address</p>
                  <p className="font-semibold">{hotel.address}</p>
                </div>
                <div>
                  <p className="text-grey">Room</p>
                  <p className="font-semibold">{room.name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-lg font-semibold">
                  {hotel.name.slice(0, 2).toUpperCase()}
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
            <p className="text-sm font-semibold">{hotel.city}</p>
            <div className="border-t border-dashed border-grey/40" />
            <p className="text-sm font-semibold self-end">{hotel.country}</p>
            <p className="text-xs text-grey mt-2">John D.</p>
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
              golobe may request additional verification at check-in before
              room keys or booking confirmations are issued.
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
