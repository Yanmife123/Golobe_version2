import { getFlightDetail } from "./flightDetailData";

export interface BookingHistoryEntry {
  id: string;
  flightId: string;
  status: "upcoming" | "past";
  bookingRef: string;
  gate: string;
  seat: string;
}

const rawBookings: BookingHistoryEntry[] = [
  { id: "b1", flightId: "1", status: "upcoming", bookingRef: "EM123", gate: "A12", seat: "12B" },
  { id: "b2", flightId: "2", status: "upcoming", bookingRef: "FZ456", gate: "B04", seat: "22C" },
  { id: "b3", flightId: "5", status: "upcoming", bookingRef: "EM789", gate: "C18", seat: "4A" },
  { id: "b4", flightId: "3", status: "past", bookingRef: "QR321", gate: "A02", seat: "15D" },
  { id: "b5", flightId: "4", status: "past", bookingRef: "EY654", gate: "D09", seat: "8F" },
];

export interface BookingHistoryItem extends BookingHistoryEntry {
  flight: NonNullable<ReturnType<typeof getFlightDetail>>;
}

export const bookingHistory: BookingHistoryItem[] = rawBookings
  .map((b) => {
    const flight = getFlightDetail(b.flightId);
    return flight ? { ...b, flight } : null;
  })
  .filter((b): b is BookingHistoryItem => b !== null);
