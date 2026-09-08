"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/utility/input";
import { FormBtn } from "@/components/utility/button";
import { updatePasswordAction } from "@/lib/supabase/auth-actions";

type ResetType = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetType>();
  const password = watch("password");

  const onSubmit: SubmitHandler<ResetType> = async (data) => {
    setFormError(null);
    setSubmitting(true);
    const result = await updatePasswordAction(data.password);
    setSubmitting(false);
    if ("error" in result) {
      setFormError(result.error);
      return;
    }
    router.push("/login");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <p className="text-salmon text-sm" role="alert">
          {formError}. Your reset code may have expired — request a new one.
        </p>
      )}
      <div>
        <Input
          name="password"
          type="password"
          label="New password"
          classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
          register={register("password", {
            required: "This input is required",
            minLength: {
              value: 6,
              message: "Password must be more than 6 characters",
            },
          })}
        />
        {typeof errors.password?.message === "string" && (
          <p className="text-salmon text-xs mt-2">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
          register={register("confirmPassword", {
            required: "This input is required",
            validate: (value) => value === password || "password doesn't match",
          })}
        />
        {typeof errors.confirmPassword?.message === "string" && (
          <p className="text-salmon text-xs mt-2">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
      <FormBtn disabled={submitting}>
        {submitting ? "Saving..." : "Save new password"}
      </FormBtn>
    </form>
  );
}
