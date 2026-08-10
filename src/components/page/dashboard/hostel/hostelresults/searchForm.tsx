"use client";
import { Input } from "@/components/shadcn-ul/input";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/shadcn-ul/field";
import { Card, CardContent } from "@/components/shadcn-ul/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ul/select";
import { Search, CalendarDays } from "lucide-react";

interface SearchFormProps {
  destination: string;
  onDestinationChange: (value: string) => void;
  guests: string;
  onGuestsChange: (value: string) => void;
}

export function SearchForm({
  destination,
  onDestinationChange,
  guests,
  onGuestsChange,
}: SearchFormProps) {
  return (
    <Card className="p-4 pt-7 md:p-5 bg-white text-primaryT w-full max-w-6xl">
      <CardContent className="p-0">
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldSet>
            <FieldGroup className="flex md:gap-6 gap-7 md:flex-row flex-col md:items-end">
              <Field className="flex-2 relative">
                <FieldLabel className="search_label max-w-fit" htmlFor="destination">
                  Enter Destination
                </FieldLabel>
                <Input
                  id="destination"
                  placeholder="City or hotel name"
                  value={destination}
                  onChange={(e) => onDestinationChange(e.target.value)}
                  className="border-[#79747E] py-2 rounded-sm"
                />
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">Check In</FieldLabel>
                <div className="relative">
                  <Input
                    defaultValue="Fri 12/2"
                    className="border-[#79747E] py-2 pr-9 rounded-sm"
                  />
                  <CalendarDays className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-grey pointer-events-none" />
                </div>
              </Field>
              <Field className="flex-1 relative">
                <FieldLabel className="search_label max-w-fit">Check Out</FieldLabel>
                <div className="relative">
                  <Input
                    defaultValue="Sun 12/4"
                    className="border-[#79747E] py-2 pr-9 rounded-sm"
                  />
                  <CalendarDays className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-grey pointer-events-none" />
                </div>
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
