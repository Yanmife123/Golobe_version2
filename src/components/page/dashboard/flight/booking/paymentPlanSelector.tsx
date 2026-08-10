"use client";
import { Card } from "@/components/shadcn-ul/card";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ul/radio-group";

export type PayPlan = "full" | "partial";

export function PaymentPlanSelector({
  plan,
  onChange,
  total,
}: {
  plan: PayPlan;
  onChange: (plan: PayPlan) => void;
  total: number;
}) {
  const partialNow = (total / 2).toFixed(2);
  const partialLater = (total - Number(partialNow)).toFixed(2);

  return (
    <Card className="p-5 gap-0">
      <RadioGroup
        value={plan}
        onValueChange={(v) => onChange(v as PayPlan)}
        className="gap-0"
      >
        <label
          htmlFor="plan-full"
          className={`flex items-center justify-between gap-3 rounded-lg p-4 cursor-pointer transition-colors ${
            plan === "full"
              ? "bg-secondaryT text-primaryT"
              : "hover:bg-gray-50"
          }`}
        >
          <div>
            <p className="font-semibold">Pay in full</p>
            <p className="text-sm opacity-80">
              Pay the total and you are all set
            </p>
          </div>
          <RadioGroupItem value="full" id="plan-full" className="bg-white" />
        </label>

        <div className="p-4 space-y-1">
          <label
            htmlFor="plan-partial"
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <p className="font-semibold">Pay part now, part later</p>
            <RadioGroupItem value="partial" id="plan-partial" />
          </label>
          <p className="text-sm text-grey">
            Pay ${partialNow} now, and the rest (${partialLater}) will be
            automatically charged to the same payment method later. No extra
            fees.
          </p>
          <button
            type="button"
            className="text-sm underline underline-offset-4 cursor-pointer"
          >
            More info
          </button>
        </div>
      </RadioGroup>
    </Card>
  );
}
