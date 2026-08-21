import { AccountSection } from "@/components/page/dashboard/profile/account/accountSection";
import { PageTransition } from "@/components/utility/pageTransition";

export default function ProfilePage() {
  return (
    <PageTransition>
      <AccountSection />
    </PageTransition>
  );
}
