export type HotelCategory = "Hotels" | "Motels" | "Resorts";

export interface Room {
  id: string;
  name: string;
  image: string;
  pricePerNight: number;
}

export interface HotelReview {
  id: string;
  name: string;
  avatar: string;
  score: number;
  scoreLabel: string;
  text: string;
}

export interface Hotel {
  id: string;
  name: string;
  category: HotelCategory;
  starRating: number;
  address: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  images: string[];
  overview: string;
  highlights: string[];
  freebies: string[];
  amenities: string[];
  rooms: Room[];
  reviews: HotelReview[];
}

const reviewText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const reviewAvatars = [
  "/reviews-img1.jpg",
  "/reviews-img2.jpg",
  "/reviews-img3.jpg",
  "/default-pic.jpg",
];

const reviewNames = [
  "Omar Siphron",
  "Cristofer Ekstrom Bothman",
  "Kaiya Lubin",
  "Erin Septimus",
  "Terry George",
  "Alina Novak",
  "Marcus Bell",
  "Priya Anand",
];

function makeReviews(count: number): HotelReview[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `r${i + 1}`,
    name: reviewNames[i % reviewNames.length],
    avatar: reviewAvatars[i % reviewAvatars.length],
    score: 5.0,
    scoreLabel: "Amazing",
    text: reviewText,
  }));
}

