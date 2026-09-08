import ProfileWrapper from "@/components/page/dashboard/profile/ProfileWrapper";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user ? await getProfile(user.id) : null;

  const name =
    profile?.name ||
    (user?.user_metadata?.name as string | undefined) ||
    "Guest";
  const email = user?.email ?? "";

  return (
    <div className="p-5 md:px-12">
      <ProfileWrapper
        name={name}
        email={email}
        profileImageUrl={profile?.profile_image_url ?? null}
        coverImageUrl={profile?.cover_image_url ?? null}
      >
        <div>{children}</div>
      </ProfileWrapper>
    </div>
  );
}
