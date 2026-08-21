import { HeroSection } from "@/components/UI/dashboard/HeroSectionUI";
import { HeroFlightForm } from "@/components/page/dashboard/flight/HeroFlightForm";
import { AirportOption } from "@/lib/supabase/flights";

export function HeroSectionFlight({ airports }: { airports: AirportOption[] }) {
  return (
    <HeroSection
      image="https://res.cloudinary.com/duyhha3mz/image/upload/v1769093603/hero-image-1_ibspyt.jpg"
      title="Make your travel whishlist, we’ll do the rest"
      label="Special offers to suit your plan"
    >
      <HeroFlightForm airports={airports} />
    </HeroSection>
  );
}