const galleryPool = [
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

const amenitiesFull = [
  "Outdoor pool",
  "Indoor pool",
  "Spa and wellness center",
  "Restaurant",
  "Room service",
  "Fitness center",
  "Bar/Lounge",
  "Free Wi-Fi",
  "Tea/coffee machine",
  "24hr front desk",
  "Air-conditioned",
  "Laundry service",
  "Non-smoking rooms",
  "Airport shuttle",
  "Business center",
  "Concierge",
];

const highlightSets = [
  ["Near park", "Near nightlife", "Near theater", "Clean Hotel"],
  ["Near beach", "Great breakfast", "Family friendly", "Clean Hotel"],
  ["Near airport", "Quiet area", "Great views", "Clean Hotel"],
];

function makeRooms(basePrice: number, image: string): Room[] {
  return [
    {
      id: "room-1",
      name: "Superior room - 1 double bed or 2 twin beds",
      image,
      pricePerNight: basePrice,
    },
    {
      id: "room-2",
      name: "Superior room - City view - 1 double bed or 2 twin beds",
      image,
      pricePerNight: basePrice + 40,
    },
    {
      id: "room-3",
      name: "Superior room - City view - 1 double bed or 2 twin beds",
      image,
      pricePerNight: basePrice + 80,
    },
    {
      id: "room-4",
      name: "Superior room - City view - 1 double bed or 2 twin beds",
      image,
      pricePerNight: basePrice + 110,
    },
  ];
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "CVK Park Bosphorus Hotel Istanbul",
    category: "Hotels",
    starRating: 5,
    address: "Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437",
    city: "Istanbul",
    country: "Turkey",
    pricePerNight: 240,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviewCount: 371,
    images: galleryPool.slice(0, 5),
    overview:
      "Located in Taksim, the heart of Istanbul, CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as a Foreign Affairs Palace 120 years ago. With 452 luxurious rooms and suites, an 8500 m2 spa and fitness area, 18 meeting rooms, and Istanbul's largest terrace with a Bosphorus view, it's destined to be the popular attraction point of the city.",
    highlights: highlightSets[0],
    freebies: ["Free breakfast", "Free parking", "Free internet"],
    amenities: amenitiesFull.slice(0, 10),
    rooms: makeRooms(240, galleryPool[1]),
    reviews: makeReviews(12),
  },
  {
    id: "2",
    name: "Eresin Hotels Sultanahmet - Boutique Class",
    category: "Hotels",
    starRating: 5,
    address: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
    city: "Istanbul",
    country: "Turkey",
    pricePerNight: 104,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviewCount: 54,
    images: galleryPool.slice(1, 6),
    overview:
      "A boutique-class retreat in the historic Sultanahmet district, steps away from the Blue Mosque and Hagia Sophia. Rooms blend Ottoman-inspired decor with modern comfort, and the rooftop terrace offers panoramic views of the old city skyline.",
    highlights: highlightSets[1],
    freebies: ["Free breakfast", "Free internet", "Free cancellation"],
    amenities: amenitiesFull.slice(2, 12),
    rooms: makeRooms(104, galleryPool[2]),
    reviews: makeReviews(9),
  },
  {
    id: "3",
    name: "Golobe Grand Resort & Spa",
    category: "Resorts",
    starRating: 5,
    address: "Belek Turizm Merkezi, Antalya 07506",
    city: "Antalya",
    country: "Turkey",
    pricePerNight: 320,
    rating: 4.6,
    ratingLabel: "Excellent",
    reviewCount: 512,
    images: galleryPool.slice(2, 7),
    overview:
      "An all-inclusive beachfront resort along the Antalya coast, featuring three outdoor pools, a private beach, and a full-service spa. Perfect for family getaways or a relaxing escape by the Mediterranean.",
    highlights: highlightSets[2],
    freebies: [
      "Free breakfast",
      "Free parking",
      "Free airport shuttle",
      "Free cancellation",
    ],
    amenities: amenitiesFull.slice(0, 14),
    rooms: makeRooms(320, galleryPool[3]),
    reviews: makeReviews(15),
  },
  {
    id: "4",
    name: "Golobe Roadside Motel",
    category: "Motels",
    starRating: 3,
    address: "Route 66, Nashville, TN 37201",
    city: "Nashville",
    country: "United States",
    pricePerNight: 68,
    rating: 3.9,
    ratingLabel: "Good",
    reviewCount: 87,
    images: galleryPool.slice(3, 8),
    overview:
      "A budget-friendly, no-frills stopover with clean rooms, free parking right outside your door, and easy highway access. Ideal for a quick overnight stay while road-tripping through Tennessee.",
    highlights: ["Near highway", "Free parking", "Pet friendly", "Clean Hotel"],
    freebies: ["Free parking", "Free internet"],
    amenities: amenitiesFull.slice(6, 13),
    rooms: makeRooms(68, galleryPool[4]),
    reviews: makeReviews(6),
  },
  {
    id: "5",
    name: "Eresin Hotels Sultanahmet - Boutique Class",
    category: "Hotels",
    starRating: 5,
    address: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
    city: "Istanbul",
    country: "Turkey",
    pricePerNight: 104,
    rating: 4.2,
    ratingLabel: "Very Good",
    reviewCount: 54,
    images: galleryPool.slice(4, 9),
    overview:
      "A boutique-class retreat in the historic Sultanahmet district, steps away from the Blue Mosque and Hagia Sophia. Rooms blend Ottoman-inspired decor with modern comfort, and the rooftop terrace offers panoramic views of the old city skyline.",
    highlights: highlightSets[1],
    freebies: ["Free breakfast", "Free internet", "Free cancellation"],
    amenities: amenitiesFull.slice(2, 12),
    rooms: makeRooms(104, galleryPool[5]),
    reviews: makeReviews(9),
  },
  {
    id: "6",
    name: "Blue Lagoon Beach Resort",
    category: "Resorts",
    starRating: 4,
    address: "Coral Bay Road, Nashville, TN 37201",
    city: "Nashville",
    country: "United States",
    pricePerNight: 210,
    rating: 4.4,
    ratingLabel: "Very Good",
    reviewCount: 203,
    images: galleryPool.slice(5, 9).concat(galleryPool[0]),
    overview:
      "A laid-back lakeside resort with private cabanas, a lazy river pool, and nightly live music by the water. Every room opens onto a view of the lagoon.",
    highlights: highlightSets[2],
    freebies: ["Free breakfast", "Free parking", "Free cancellation"],
    amenities: amenitiesFull.slice(1, 11),
    rooms: makeRooms(210, galleryPool[6]),
    reviews: makeReviews(11),
  },
];

export function getHotel(id: string): Hotel | undefined {
  return hotels.find((h) => h.id === id);
}
