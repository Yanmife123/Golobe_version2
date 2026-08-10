"use client";
import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/shadcn-ul/card";
import { Input } from "@/components/shadcn-ul/input";
import { FormBtn } from "@/components/utility/button";
import { Mail } from "lucide-react";

export function LoginStep({ onContinue }: { onContinue: () => void }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  function handleContinue() {
    if (!phone.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onContinue();
  }

  return (
    <Card className="p-5 gap-4">
      <h3 className="font-semibold">Login or Sign up to book</h3>
      <div>
        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(false);
          }}
          className="border-[#79747E] py-2 rounded-sm"
        />
        {error && (
          <p className="text-destructive text-xs mt-1">
            Enter a phone number to continue
          </p>
        )}
      </div>
      <p className="text-xs text-grey -mt-2">
        We&apos;ll call or text you to confirm your number. Standard message
        and data rates apply.{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>
      </p>

      <FormBtn onClick={handleContinue}>Continue</FormBtn>

      <div className="flex items-center gap-3 text-xs text-grey">
        <span className="flex-1 border-t" />
        Or
        <span className="flex-1 border-t" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="flex__center py-2 border border-secondaryT rounded-sm cursor-pointer hover:bg-gray-50"
        >
          <Image src="/authIcon/facebook.svg" alt="Facebook" width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex__center py-2 border border-secondaryT rounded-sm cursor-pointer hover:bg-gray-50"
        >
          <Image src="/authIcon/google.svg" alt="Google" width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex__center py-2 border border-secondaryT rounded-sm cursor-pointer hover:bg-gray-50"
        >
          <Image src="/authIcon/apple.svg" alt="Apple" width={20} height={20} />
        </button>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="flex__center gap-2 py-2 border border-secondaryT rounded-sm cursor-pointer hover:bg-gray-50 text-sm font-medium"
      >
        <Mail className="w-4 h-4" /> Continue with email
      </button>
    </Card>
  );
}
