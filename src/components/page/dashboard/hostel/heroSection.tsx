import { HeroSection } from "@/components/UI/dashboard/HeroSectionUI";
import { HeroHostelForm } from "./HeroHostelForm";

export function HeroSectionHostel() {
  return (
    <HeroSection
      image="https://res.cloudinary.com/duyhha3mz/image/upload/hero-Image-2_tho58e.jpg"
      title="Make your travel whishlist, we’ll do the rest"
      label="Special offers to suit your plan"
    >
      <HeroHostelForm />
    </HeroSection>
  );
}
