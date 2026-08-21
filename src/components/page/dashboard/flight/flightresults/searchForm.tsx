"use client";
import { Input } from "@/components/shadcn-ul/input";
import Image from "next/image";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/shadcn-ul/field";
import { Card, CardContent, CardTitle } from "@/components/shadcn-ul/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { Search } from "lucide-react";
import { AirportOption } from "@/lib/supabase/flights";
import { DepartReturnPicker } from "./departReturnPicker";

const ANY_AIRPORT = "any";

export type TripType = "return" | "no-return";

interface SearchFormProps {
  airports: AirportOption[];
  fromCode: string | null;
  toCode: string | null;
  onFromChange: (code: string | null) => void;
  onToChange: (code: string | null) => void;
  onSwap: () => void;
  tripType: TripType;
  onTripTypeChange: (t: TripType) => void;
  departDate: Date | null;
  returnDate: Date | null;
  onDatesChange: (depart: Date | null, ret: Date | null) => void;
  onSubmit?: () => void;
  title?: string;
}

export function SearchForm({
  airports,
  fromCode,
  toCode,
  onFromChange,
  onToChange,
  onSwap,
  tripType,
  onTripTypeChange,
  departDate,
  returnDate,
  onDatesChange,
  onSubmit,
  title,
}: SearchFormProps) {
  return (
    <Card className="p-4 pt-7 md:p-5 bg-white text-primaryT w-full max-w-6xl gap-4">
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent className="p-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          <FieldSet>
            <FieldGroup className="flex md:gap-6 gap-7 md:flex-row flex-col md:items-end">
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit" htmlFor="from">
                  From
                </FieldLabel>
                <Select
                  value={fromCode ?? ANY_AIRPORT}
                  onValueChange={(v) => onFromChange(v === ANY_AIRPORT ? null : v)}
                >
                  <SelectTrigger id="from" className="w-full border-[#79747E] py-2 h-auto">
                    <SelectValue placeholder="Any origin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY_AIRPORT}>Any origin</SelectItem>
                    {airports.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.city} ({a.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <button
                type="button"
                onClick={onSwap}
                aria-label="Swap from and to"
                className="shrink-0 self-center md:self-end md:mb-[9px] cursor-pointer"
              >
                <Image
                  src="/ion_swap-horizontal.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </button>

              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit" htmlFor="to">
                  To
                </FieldLabel>
                <Select
                  value={toCode ?? ANY_AIRPORT}
                  onValueChange={(v) => onToChange(v === ANY_AIRPORT ? null : v)}
                >
                  <SelectTrigger id="to" className="w-full border-[#79747E] py-2 h-auto">
                    <SelectValue placeholder="Any destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY_AIRPORT}>Any destination</SelectItem>
                    {airports.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.city} ({a.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit" htmlFor="Trip">
                  Trip
                </FieldLabel>
                <select
                  name="Trip"
                  id="Trip"
                  value={tripType}
                  onChange={(e) => {
                    const value = e.target.value as TripType;
                    onTripTypeChange(value);
                    if (value === "no-return" && returnDate) {
                      onDatesChange(departDate, null);
                    }
                  }}
                  className="py-2 px-2 w-full h-[38px] outline-none border border-[#79747E] rounded-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="return">Return</option>
                  <option value="no-return">No-return</option>
                </select>
              </Field>
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit">
                  {tripType === "no-return" ? "Depart" : "Depart - Return"}
                </FieldLabel>
                <DepartReturnPicker
                  departDate={departDate}
                  returnDate={returnDate}
                  onChange={onDatesChange}
                  noReturn={tripType === "no-return"}
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
