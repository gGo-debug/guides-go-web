import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for performance optimization
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => <HeroSkeleton />
});
const Features = dynamic(() => import("@/components/sections/Features"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const FeaturesBreakdown = dynamic(() => import("@/components/sections/FeaturesBreakdown"));
const CommunityImpact = dynamic(() => import("@/components/sections/CommunityImpact"));
const SafetyTrust = dynamic(() => import("@/components/sections/SafetyTrust"));
const AppShowcase = dynamic(() => import("@/components/sections/AppShowcase"));
const DownloadSection = dynamic(() => import("@/components/sections/DownloadSection"));
const GuideRecruitment = dynamic(() => import("@/components/sections/GuideRecruitment"));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));

// Skeleton loader for Hero section (implement this separately)
function HeroSkeleton() {
  return <div className="animate-pulse h-[80vh] bg-gray-100" />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero section with Suspense for immediate loading */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Features section */}
      <Features />

      {/* Social Proof */}
      <SocialProof />

      {/* Features Breakdown */}
      <FeaturesBreakdown />

      {/* Community Impact */}
      <CommunityImpact />

      {/* Safety and Trust */}
      <SafetyTrust />

      {/* App Showcase */}
      <AppShowcase />

      {/* Download Section */}
      <DownloadSection />

      {/* Guide Recruitment */}
      <GuideRecruitment />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}
