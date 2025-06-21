"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/utility/input";
import { FormBtn } from "@/components/utility/button";

type LoginType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          name="email"
          type="email"
          label="email"
          classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
          register={register("email", {
            required: "This input is required",
          })}
        />
        {typeof errors.email?.message === "string" && (
          <p className="text-salmon text-xs mt-2">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          name="password"
          type="password"
          label="password"
          classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
          register={register("password", {
            required: "This input is required",
          })}
        />
        {typeof errors.password?.message === "string" && (
          <p className="text-salmon text-xs mt-2">{errors.password.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="checkbox" id="rememberMe" />
          <div className="text-primary text-sm font-medium font-sans">
            Remember me
          </div>
        </div>
        <div>
          <Link
            href={"/forgottenPassword"}
            className="text-salmon text-sm font-medium font-sans"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <div>
        <FormBtn className="mt-4 w-full">Login</FormBtn>
        <div className="mt-3">
          <p className="text-sm font-sans text-center">
            Don&apos;t have an Account?{" "}
            <Link href="/register" className="text-salmon font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
