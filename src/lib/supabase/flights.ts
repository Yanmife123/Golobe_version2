import { createClient } from "./server";
import type { FlightDeal } from "@/static-data/flightData";
import type { FlightAmenity, FlightDetail } from "@/static-data/flightDetailData";

const amenitySet: FlightAmenity[] = [
  { icon: "plane", label: "In-flight entertainment" },
  { icon: "wifi", label: "Wi-Fi available" },
  { icon: "entertainment", label: "Priority boarding" },
  { icon: "meal", label: "Meal included" },
  { icon: "accessibility", label: "Wheelchair accessible" },
];

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatClock(time: string): string {
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? "pm" : "am";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${mStr} ${period}`;
}

function formatSegmentDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function pickBadge(rating: number, discountPercent: number): { badge: string; badgeColor: string } {
  if (rating >= 4.5) return { badge: "Premium Deal", badgeColor: "bg-purple-100" };
  if (discountPercent >= 15) return { badge: "Best Deal", badgeColor: "bg-blue-100" };
  if (rating >= 4.3) return { badge: "Great Value", badgeColor: "bg-green-100" };
  return { badge: "Very Good for travelers", badgeColor: "bg-yellow-100" };
}

interface SegmentRow {
  label: "Depart" | "Return";
  segment_date: string;
  duration_minutes: number;
  aircraft: string;
  depart_time: string;
  depart_airport: string;
  arrive_time: string;
  arrive_airport: string;
}

interface FlightListRow {
  id: string;
  base_price_cents: number;
  original_price_cents: number;
  rating: number;
  rating_label: string | null;
  review_count: number;
  from_airport: string;
  to_airport: string;
  airlines: { name: string; brand_color: string };
  flight_segments: Pick<SegmentRow, "label" | "duration_minutes" | "depart_time" | "arrive_time">[];
}

function mapFlightDeal(row: FlightListRow): FlightDeal {
  const depart = row.flight_segments.find((s) => s.label === "Depart");
  const ret = row.flight_segments.find((s) => s.label === "Return");
  const price = Math.round(row.base_price_cents / 100);
  const originalPrice = Math.round(row.original_price_cents / 100);
  const discountPercent = originalPrice > 0 ? ((originalPrice - price) / originalPrice) * 100 : 0;
  const { badge, badgeColor } = pickBadge(row.rating, discountPercent);

  return {
    id: row.id,
    airline: row.airlines.name,
    brandColor: row.airlines.brand_color,
    route: `${row.from_airport} - ${row.to_airport}`,
    badge,
    badgeColor,
    departTime: depart ? formatClock(depart.depart_time) : "",
    arrivalTime: depart ? formatClock(depart.arrive_time) : "",
    returnDepartTime: ret ? formatClock(ret.depart_time) : "",
    returnArrivalTime: ret ? formatClock(ret.arrive_time) : "",
    stops: "non stop",
    duration: depart ? formatDuration(depart.duration_minutes) : "",
    price,
    originalPrice,
    rating: Number(row.rating),
    ratingLabel: row.rating_label ?? "",
    reviews: row.review_count,
  };
}

const FLIGHT_LIST_SELECT = `
  id, base_price_cents, original_price_cents, rating, rating_label, review_count,
  from_airport, to_airport,
  airlines ( name, brand_color ),
  flight_segments ( label, duration_minutes, depart_time, arrive_time )
`;

export async function getFlightDeals(): Promise<FlightDeal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("flights").select(FLIGHT_LIST_SELECT);
  if (error) throw error;
  return ((data as unknown as FlightListRow[]) ?? []).map(mapFlightDeal);
}

export interface AirportOption {
  code: string;
  city: string;
  country: string;
}

export async function getAirports(): Promise<AirportOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("airports")
    .select("code, city, country")
    .order("city");
  if (error) throw error;
  return data ?? [];
}

interface FlightDetailRow {
  id: string;
  aircraft: string;
  base_price_cents: number;
  original_price_cents: number;
  rating: number;
  rating_label: string | null;
  review_count: number;
  hero_image_url: string | null;
  from_airport: string;
  to_airport: string;
  airlines: { name: string; brand_color: string };
  flight_segments: SegmentRow[];
  flight_gallery: { image_url: string; sort_order: number }[];
  flight_policies: { body: string; sort_order: number }[];
}

const FLIGHT_DETAIL_SELECT = `
  id, aircraft, base_price_cents, original_price_cents, rating, rating_label, review_count, hero_image_url,
  from_airport, to_airport,
  airlines ( name, brand_color ),
  flight_segments ( label, segment_date, duration_minutes, aircraft, depart_time, depart_airport, arrive_time, arrive_airport ),
  flight_gallery ( image_url, sort_order ),
  flight_policies ( body, sort_order )
`;

async function getAirportCityMap(supabase: Awaited<ReturnType<typeof createClient>>): Promise<Map<string, string>> {
  const { data, error } = await supabase.from("airports").select("code, city");
  if (error) throw error;
  return new Map((data ?? []).map((a) => [a.code, a.city]));
}

export async function getFlightDetail(id: string): Promise<FlightDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("flights")
    .select(FLIGHT_DETAIL_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const flight = data as unknown as FlightDetailRow;
  const airportCity = await getAirportCityMap(supabase);

  const price = Math.round(flight.base_price_cents / 100);
  const baseFare = price * 3;
  const discount = Math.round(baseFare * 0.1);
  const taxes = Math.round(baseFare * 0.08);
  const serviceFee = 25;
  const total = baseFare - discount + taxes + serviceFee;

  const gallery = [...flight.flight_gallery]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((g) => g.image_url);
  const policies = [...flight.flight_policies]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((p) => p.body);

  const segments = [...flight.flight_segments]
    .sort((a, b) => (a.label === "Depart" ? -1 : 1))
    .map((s) => ({
      label: s.label,
      date: formatSegmentDate(s.segment_date),
      durationText: formatDuration(s.duration_minutes),
      aircraft: s.aircraft,
      departTime: formatClock(s.depart_time),
      departAirport: `${airportCity.get(s.depart_airport) ?? s.depart_airport} (${s.depart_airport})`,
      arriveTime: formatClock(s.arrive_time),
      arriveAirport: `${airportCity.get(s.arrive_airport) ?? s.arrive_airport} (${s.arrive_airport})`,
      amenities: amenitySet,
    }));

  return {
    id: flight.id,
    airline: flight.airlines.name,
    brandColor: flight.airlines.brand_color,
    aircraft: flight.aircraft,
    title: `${flight.airlines.name} ${flight.aircraft}`,
    fromCity: airportCity.get(flight.from_airport) ?? flight.from_airport,
    fromCode: flight.from_airport,
    toCity: airportCity.get(flight.to_airport) ?? flight.to_airport,
    toCode: flight.to_airport,
    price: total,
    originalPrice: Math.round(total * 1.15),
    rating: Number(flight.rating),
    ratingLabel: flight.rating_label ?? "",
    reviews: flight.review_count,
    heroImage: flight.hero_image_url ?? "/hero-Image.jpg",
    gallery,
    policies,
    segments,
    priceBreakdown: { baseFare, discount, taxes, serviceFee, total },
  };
}
