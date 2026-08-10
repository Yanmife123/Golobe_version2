export interface FlightDeal {
  id: string;
  airline: string;
  brandColor: string;
  route: string;
  badge: string;
  badgeColor: string;
  departTime: string;
  arrivalTime: string;
  returnDepartTime: string;
  returnArrivalTime: string;
  stops: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingLabel: string;
  reviews: number;
  saved?: boolean;
}

export const mockDeals: FlightDeal[] = [
  {
    id: "1",
    airline: "Emirates",
    brandColor: "#D71921",
    route: "EWR - BNA",
    badge: "Best Deal",
    badgeColor: "bg-blue-100",
    departTime: "12:00 pm",
    arrivalTime: "01:28 pm",
    returnDepartTime: "12:00 pm",
    returnArrivalTime: "01:28 pm",
    stops: "non stop",
    duration: "2h 28m",
    price: 104,
    originalPrice: 130,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviews: 54,
  },
  {
    id: "2",
    airline: "Flydubai",
    brandColor: "#0072CE",
    route: "EWR - BNA",
    badge: "Very Good for travelers",
    badgeColor: "bg-yellow-100",
    departTime: "12:00 pm",
    arrivalTime: "01:28 pm",
    returnDepartTime: "12:00 pm",
    returnArrivalTime: "01:28 pm",
    stops: "non stop",
    duration: "2h 28m",
    price: 104,
    originalPrice: 104,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviews: 54,
  },
  {
    id: "3",
    airline: "Qatar Airways",
    brandColor: "#5C0632",
    route: "EWR - BNA",
    badge: "Very Good for travelers",
    badgeColor: "bg-yellow-100",
    departTime: "12:00 pm",
    arrivalTime: "01:28 pm",
    returnDepartTime: "12:00 pm",
    returnArrivalTime: "01:28 pm",
    stops: "non stop",
    duration: "2h 28m",
    price: 104,
    originalPrice: 104,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviews: 54,
  },
  {
    id: "4",
    airline: "Etihad",
    brandColor: "#BE8B3E",
    route: "EWR - BNA",
    badge: "Great Value",
    badgeColor: "bg-green-100",
    departTime: "12:00 pm",
    arrivalTime: "01:28 pm",
    returnDepartTime: "12:00 pm",
    returnArrivalTime: "01:28 pm",
    stops: "non stop",
    duration: "2h 28m",
    price: 104,
    originalPrice: 104,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviews: 54,
  },
  {
    id: "5",
    airline: "Emirates",
    brandColor: "#D71921",
    route: "EWR - BNA",
    badge: "Premium Deal",
    badgeColor: "bg-purple-100",
    departTime: "02:00 pm",
    arrivalTime: "05:30 pm",
    returnDepartTime: "02:00 pm",
    returnArrivalTime: "05:30 pm",
    stops: "1 stop",
    duration: "3h 30m",
    price: 85,
    originalPrice: 120,
    rating: 4.6,
    ratingLabel: "Excellent",
    reviews: 128,
  },
];
