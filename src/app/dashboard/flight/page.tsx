import { FeaturedDestinations } from "@/components/page/dashboard/flight/featured-destinations";
import { HeroSectionFlight } from "@/components/page/dashboard/flight/heroSection";
import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
import { TravelHighlight } from "@/components/page/dashboard/flight/travelhighlight";
import { FeaturedFlights } from "@/components/page/dashboard/flight/featuredFlights";
import { PageTransition } from "@/components/utility/pageTransition";
import { getAirports, getFlightDeals } from "@/lib/supabase/flights";
import { pickRandom } from "@/lib/utils";

export default async function DashboardPage() {
  const [deals, airports] = await Promise.all([getFlightDeals(), getAirports()]);
  const featuredDeals = pickRandom(deals, 4);

  return (
    <PageTransition>
      <HeroSectionFlight airports={airports} />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-7xl w-full">
          <FeaturedDestinations />
          <FeaturedFlights deals={featuredDeals} />
          <PopularDestination />
          <TravelHighlight />
        </div>
      </div>
    </PageTransition>
  );
}
