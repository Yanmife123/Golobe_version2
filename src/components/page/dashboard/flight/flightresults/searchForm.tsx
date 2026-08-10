"use client";
import { useState } from "react";
import { Input } from "@/components/shadcn-ul/input";
import Image from "next/image";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/shadcn-ul/field";
import { Card, CardContent } from "@/components/shadcn-ul/card";
import { Search } from "lucide-react";

export function SearchForm() {
  const [from, setFrom] = useState("Lahore");
  const [to, setTo] = useState("Karachi");

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  return (
    <Card className="p-4 pt-7 md:p-5 bg-white text-primaryT w-full max-w-6xl">
      <CardContent className="p-0">
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldSet>
            <FieldGroup className="flex md:gap-6 gap-7 md:flex-row flex-col md:items-end">
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit" htmlFor="fromTo">
                  From - To
                </FieldLabel>
                <div className="relative">
                  <Input
                    placeholder="City or airport"
                    name="fromTo"
                    id="fromTo"
                    value={`${from} - ${to}`}
                    readOnly
                    className="border-[#79747E] py-4 pr-10 rounded-sm cursor-default"
                  />
                  <button
                    type="button"
                    onClick={swapCities}
                    aria-label="Swap from and to"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <Image
                      src="/ion_swap-horizontal.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">Trip</FieldLabel>
                <select
                  name="Trip"
                  id="Trip"
                  className="py-2 px-2 w-full h-[38px] outline-none border border-[#79747E] rounded-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="return">Return</option>
                  <option value="no-return">No-return</option>
                </select>
              </Field>
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit">
                  Depart- Return
                </FieldLabel>
                <Input
                  placeholder="07 Nov 22 - 13 Nov 22"
                  className="border-[#79747E] py-2 rounded-sm"
                />
              </Field>
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit">
                  Passenger - Class
                </FieldLabel>
                <Input
                  placeholder="1 Passenger, Economy"
                  className="border-[#79747E] py-2 rounded-sm"
                />
              </Field>
              <button
                type="submit"
                aria-label="Search flights"
                className="h-[38px] md:w-[38px] w-full shrink-0 rounded-sm bg-secondaryT text-primaryT flex__center hover:bg-mintygreen transition-colors cursor-pointer"
              >
                <Search size={18} />
              </button>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
