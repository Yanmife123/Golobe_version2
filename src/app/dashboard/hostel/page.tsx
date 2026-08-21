import { PopularDestination } from "@/components/page/dashboard/flight/popularDestination";
import { TravelHighlight } from "@/components/page/dashboard/flight/travelhighlight";
import { HeroSectionHostel } from "@/components/page/dashboard/hostel/heroSection";
import { HostelRecentSearch } from "@/components/page/dashboard/hostel/hostelRecentSearch";
import { FeaturedHotels } from "@/components/page/dashboard/hostel/featuredHotels";
import { PageTransition } from "@/components/utility/pageTransition";
import { getHotels } from "@/lib/supabase/hotels";
import { getDestinationOptions } from "@/components/page/dashboard/hostel/hostelresults/hostelFilterUtils";
import { pickRandom } from "@/lib/utils";

export default async function HostelDashboardPage() {
  const hotels = await getHotels();
  const destinationOptions = getDestinationOptions(hotels);
  const featuredHotels = pickRandom(hotels, 4);

  return (
    <PageTransition>
      <HeroSectionHostel destinationOptions={destinationOptions} />
      <div className="paddingX flex__center flex-col">
        <div className="max-w-6xl w-full">
          <HostelRecentSearch />
          <FeaturedHotels hotels={featuredHotels} />
          <PopularDestination />
          <TravelHighlight />
        </div>
      </div>
    </PageTransition>
  );
}
