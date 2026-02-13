import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
import { TravelHighlight } from "@/components/page/dashboard/flight/travelhighlight";
import { HeroSectionHostel } from "@/components/page/dashboard/hostel/heroSection";
export default function HostelDashboardPage() {
  return (
    <div>
      <HeroSectionHostel />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-7xl w-full">
          <PopularDestination />
          <TravelHighlight />
        </div>
      </div>
    </div>
  );
}
