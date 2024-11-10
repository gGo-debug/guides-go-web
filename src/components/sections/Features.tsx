"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Features() {
  const features = [
    {
      title: "Level Up Your Explorations",
      description: "Transform every trip into an achievement. Earn points, unlock badges, and climb leaderboards while discovering extraordinary experiences.",
      skeleton: <ExplorationFeature />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-forest-green/20",
    },
    {
      title: "Social Adventure",
      description: "Join groups, share experiences, and connect with fellow adventurers who share your interests.",
      skeleton: <SocialFeature />,
      className: "border-b col-span-1 lg:col-span-2 border-forest-green/20",
    },
    {
      title: "Trust & Safety",
      description: "Every guide is AI-verified and community-rated for your peace of mind.",
      skeleton: <TrustFeature />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-forest-green/20",
    },
    {
      title: "Interactive Journey Tracking",
      description: "Watch your adventures come to life on interactive maps and share your achievements with the community.",
      skeleton: <TrackingFeature />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section className="w-full relative py-24 rounded-3xl overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/kayak.jpg')",
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-20 container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl mx-auto text-center text-white">
          Why Adventurers{" "}
          <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-transparent bg-clip-text">
            Choose Guides GO
          </span>
        </h2>

        <p className="text-base md:text-lg lg:text-xl mt-6 max-w-2xl mx-auto text-white/80 text-center font-medium">
          Join thousands of explorers discovering extraordinary experiences with verified local guides.
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 rounded-xl overflow-hidden">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.title} 
                className={cn(
                  feature.className,
                  "border-forest-green/10" // lighter border color
                )}
              >
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Components
const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(
      `p-4 sm:p-8 relative overflow-hidden group`,
      `bg-white/95 hover:bg-white transition-colors`,
      className
    )}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h3 className="text-xl md:text-2xl font-semibold text-mountain-gray mb-2">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-mountain-gray/80 mb-6">
      {children}
    </p>
  );
};

// Feature Components
const ExplorationFeature = () => {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg">
      <Image
        src="/adventure/adventure-fishing.jpg"
        alt="Adventure exploration"
        fill
        className="object-cover transition-transform group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/40 to-transparent" />
    </div>
  );
};

const SocialFeature = () => {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg">
      <Image
        src="/adventure/adventure2.jpg"
        alt="Social adventures"
        fill
        className="object-cover transition-transform group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/40 to-transparent" />
    </div>
  );
};

const TrustFeature = () => {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg">
      <Image
        src="/adventure/adventure3.jpg"
        alt="Trust and safety"
        fill
        className="object-cover transition-transform group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/40 to-transparent" />
    </div>
  );
};

const TrackingFeature = () => {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg">
      <Image
        src="/adventure/adventure1.jpg"
        alt="Journey tracking"
        fill
        className="object-cover transition-transform group-hover:scale-105 duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/40 to-transparent" />
    </div>
  );
};