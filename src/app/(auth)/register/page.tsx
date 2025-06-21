"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import AuthSection from "@/components/page/Auth/Authsection";
import AuthHeader from "@/components/page/Auth/AuthHeader";
import OtherLoginOptions from "@/components/page/Auth/OtherLoginOptions";
import OtherLink from "@/components/page/Auth/Otherlink";
import Input from "@/components/utility/input";
import { FormBtn } from "@/components/utility/button";

type RegisterType = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterType>();
  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    console.log(data);
  };
  const password = watch("password");
  return (
    <AuthSection>
      <div className="flex flex-col gap-10">
        <AuthHeader
          h2="Sign up"
          paragraph="Let's get you all st up so you can access your personal account."
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="firstName"
                type="text"
                label="First Name"
                classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
                register={register("firstName", {
                  required: "This input is required",
                })}
              />
              {typeof errors.firstName?.message === "string" && (
                <p className="text-salmon text-xs mt-2">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div>
              <Input
                name="lastName"
                type="text"
                label="Last Name"
                classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
                register={register("lastName", {
                  required: "This input is required",
                })}
              />
              {typeof errors.lastName?.message === "string" && (
                <p className="text-salmon text-xs mt-2">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
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
                minLength: {
                  value: 6,
                  message: "Password must be more than 6 charaters",
                },
              })}
            />
            {typeof errors.password?.message === "string" && (
              <p className="text-salmon text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              classNameInput="px-2 py-2 border-1 border-grey rounded-[4px]"
              register={register("confirmPassword", {
                required: "This input is required",
                validate: (value) =>
                  value === password || "password doesn't match",
              })}
            />
            {typeof errors.confirmPassword?.message === "string" && (
              <p className="text-salmon text-xs mt-2">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rememberMe" />
              <div className="text-primary text-sm font-medium font-sans">
                I agree to all the <span className="text-salmon">Terms </span>{" "}
                and <span className="text-salmon"> Privacy Policies</span>
              </div>
            </div>
          </div>
          <div>
            <FormBtn className="mt-3 w-full">Create account</FormBtn>
            <div className="mt-3">
              <p className="text-sm font-sans text-center">
                Already have an account?
                <Link href="/login" className="text-salmon font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <OtherLoginOptions paragraph="Or login with" />
          <OtherLink />
        </div>
      </div>
    </AuthSection>
  );
}
