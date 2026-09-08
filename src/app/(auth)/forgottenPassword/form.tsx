"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "@/components/utility/input";
import { FormBtn } from "@/components/utility/button";

import { requestPasswordResetAction } from "@/lib/supabase/auth-actions";

type forgotten = {
  email: string;
};

export default function ForgottenPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotten>();
  const onSubmit: SubmitHandler<forgotten> = async (data) => {
    setFormError(null);
    setSubmitting(true);
    const result = await requestPasswordResetAction(data.email);
    setSubmitting(false);
    if ("error" in result) {
      setFormError(result.error);
      return;
    }
    setSent(data.email);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-3 text-center items-center">
        <h3 className="font-semibold text-lg">Check your email</h3>
        <p className="text-sm text-grey">
          We&apos;ve sent a password reset link to <strong>{sent}</strong>.
          Click it to choose a new password.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <p className="text-salmon text-sm" role="alert">
          {formError}
        </p>
      )}
      <div>
        <Input
          name="email"
          type="email"
          label="email"
          classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
          placeholder="john.doe@gmail.com"
          register={register("email", {
            required: "This input is required",
          })}
        />
        {typeof errors.email?.message === "string" && (
          <p className="text-salmon text-xs mt-2">{errors.email.message}</p>
        )}
      </div>
      <FormBtn disabled={submitting}>
        {submitting ? "Sending..." : "Submit"}
      </FormBtn>
    </form>
  );
}
