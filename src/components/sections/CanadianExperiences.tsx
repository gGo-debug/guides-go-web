"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMeta,
} from "@/components/ui/card";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";

interface Feature {
  title: string;
  location: string;
  description: string;
  image: string;
  season: string;
}

const features: Feature[] = [
  {
    title: "Polar Bear Viewing",
    location: "Churchill, Manitoba",
    description: "Experience the majestic polar bears in their natural habitat",
    image: "/polar.jpeg",
    season: "Oct-Nov",
  },
  {
    title: "Northern Lights",
    location: "Yukon Territory",
    description: "Witness the mesmerizing aurora borealis dance across the sky",
    image: "/northern.jpeg",
    season: "Sep-Apr",
  },
  {
    title: "Ice Climbing",
    location: "Banff, Alberta",
    description: "Scale frozen waterfalls in the heart of the Rockies",
    image: "/iceclimb.jpeg",
    season: "Dec-Mar",
  },
  {
    title: "Orca Watching",
    location: "Victoria, BC",
    description: "Encounter magnificent orcas in the Salish Sea",
    image: "/orca.jpeg",
    season: "May-Oct",
  },
];

export function ExperiencesSection() {
  return (
    <section className="w-full relative py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background image with darker overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/kayak.jpg')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="space-y-6 mb-24  flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] max-w-4xl text-white text-center">
            Discover the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-transparent bg-clip-text">
                Great North
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0"></span>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed text-center">
            Embark on extraordinary adventures unique to Canada's stunning
            wilderness
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative bg-black/40 border-0 overflow-hidden rounded-2xl 
                transition-all duration-500 hover:-translate-y-2 cursor-pointer h-[450px]
                hover:bg-black/60 backdrop-blur-sm
                shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]
                hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 
                opacity-80 group-hover:opacity-90 transition-opacity duration-500"
              ></div>

              {/* Main Image */}
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-all duration-500 
                  group-hover:scale-105 
                  group-hover:brightness-75
                  filter brightness-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Content Container */}
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                {/* Title at top */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center">
                  <CardTitle className="text-2xl font-bold text-white/90 group-hover:text-white mb-2 flex items-center justify-center gap-2">
                    {feature.title}
                    <MoveUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardTitle>
                  <div
                    className="w-12 h-1 bg-orange-500 rounded-full transform origin-center scale-x-0 
                    group-hover:scale-x-100 transition-transform duration-500 mx-auto"
                  ></div>
                  <CardMeta
                    className="text-white/80 group-hover:text-white/90 text-base leading-relaxed 
                    opacity-0 group-hover:opacity-100 transform translate-y-4 
                    group-hover:translate-y-0 transition-all duration-500 text-center"
                  >
                    <p>{feature.location}</p>
                    <p>{feature.season}</p>
                  </CardMeta>
                </div>

                {/* Description at bottom */}
                <div className="space-y-6">
                  <CardDescription
                    className="text-white/80 group-hover:text-white/90 text-base leading-relaxed 
                    opacity-0 group-hover:opacity-100 transform translate-y-4 
                    group-hover:translate-y-0 transition-all duration-500 text-center"
                  >
                    {feature.description}
                  </CardDescription>
                </div>
              </div>

              {/* Additional dark overlay on hover */}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                transition-colors duration-500"
              ></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
