import { mockDeals } from "./flightData";

export interface FlightAmenity {
  icon: "wifi" | "plane" | "meal" | "entertainment" | "accessibility";
  label: string;
}

export interface FlightSegment {
  label: string;
  date: string;
  durationText: string;
  aircraft: string;
  departTime: string;
  departAirport: string;
  arriveTime: string;
  arriveAirport: string;
  amenities: FlightAmenity[];
}

export interface PriceBreakdown {
  baseFare: number;
  discount: number;
  taxes: number;
  serviceFee: number;
  total: number;
}

export interface FlightDetail {
  id: string;
  airline: string;
  brandColor: string;
  aircraft: string;
  title: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingLabel: string;
  reviews: number;
  heroImage: string;
  gallery: string[];
  policies: string[];
  segments: FlightSegment[];
  priceBreakdown: PriceBreakdown;
}

const amenitySet: FlightAmenity[] = [
  { icon: "plane", label: "In-flight entertainment" },
  { icon: "wifi", label: "Wi-Fi available" },
  { icon: "entertainment", label: "Priority boarding" },
  { icon: "meal", label: "Meal included" },
  { icon: "accessibility", label: "Wheelchair accessible" },
];

const galleryImages = [
  "/trip-image-1.jpg",
  "/trip-image-2.jpg",
  "/trip-image-3.jpg",
  "/trip-image-4.jpg",
  "/trip-image-5.jpg",
  "/trip-image-6.jpg",
  "/trip-image-7.jpg",
  "/trip-image-8.jpg",
  "/trip-image-9.jpg",
];

function buildDetail(dealIndex: number): FlightDetail {
  const deal = mockDeals[dealIndex];
  const [fromCode, toCode] = deal.route.split(" - ");
  const baseFare = deal.price * 3;
  const discount = Math.round(baseFare * 0.1);
  const taxes = Math.round(baseFare * 0.08);
  const serviceFee = 25;
  const total = baseFare - discount + taxes + serviceFee;

  return {
    id: deal.id,
    airline: deal.airline,
    brandColor: deal.brandColor,
    aircraft: "A380 Airbus",
    title: `${deal.airline} A380 Airbus`,
    fromCity: "Newark",
    fromCode,
    toCity: "Nashville",
    toCode,
    price: total,
    originalPrice: Math.round(total * 1.15),
    rating: deal.rating,
    ratingLabel: deal.ratingLabel,
    reviews: deal.reviews,
    heroImage: "/hero-Image.jpg",
    gallery: galleryImages,
    policies: [
      "Pre-flight cleaning, installation of cabin HEPA filters.",
      "Pre-flight health screening questions.",
    ],
    segments: [
      {
        label: "Depart",
        date: "Wed, Dec 1",
        durationText: deal.duration,
        aircraft: "Airbus A320",
        departTime: deal.departTime,
        departAirport: `Newark (${fromCode})`,
        arriveTime: deal.arrivalTime,
        arriveAirport: `Nashville (${toCode})`,
        amenities: amenitySet,
      },
      {
        label: "Return",
        date: "Wed, Dec 8",
        durationText: deal.duration,
        aircraft: "Airbus A320",
        departTime: deal.returnDepartTime,
        departAirport: `Nashville (${toCode})`,
        arriveTime: deal.returnArrivalTime,
        arriveAirport: `Newark (${fromCode})`,
        amenities: amenitySet,
      },
    ],
    priceBreakdown: { baseFare, discount, taxes, serviceFee, total },
  };
}

export const flightDetails: FlightDetail[] = mockDeals.map((_, i) =>
  buildDetail(i)
);

export function getFlightDetail(id: string): FlightDetail | undefined {
  return flightDetails.find((f) => f.id === id);
}

export const flightClasses = ["Economy", "Business", "First Class"] as const;
export type FlightClass = (typeof flightClasses)[number];

const classMultipliers: Record<FlightClass, number> = {
  Economy: 1,
  Business: 1.4,
  "First Class": 1.8,
};

export function scaleFlightForClass(
  flight: FlightDetail,
  flightClass: FlightClass
): FlightDetail {
  const multiplier = classMultipliers[flightClass];
  const { baseFare, discount, taxes, serviceFee } = flight.priceBreakdown;
  const scaledBaseFare = Math.round(baseFare * multiplier);
  const scaledDiscount = Math.round(discount * multiplier);
  const scaledTaxes = Math.round(taxes * multiplier);
  const total = scaledBaseFare - scaledDiscount + scaledTaxes + serviceFee;

  return {
    ...flight,
    price: total,
    originalPrice: Math.round(total * 1.15),
    priceBreakdown: {
      baseFare: scaledBaseFare,
      discount: scaledDiscount,
      taxes: scaledTaxes,
      serviceFee,
      total,
    },
  };
}
