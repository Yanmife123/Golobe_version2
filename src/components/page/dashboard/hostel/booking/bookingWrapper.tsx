"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormBtn } from "@/components/utility/button";
import { FlightBreadcrumb } from "../../flight/shared/flightBreadcrumb";
import {
  PaymentPlanSelector,
  PayPlan,
} from "../../flight/booking/paymentPlanSelector";
import { CardListStep, PaymentMethod } from "../../flight/booking/cardListStep";
import { AddCardDialog } from "../../flight/booking/addCardDialog";
import { StayCard } from "./stayCard";
import { StayPriceSidebar } from "./stayPriceSidebar";
import { ConfirmationStep } from "./confirmationStep";
import { Hotel } from "@/static-data/hotelData";

type Step = "payment" | "confirmation";

const CHECK_IN = "Fri, Dec 2";
const CHECK_OUT = "Sun, Dec 4";
const NIGHTS = 2;
const GUESTS = "1 room, 2 guests";

export function BookingWrapper({
  hotel,
  paymentMethods,
}: {
  hotel: Hotel;
  paymentMethods: PaymentMethod[];
}) {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const room = hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0];

  const [step, setStep] = useState<Step>("payment");
  const [payPlan, setPayPlan] = useState<PayPlan>("full");
  const [cards, setCards] = useState<PaymentMethod[]>(paymentMethods);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    paymentMethods[0]?.id ?? null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const baseFare = room.pricePerNight * NIGHTS;
  const discount = Math.round(baseFare * 0.1);
  const taxes = Math.round(baseFare * 0.08);
  const serviceFee = 25;
  const total = baseFare - discount + taxes + serviceFee;
  const priceBreakdown = { baseFare, discount, taxes, serviceFee, total };

  if (step === "confirmation") {
    return (
      <ConfirmationStep
        hotel={hotel}
        room={room}
        checkIn={CHECK_IN}
        checkOut={CHECK_OUT}
        total={total}
      />
    );
  }

  return (
    <div className="w-full flex__center">
      <div className="w-full max-w-6xl px-5 space-y-6">
        <FlightBreadcrumb
          items={[
            { label: hotel.country, href: "/dashboard/hostel/results" },
            {
              label: hotel.name,
              href: `/dashboard/hostel/${hotel.id}`,
            },
            { label: "Booking" },
          ]}
        />

        <div className="flex items-start justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-semibold">{hotel.name}</h1>
          <p className="text-3xl font-bold text-salmon">${total}</p>
        </div>

        <StayCard
          hotel={hotel}
          room={room}
          checkIn={CHECK_IN}
          checkOut={CHECK_OUT}
          guests={GUESTS}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <PaymentPlanSelector
              plan={payPlan}
              onChange={setPayPlan}
              total={total}
            />

            <CardListStep
              cards={cards}
              selectedCardId={selectedCardId}
              onSelectCard={setSelectedCardId}
              onAddCardClick={() => setDialogOpen(true)}
            />

            <p className="text-xs text-grey text-center">
              Demo checkout — no real payment is taken, no card network is
              contacted.
            </p>

            <FormBtn
              disabled={!selectedCardId}
              onClick={() => setStep("confirmation")}
            >
              Confirm &amp; Pay ${total}
            </FormBtn>
          </div>

          <div>
            <StayPriceSidebar
              hotel={hotel}
              room={room}
              nights={NIGHTS}
              priceBreakdown={priceBreakdown}
            />
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
