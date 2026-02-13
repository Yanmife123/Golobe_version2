import { FeaturedDestinations } from "@/components/page/dashboard/flight/featured-destinations";
import { HeroSectionFlight } from "@/components/page/dashboard/flight/heroSection";
import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
import { TravelHighlight } from "@/components/page/dashboard/flight/travelhighlight";
export default function DashboardPage() {
  return (
    <div>
      <HeroSectionFlight />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-7xl w-full">
          <FeaturedDestinations />
          <PopularDestination />
          <TravelHighlight />
        </div>
      </div>
    </div>
  );
}
