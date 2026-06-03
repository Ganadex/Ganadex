import { Hero } from "@/components/home/Hero";
import { RegistroCarousel } from "@/components/home/RegistroCarousel";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedAnimals } from "@/components/home/FeaturedAnimals";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RegistroCarousel />
      <FeaturedCategories />
      <TrustSection />
      <FeaturedAnimals />
      <CTASection />
    </>
  );
}
