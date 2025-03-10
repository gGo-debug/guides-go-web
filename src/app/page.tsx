import { Hero } from "@/components/sections/Hero";

import SocialProof from "@/components/sections/SocialProof";
import FeaturesBreakdown from "@/components/sections/FeaturesBreakdown";
import CommunityImpact from "@/components/sections/CommunityImpact";
import SafetyTrust from "@/components/sections/SafetyTrust";
import AppShowcase from "@/components/sections/AppShowcase";
import DownloadSection from "@/components/sections/DownloadSection";
import GuideRecruitment from "@/components/sections/GuideRecruitment";
import FinalCTA from "@/components/sections/FinalCTA";
import { Features } from "@/components/sections/Features";
import AdventureListings from "./components/sections/AdventureListings";
import { StorySection } from "@/components/sections/OurStory";
import { InfiniteExperiencesSection } from "@/components/sections/CanadianInfinite";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <AdventureListings />
      <InfiniteExperiencesSection />
      <StorySection />
      <Features />
      {/* <SocialProof /> */}
      {/* <FeaturesBreakdown /> */}
      {/* <CommunityImpact /> */}
      <SafetyTrust />
      {/* <AppShowcase /> */}

      {/* <DownloadSection /> */}
      <GuideRecruitment />
      <FinalCTA />
    </main>
  );
}
