"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn-ul/popover";
import { MonthCalendar } from "@/components/utility/monthCalendar";

function formatShort(d: Date): string {
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export function DepartReturnPicker({
  departDate,
  returnDate,
  onChange,
  noReturn = false,
}: {
  departDate: Date | null;
  returnDate: Date | null;
  onChange: (depart: Date | null, ret: Date | null) => void;
  noReturn?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function handleSelect(date: Date) {
    if (noReturn) {
      onChange(date, null);
      setOpen(false);
      return;
    }
    if (!departDate || (departDate && returnDate)) {
      onChange(date, null);
      return;
    }
    if (date < departDate) {
      onChange(date, departDate);
    } else {
      onChange(departDate, date);
      setOpen(false);
    }
  }

  const label = departDate
    ? returnDate
      ? `${formatShort(departDate)} - ${formatShort(returnDate)}`
      : formatShort(departDate)
    : "Select dates";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between border border-[#79747E] rounded-sm py-2 px-3 h-[38px] text-sm cursor-pointer"
        >
          <span className={departDate ? "" : "text-grey"}>{label}</span>
          <CalendarDays className="w-4 h-4 text-grey flex-shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <MonthCalendar
          selected={departDate}
          rangeEnd={returnDate}
          onSelectDate={handleSelect}
          minDate={today}
        />
      </PopoverContent>
    </Popover>
  );
}
