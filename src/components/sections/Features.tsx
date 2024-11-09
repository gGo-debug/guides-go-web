"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-mountain-gray">
          Why Adventurers Choose Guides GO
        </h2>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-mountain-gray/80 text-center">
          Join thousands of explorers discovering extraordinary experiences with verified local guides.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 rounded-xl border border-forest-green/20">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Components
const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden group hover:bg-forest-green/5 transition-colors`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h3 className="text-xl md:text-2xl font-semibold text-forest-green mb-2">
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