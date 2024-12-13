"use client";
import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardMeta,
} from "@/components/ui/card";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  {
    title: "Fishing",
    location: "Canada",
    description:
      "Cast your line in rivers, oceans, or try fly fishing, with options for deep-sea, ice fishing, and catch-and-release trips.",
    image: "/sturgo.jpeg",
    season: "Year round",
  },
  {
    title: "Snowmobile Adventures",
    location: "Whistler, BC",
    description: "Race through snowy trails in the coastal mountains",
    image: "/snowmobile.jpeg",
    season: "Dec-Mar",
  },
  {
    title: "Mountain Heli-Skiing",
    location: "Revelstoke, BC",
    description: "Access untouched powder in remote mountain terrain",
    image: "/heliski.jpeg",
    season: "Jan-Apr",
  },
  {
    title: "Luxury Glamping",
    location: "Clayoquot Sound, BC",
    description:
      "Experience wilderness in comfort with luxury tented accommodations",
    image: "/glamping.jpg",
    season: "May-Sep",
  },
  {
    title: "Mountain Biking",
    location: "Whistler Bike Park",
    description: "Ride world-class trails in North America's largest bike park",
    image: "/biking.jpeg",
    season: "May-Oct",
  },
  {
    title: "Horseback Adventures",
    location: "Banff, Alberta",
    description: "Trail ride through the majestic Canadian Rockies",
    image: "/horseback.jpeg",
    season: "Jun-Sep",
  },
  {
    title: "Hunting",
    location: "Canada",
    description:
      "From bird hunting to big Game with guided trips, safety courses, and tracking skills for all experience levels.",
    image: "/hunting.jpeg",
    season: "Year round",
  },
];

export function InfiniteExperiencesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (containerRef.current) {
        const isMobile = window.innerWidth < 768;
        containerRef.current.style.setProperty(
          "--animation-duration",
          isMobile ? "30s" : "40s"
        );
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      }
      setStart(true);
    }
  }, []);

  return (
    <section className="w-full relative py-16 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/kayak.jpg')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-12 md:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] max-w-4xl mx-auto text-white text-center">
            Discover the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-transparent bg-clip-text">
                Great North
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0"></span>
            </span>
          </h2>

          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mt-6 font-medium leading-relaxed text-center">
            Embark on extraordinary adventures unique to Canada's stunning
            outdoors.
          </p>
        </div>

        <div
          ref={containerRef}
          className="scroller relative z-20 w-full overflow-hidden"
        >
          <div
            ref={scrollerRef}
            className={cn(
              "flex min-w-full shrink-0 gap-3 md:gap-6 py-4 w-max flex-nowrap",
              start && "animate-scroll",
              "hover:[animation-play-state:paused]"
            )}
          >
            {features.map((feature, idx) => (
              <Card
                key={`${feature.title}-${idx}`}
                className="group relative bg-black/40 border-0 overflow-hidden rounded-xl sm:rounded-2xl 
                  transition-all duration-500 hover:-translate-y-2 cursor-pointer 
                  h-[280px] sm:h-[350px] md:h-[450px]
                  w-[240px] sm:w-[350px] md:w-[400px]
                  hover:bg-black/60 backdrop-blur-sm flex-shrink-0
                  shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]
                  hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 
                  opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                ></div>

                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-all duration-500 
                    group-hover:scale-105 
                    group-hover:brightness-75
                    filter brightness-90"
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 350px, 400px"
                />

                <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 group-hover:text-white mb-2 flex items-center justify-center gap-2">
                      {feature.title}
                      <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </CardTitle>
                    <div
                      className="w-8 sm:w-12 h-1 bg-orange-500 rounded-full transform origin-center scale-x-0 
                      group-hover:scale-x-100 transition-transform duration-500 mx-auto"
                    ></div>
                    <CardMeta
                      className="text-white/80 group-hover:text-white/90 text-sm sm:text-base leading-relaxed 
                      opacity-0 group-hover:opacity-100 transform translate-y-4 
                      group-hover:translate-y-0 transition-all duration-500 text-center"
                    >
                      <p>{feature.location}</p>
                      <p>{feature.season}</p>
                    </CardMeta>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <CardDescription
                      className="text-white/80 group-hover:text-white/90 text-sm sm:text-base leading-relaxed 
                      opacity-0 group-hover:opacity-100 transform translate-y-4 
                      group-hover:translate-y-0 transition-all duration-500 text-center"
                    >
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                  transition-colors duration-500"
                ></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
