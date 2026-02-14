export interface FlightDeal {
  id: string;
  airline: string;
  logo: string;
  destination: string;
  badge: string;
  badgeColor: string;
  departTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  originalPrice: number;
  saved?: boolean;
}

export const mockDeals = [
  {
    id: "1",
    airline: "Emirates",
    logo: "🇦🇪",
    destination: "Hug × 18 Hug",
    badge: "Bad Hug × 18 Hug",
    badgeColor: "bg-blue-100",
    departTime: "12:00 pm",
    arrivalTime: "03:28 pm",
    duration: "non stop",
    stops: "2h 28m",
    price: 104,
    originalPrice: 104,
  },
  {
    id: "2",
    airline: "Flydubai",
    logo: "🇦🇪",
    destination: "Dubai Trip",
    badge: "Very Good for travelers",
    badgeColor: "bg-yellow-100",
    departTime: "12:00 pm",
    arrivalTime: "03:28 pm",
    duration: "non stop",
    stops: "2h 28m",
    price: 104,
    originalPrice: 104,
  },
  {
    id: "3",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    destination: "Qatar Journey",
    badge: "Very Good for travelers",
    badgeColor: "bg-yellow-100",
    departTime: "12:00 pm",
    arrivalTime: "03:28 pm",
    duration: "non stop",
    stops: "2h 28m",
    price: 104,
    originalPrice: 104,
  },
  {
    id: "4",
    airline: "Etihad",
    logo: "🇦🇪",
    destination: "Abu Dhabi",
    badge: "Great Value",
    badgeColor: "bg-green-100",
    departTime: "12:00 pm",
    arrivalTime: "03:28 pm",
    duration: "non stop",
    stops: "2h 28m",
    price: 104,
    originalPrice: 104,
  },
  {
    id: "5",
    airline: "Emirates",
    logo: "🇦🇪",
    destination: "Dubai Express",
    badge: "Premium Deal",
    badgeColor: "bg-purple-100",
    departTime: "14:00 pm",
    arrivalTime: "05:30 pm",
    duration: "1 stop",
    stops: "3h 30m",
    price: 85,
    originalPrice: 120,
  },
];
