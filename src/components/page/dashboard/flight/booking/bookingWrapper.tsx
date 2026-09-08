"use client";
import { useState } from "react";
import { FormBtn } from "@/components/utility/button";
import { FlightBreadcrumb } from "../shared/flightBreadcrumb";
import { PriceSidebar } from "../shared/priceSidebar";
import { SegmentCard } from "../flightdetail/segmentCard";
import { PaymentPlanSelector, PayPlan } from "./paymentPlanSelector";
import { CardListStep, PaymentMethod } from "./cardListStep";
import { AddCardDialog } from "./addCardDialog";
import { ConfirmationStep } from "./confirmationStep";
import { FlightDetail } from "@/static-data/flightDetailData";
import {
  createFlightBookingAction,
  type FlightBooking,
} from "@/lib/supabase/bookings";

const FARE_CLASS = "Economy";

export function BookingWrapper({
  flight,
  paymentMethods,
  passengerName,
}: {
  flight: FlightDetail;
  paymentMethods: PaymentMethod[];
  passengerName: string;
}) {
  const [payPlan, setPayPlan] = useState<PayPlan>("full");
  const [cards, setCards] = useState<PaymentMethod[]>(paymentMethods);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    paymentMethods[0]?.id ?? null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [booking, setBooking] = useState<FlightBooking | null>(null);

  if (booking) {
    return (
      <ConfirmationStep
        flight={flight}
        booking={booking}
        passengerName={passengerName}
        fareClass={FARE_CLASS}
      />
    );
  }

  async function handleConfirm() {
    if (!selectedCardId) return;
    setConfirming(true);
    setBookingError(null);

    const result = await createFlightBookingAction(
      flight.id,
      payPlan,
      flight.priceBreakdown,
      FARE_CLASS
    );

    setConfirming(false);

    if ("error" in result) {
      setBookingError(result.error);
      return;
    }

    setBooking(result.booking);
  }

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl px-5 space-y-6">
        <FlightBreadcrumb
          items={[
            { label: "Flights", href: "/dashboard/flight/results" },
            {
              label: flight.title,
              href: `/dashboard/flight/${flight.id}`,
            },
            { label: "Booking" },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-semibold">{flight.title}</h1>
          <p className="text-3xl font-bold text-salmon">${flight.price}</p>
        </div>

        <SegmentCard
          segment={flight.segments[1]}
          airline={flight.airline}
          brandColor={flight.brandColor}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <PaymentPlanSelector
              plan={payPlan}
              onChange={setPayPlan}
              total={flight.price}
            />

            <CardListStep
              cards={cards}
              selectedCardId={selectedCardId}
              onSelectCard={setSelectedCardId}
              onAddCardClick={() => setDialogOpen(true)}
            />

            {bookingError && (
              <p className="text-destructive text-sm" role="alert">
                {bookingError}
              </p>
            )}

            <p className="text-xs text-grey text-center">
              Demo checkout — no real payment is taken, no card network is
              contacted.
            </p>

            <FormBtn
              disabled={!selectedCardId || confirming}
              onClick={handleConfirm}
            >
              {confirming ? "Confirming..." : `Confirm & Pay $${flight.price}`}
            </FormBtn>
          </div>

          <div>
            <PriceSidebar flight={flight} />
          </div>
        </div>
      </div>

      <AddCardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={(card) => {
          setCards((prev) => [...prev, card]);
          setSelectedCardId(card.id);
        }}
      />
    </div>
  );
}
