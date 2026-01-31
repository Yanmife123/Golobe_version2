import { FeaturedDestinations } from "@/components/page/dashboard/flight/featured-destinations";
import { HeroSectionFlight } from "@/components/page/dashboard/flight/heroSection";
import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
export default function DashboardPage() {
  return (
    <div>
      <HeroSectionFlight />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-7xl w-full">
          <FeaturedDestinations />
          <PopularDestination />
        </div>
      </div>
    </div>
  );
}
