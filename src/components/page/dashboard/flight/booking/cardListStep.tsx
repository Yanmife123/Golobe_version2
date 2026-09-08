"use client";
import { CreditCard, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ul/radio-group";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
}

export function CardListStep({
  cards,
  selectedCardId,
  onSelectCard,
  onAddCardClick,
}: {
  cards: PaymentMethod[];
  selectedCardId: string | null;
  onSelectCard: (id: string) => void;
  onAddCardClick: () => void;
}) {
  return (
    <div className="space-y-3">
      {cards.length > 0 && (
        <RadioGroup
          value={selectedCardId ?? undefined}
          onValueChange={onSelectCard}
          className="gap-3"
        >
          {cards.map((card) => {
            const isSelected = card.id === selectedCardId;
            return (
              <label
                key={card.id}
                htmlFor={`card-${card.id}`}
                className={`flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-secondaryT text-primaryT"
                    : "border border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">
                    {card.brand} •••• {card.last4}
                  </span>
                  <span className="text-sm opacity-80">
                    {String(card.expMonth).padStart(2, "0")}/
                    {String(card.expYear).slice(-2)}
                  </span>
                </div>
                <RadioGroupItem
                  value={card.id}
                  id={`card-${card.id}`}
                  className="bg-white"
                />
              </label>
            );
          })}
        </RadioGroup>
      )}

      <button
        type="button"
        onClick={onAddCardClick}
        className="w-full flex__center gap-2 border-2 border-dashed border-secondaryT rounded-lg py-6 text-secondaryT hover:bg-secondaryLight/20 transition-colors cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        Add a new card
      </button>
    </div>
  );
}
