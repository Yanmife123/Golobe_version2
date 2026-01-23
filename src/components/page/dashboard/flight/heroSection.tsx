import { HeroSection } from "@/components/UI/dashboard/HeroSectionUI";
import { HeroFlightForm } from "@/components/page/dashboard/flight/HeroFlightForm";
export function HeroSectionFlight() {
  return (
    <HeroSection
      image="https://res.cloudinary.com/duyhha3mz/image/upload/v1769093603/hero-image-1_ibspyt.jpg"
      title="Make your travel whishlist, we’ll do the rest"
      label="Special offers to suit your plan"
    >
      <HeroFlightForm />
    </HeroSection>
  );
}
