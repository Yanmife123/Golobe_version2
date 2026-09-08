import { AccountSection } from "@/components/page/dashboard/profile/account/accountSection";
import { PageTransition } from "@/components/utility/pageTransition";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user ? await getProfile(user.id) : null;

  return (
    <PageTransition>
      <AccountSection
        initialName={
          profile?.name ||
          (user?.user_metadata?.name as string | undefined) ||
          ""
        }
        email={user?.email ?? ""}
        initialPhone={profile?.phone ?? ""}
        initialAddress={profile?.address ?? ""}
        initialDob={profile?.date_of_birth ?? ""}
      />
    </PageTransition>
  );
}
