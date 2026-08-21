"use client";
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
import { ALL_DESTINATIONS } from "./hostelFilterUtils";
import { CheckDatePicker } from "./checkDatePicker";

interface SearchFormProps {
  destination: string;
  onDestinationChange: (value: string) => void;
  destinationOptions: string[];
  guests: string;
  onGuestsChange: (value: string) => void;
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
  onSubmit?: () => void;
  title?: string;
}

export function SearchForm({
  destination,
  onDestinationChange,
  destinationOptions,
  guests,
  onGuestsChange,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onSubmit,
  title,
}: SearchFormProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
                <FieldLabel className="search_label max-w-fit" htmlFor="destination">
                  Enter Destination
                </FieldLabel>
                <Select value={destination} onValueChange={onDestinationChange}>
                  <SelectTrigger id="destination" className="w-full border-[#79747E] py-2 h-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_DESTINATIONS}>{ALL_DESTINATIONS}</SelectItem>
                    {destinationOptions.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">Check In</FieldLabel>
                <CheckDatePicker
                  date={checkIn}
                  onChange={onCheckInChange}
                  minDate={today}
                  placeholder="Select date"
                />
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">Check Out</FieldLabel>
                <CheckDatePicker
                  date={checkOut}
                  onChange={onCheckOutChange}
                  minDate={checkIn ?? today}
                  placeholder="Select date"
                />
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">
                  Rooms &amp; Guests
                </FieldLabel>
                <Select value={guests} onValueChange={onGuestsChange}>
                  <SelectTrigger className="w-full border-[#79747E] py-2 h-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 room, 1 guest">1 room, 1 guest</SelectItem>
                    <SelectItem value="1 room, 2 guests">1 room, 2 guests</SelectItem>
                    <SelectItem value="2 rooms, 2 guests">2 rooms, 2 guests</SelectItem>
                    <SelectItem value="2 rooms, 4 guests">2 rooms, 4 guests</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <button
                type="submit"
                aria-label="Search hotels"
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
