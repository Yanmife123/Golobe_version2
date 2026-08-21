"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn-ul/popover";
import { MonthCalendar } from "@/components/utility/monthCalendar";

function formatShort(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
}

export function CheckDatePicker({
  date,
  onChange,
  minDate,
  placeholder,
}: {
  date: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between border border-[#79747E] rounded-sm py-2 px-3 h-[38px] text-sm cursor-pointer"
        >
          <span className={date ? "" : "text-grey"}>
            {date ? formatShort(date) : placeholder}
          </span>
          <CalendarDays className="w-4 h-4 text-grey flex-shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <MonthCalendar
          selected={date}
          onSelectDate={(d) => {
            onChange(d);
            setOpen(false);
          }}
          minDate={minDate}
        />
      </PopoverContent>
    </Popover>
  );
}
