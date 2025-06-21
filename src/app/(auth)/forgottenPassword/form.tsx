"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Input from "@/components/utility/input";
import { FormBtn } from "@/components/utility/button";

import { useRouter } from "next/navigation";
type forgotten = {
  email: string;
};

export default function ForgottenPasswordForm() {
  const navigation = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotten>();
  const onSubmit: SubmitHandler<forgotten> = (data) => {
    console.log(data);
    navigation.push("/forgottenPassword/verifycode");
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
      <FormBtn className="">Submit</FormBtn>
    </form>
  );
}
