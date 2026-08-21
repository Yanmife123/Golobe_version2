import { HistorySection } from "@/components/page/dashboard/profile/history/historySection";
import { PageTransition } from "@/components/utility/pageTransition";

export default function ProfileHistoryPage() {
  return (
    <PageTransition>
      <HistorySection />
    </PageTransition>
  );
}
