import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Petroleum engineering graduate and software developer focused on drilling engineering tools and AI systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
    </>
  );
}
