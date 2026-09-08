"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ul/dialog";
import { Input } from "@/components/shadcn-ul/input";
import { Checkbox } from "@/components/shadcn-ul/checkbox";
import { FormBtn } from "@/components/utility/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { addPaymentMethodAction } from "@/lib/supabase/bookings";
import { PaymentMethod } from "./cardListStep";

function detectBrand(digits: string): string {
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6(011|5)/.test(digits)) return "Discover";
  return "Card";
}

export function AddCardDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (card: PaymentMethod) => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United States");
  const [saveInfo, setSaveInfo] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setCardNumber("");
    setExpDate("");
    setCvc("");
    setName("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = cardNumber.replace(/\s/g, "");
    const expMatch = /^(\d{2})\/(\d{2})$/.exec(expDate.trim());

    if (digits.length < 12 || !/^\d+$/.test(digits) || !expMatch || cvc.length < 3 || !name.trim()) {
      setError("Please fill in every field with valid card details.");
      return;
    }

    const expMonth = Number(expMatch[1]);
    const expYear = 2000 + Number(expMatch[2]);
    if (expMonth < 1 || expMonth > 12) {
      setError("Enter a valid expiry date (MM/YY).");
      return;
    }

    setSubmitting(true);
    setError("");

    // Only display data leaves the browser — the full number/CVC are used
    // here to derive brand + last 4 digits, then discarded.
    const result = await addPaymentMethodAction(
      detectBrand(digits),
      digits.slice(-4),
      expMonth,
      expYear,
      name.trim()
    );

    setSubmitting(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    onAdd(result.card);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add a new Card</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-secondaryT bg-secondaryLight/20 rounded-md px-3 py-2 -mt-2">
          This is a demo — no real payment is processed. Enter any details;
          they don&apos;t need to be a real card.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="search_label max-w-fit relative text-xs">
              Card Number
            </label>
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="border-[#79747E] rounded-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="search_label max-w-fit relative text-xs">
                Exp. Date
              </label>
              <Input
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="02/27"
                className="border-[#79747E] rounded-sm"
              />
            </div>
            <div>
              <label className="search_label max-w-fit relative text-xs">
                CVC
              </label>
              <Input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="border-[#79747E] rounded-sm"
              />
            </div>
          </div>
          <div>
            <label className="search_label max-w-fit relative text-xs">
              Name on Card
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border-[#79747E] rounded-sm"
            />
          </div>
          <div>
            <label className="search_label max-w-fit relative text-xs">
              Country or Region
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full border-[#79747E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Turkey">Turkey</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={saveInfo}
              onCheckedChange={(v) => setSaveInfo(!!v)}
            />
            Securely save my information for 1-click checkout
          </label>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <FormBtn type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Card"}
          </FormBtn>

          <p className="text-xs text-grey text-center">
            No card network is contacted and nothing is ever charged. We only
            store the brand, last 4 digits, and expiry you enter here — never
            the full number or CVC.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
