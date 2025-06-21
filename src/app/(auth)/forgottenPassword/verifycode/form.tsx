"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn-ul/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FormBtn } from "@/components/utility/button";
import { useState } from "react";

export default function VerifyPasswordCodeForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(code);
  };
  const [code, setCode] = useState<string>();
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <InputOTP
          value={code}
          maxLength={6}
          onChange={(value) => {
            setCode(value);
          }}
          pattern={REGEXP_ONLY_DIGITS}
          name="code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-grey w-[50px]" />
            <InputOTPSlot index={1} className="border-grey w-[50px]" />
            <InputOTPSlot index={2} className="border-grey w-[50px]" />
            <InputOTPSlot index={3} className="border-grey w-[50px]" />
            <InputOTPSlot index={4} className="border-grey w-[50px]" />
            <InputOTPSlot index={5} className="border-grey w-[50px]" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-1 text-sm font-medium font-sans">
        Didn’t receive a code?{" "}
        <div className="text-salmon cursor-pointer">Resend</div>
      </div>
      <FormBtn> Verify </FormBtn>
    </form>
  );
}
