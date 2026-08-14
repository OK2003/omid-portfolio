import { HeroSection } from "@/components/sections/HeroSection";
import { GlowingTagline } from "@/components/sections/GlowingTagline";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GlowingTagline />
      <FeaturedProjectsSection />
    </>
  );
}
