"use client";
import { useState } from "react";
import { FormBtn } from "@/components/utility/button";
import { FlightBreadcrumb } from "../shared/flightBreadcrumb";
import { PriceSidebar } from "../shared/priceSidebar";
import { SegmentCard } from "../flightdetail/segmentCard";
import { PaymentPlanSelector, PayPlan } from "./paymentPlanSelector";
import { LoginStep } from "./loginStep";
import { CardListStep, SavedCard } from "./cardListStep";
import { AddCardDialog } from "./addCardDialog";
import { ConfirmationStep } from "./confirmationStep";
import { FlightDetail } from "@/static-data/flightDetailData";

type Step = "login" | "payment" | "confirmation";

export function BookingWrapper({ flight }: { flight: FlightDetail }) {
  const [step, setStep] = useState<Step>("login");
  const [payPlan, setPayPlan] = useState<PayPlan>("full");
  const [cards, setCards] = useState<SavedCard[]>([
    { id: "seed", last4: "4321", exp: "02/27" },
  ]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>("seed");
  const [dialogOpen, setDialogOpen] = useState(false);

  if (step === "confirmation") {
    return <ConfirmationStep flight={flight} />;
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

            {step === "login" ? (
              <LoginStep onContinue={() => setStep("payment")} />
            ) : (
              <>
                <CardListStep
                  cards={cards}
                  selectedCardId={selectedCardId}
                  onSelectCard={setSelectedCardId}
                  onAddCardClick={() => setDialogOpen(true)}
                />
                <FormBtn
                  disabled={!selectedCardId}
                  onClick={() => setStep("confirmation")}
                >
                  Confirm &amp; Pay ${flight.price}
                </FormBtn>
              </>
            )}
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
