"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!a && !!b && a.toDateString() === b.toDateString();
}

function isStrictlyBetween(d: Date, a: Date, b: Date): boolean {
  return d.getTime() > a.getTime() && d.getTime() < b.getTime();
}

export function MonthCalendar({
  selected,
  rangeEnd,
  onSelectDate,
  minDate,
}: {
  selected: Date | null;
  rangeEnd?: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
}) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(selected ?? new Date()));

  const firstDay = startOfMonth(viewMonth);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0
  ).getDate();

  const cells: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)
    ),
  ];

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          aria-label="Previous month"
          className="p-1 hover:bg-gray-100 rounded cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-sm font-semibold">
          {viewMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
          className="p-1 hover:bg-gray-100 rounded cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-grey mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const disabled = minDate ? date < minDate : false;
          const isEndpoint = isSameDay(date, selected) || isSameDay(date, rangeEnd);
          const inRange =
            selected && rangeEnd ? isStrictlyBetween(date, selected, rangeEnd) : false;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(date)}
              className={`text-xs h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                disabled
                  ? "text-grey/30 cursor-not-allowed"
                  : "cursor-pointer hover:bg-secondaryLight/40"
              } ${isEndpoint ? "bg-secondaryT text-primaryT font-semibold" : ""} ${
                inRange && !isEndpoint ? "bg-secondaryLight/30" : ""
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
