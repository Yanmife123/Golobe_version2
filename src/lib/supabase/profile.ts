import { cache } from "react";
import { createClient } from "./server";

export interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
}

export const getProfile = cache(async function getProfile(
  userId: string
): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, name, phone, address, date_of_birth, profile_image_url, cover_image_url"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
});
