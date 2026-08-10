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
import { SavedCard } from "./cardListStep";

export function AddCardDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (card: SavedCard) => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United States");
  const [saveInfo, setSaveInfo] = useState(true);
  const [error, setError] = useState("");

  function reset() {
    setCardNumber("");
    setExpDate("");
    setCvc("");
    setName("");
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length < 12 || !expDate || !cvc || !name.trim()) {
      setError("Please fill in every field with valid card details.");
      return;
    }
    onAdd({
      id: crypto.randomUUID(),
      last4: digits.slice(-4),
      exp: expDate,
    });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="search_label max-w-fit relative text-xs">
              Card Number
            </label>
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4321 4321 4321 4321"
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

          <FormBtn type="submit">Add Card</FormBtn>

          <p className="text-xs text-grey text-center">
            By confirming, you allow us to charge your card for this payment
            and future payments in accordance with our terms.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
