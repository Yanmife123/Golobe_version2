import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
import { TravelHighlight } from "@/components/page/dashboard/flight/travelhighlight";
import { HeroSectionHostel } from "@/components/page/dashboard/hostel/heroSection";
import { HostelRecentSearch } from "@/components/page/dashboard/hostel/hostelRecentSearch";
export default function HostelDashboardPage() {
  return (
    <div>
      <HeroSectionHostel />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-6xl w-full">
          <HostelRecentSearch />
          <PopularDestination />
          <TravelHighlight />
        </div>
      </div>
    </div>
  );
}
