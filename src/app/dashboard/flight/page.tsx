import { FeaturedDestinations } from "@/components/page/dashboard/flight/featured-destinations";
import { HeroSectionFlight } from "@/components/page/dashboard/flight/heroSection";
export default function DashboardPage() {
  return (
    <div>
      <HeroSectionFlight />
      <FeaturedDestinations />
      <div className="paddingX"></div>
    </div>
  );
}
