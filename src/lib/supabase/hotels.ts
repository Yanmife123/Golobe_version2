import { createClient } from "./server";
import type { Hotel, HotelCategory, HotelReview, Room } from "@/static-data/hotelData";

interface HotelRow {
  id: string;
  name: string;
  category: string;
  star_rating: number;
  address: string;
  city: string;
  country: string;
  price_per_night_cents: number;
  rating: number;
  rating_label: string | null;
  review_count: number;
  overview: string | null;
  hotel_images: { image_url: string; sort_order: number }[];
  hotel_highlights: { label: string; sort_order: number }[];
  hotel_rooms: { id: string; name: string; image_url: string | null; price_per_night_cents: number }[];
  hotel_reviews: {
    id: string;
    reviewer_name: string;
    avatar_url: string | null;
    score: number;
    score_label: string | null;
    body: string;
  }[];
  hotel_features: { features: { name: string; category: "amenity" | "freebie" } }[];
}

const HOTEL_SELECT = `
  id, name, category, star_rating, address, city, country, price_per_night_cents, rating, rating_label, review_count, overview,
  hotel_images ( image_url, sort_order ),
  hotel_highlights ( label, sort_order ),
  hotel_rooms ( id, name, image_url, price_per_night_cents ),
  hotel_reviews ( id, reviewer_name, avatar_url, score, score_label, body ),
  hotel_features ( features ( name, category ) )
`;

function mapHotel(row: HotelRow): Hotel {
  const images = [...row.hotel_images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => i.image_url);

  const highlights = [...row.hotel_highlights]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((h) => h.label);

  const rooms: Room[] = row.hotel_rooms.map((r) => ({
    id: r.id,
    name: r.name,
    image: r.image_url ?? images[0] ?? "/default-pic.jpg",
    pricePerNight: Math.round(r.price_per_night_cents / 100),
  }));

  const reviews: HotelReview[] = row.hotel_reviews.map((r) => ({
    id: r.id,
    name: r.reviewer_name,
    avatar: r.avatar_url ?? "/default-pic.jpg",
    score: Number(r.score),
    scoreLabel: r.score_label ?? "",
    text: r.body,
  }));

  const freebies = row.hotel_features
    .filter((f) => f.features.category === "freebie")
    .map((f) => f.features.name);
  const amenities = row.hotel_features
    .filter((f) => f.features.category === "amenity")
    .map((f) => f.features.name);

  return {
    id: row.id,
    name: row.name,
    category: row.category as HotelCategory,
    starRating: row.star_rating,
    address: row.address,
    city: row.city,
    country: row.country,
    pricePerNight: Math.round(row.price_per_night_cents / 100),
    rating: Number(row.rating),
    ratingLabel: row.rating_label ?? "",
    reviewCount: row.review_count,
    images,
    overview: row.overview ?? "",
    highlights,
    freebies,
    amenities,
    rooms,
    reviews,
  };
}

export async function getHotels(): Promise<Hotel[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("hotels").select(HOTEL_SELECT);
  if (error) throw error;
  return ((data as unknown as HotelRow[]) ?? []).map(mapHotel);
}

export async function getHotel(id: string): Promise<Hotel | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hotels")
    .select(HOTEL_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return mapHotel(data as unknown as HotelRow);
}
