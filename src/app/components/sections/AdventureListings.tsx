"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

function AdventureListings() {
  const adventures = [
    {
      id: 1,
      title: "Mountain Hiking Expedition",
      description:
        "Join us for a thrilling mountain hiking experience through the scenic trails.",
      image: "/adventure/mountain-hiking.jpg",
      location: "Rocky Mountains",
      duration: "6 hours",
      groupSize: "4-8 people",
      difficulty: "Moderate",
      host: {
        name: "Alex Thompson",
        image: "/guides/mountain-guide.png",
        rating: 4.9,
        reviewCount: 128,
        badgeText: "Expert Guide",
      },
    },
    {
      id: 2,
      title: "Kayaking Adventure",
      description: "Explore the serene waters with our guided kayaking tours.",
      image: "/adventure/kayaking.jpg",
      location: "Lake Tahoe",
      duration: "4 hours",
      groupSize: "2-6 people",
      difficulty: "Easy",
      host: {
        name: "Maria Rodriguez",
        image: "/guides/guide2.png",
        rating: 4.7,
        reviewCount: 96,
        badgeText: "Professional Guide",
      },
    },
    {
      id: 3,
      title: "Fly Fishing Trip",
      description:
        "Learn how to Fly fish with an expert guide.",
      image: "/adventure/flyfish.jpeg",
      location: "Fraser river",
      duration: "8 hours",
      groupSize: "3-10 people",
      difficulty: "Moderate",
      host: {
        name: "James Chen",
        image: "/guides/guide3.png",
        rating: 4.8,
        reviewCount: 112,
        badgeText: "Adventure Guide",
      },
    },
  ];

  return (
    <section className="relative px-4 py-12 w-full">
      <div className="absolute inset-x-0 top-0 h-32 -mt-32" />

      <div className="relative max-w-7xl mx-auto bg-transparent p-4 rounded-lg">
        <div className="px-8 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl mx-auto text-center">
            Choose Your Own{" "}
            <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-transparent bg-clip-text">
              Adventures
            </span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl mt-6 max-w-2xl mx-auto text-mountain-gray/80 text-center font-medium">
            Discover unique experiences curated by our expert local guides
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure, index) => (
            <motion.div
              key={adventure.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="shadow-lg"
            >
              <Card className="group overflow-hidden border-2 border-transparent hover:border-forest-green/20 transition-all duration-300 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 cursor-pointer">
                <div className="relative h-56">
                  <img
                    src={adventure.image}
                    alt={adventure.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-forest-green">
                    {adventure.difficulty}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-forest-green transition-colors">
                    {adventure.title}
                  </h3>
                  <p className="text-mountain-gray/80 mb-4 line-clamp-2">
                    {adventure.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4 p-3 bg-[#0E9871]/10 rounded-lg">
                    <img
                      src={adventure.host.image}
                      alt={adventure.host.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-forest-green/20"
                      width={48}
                      height={48}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">
                          {adventure.host.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0.5 bg-white text-forest-green border-forest-green/20"
                        >
                          {adventure.host.badgeText}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {adventure.host.rating}
                        </span>
                        <span className="text-mountain-gray/70">
                          ({adventure.host.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-mountain-gray/70">
                      <MapPin className="w-4 h-4 mr-2" />
                      {adventure.location}
                    </div>
                    <div className="flex items-center text-sm text-mountain-gray/70">
                      <Clock className="w-4 h-4 mr-2" />
                      {adventure.duration}
                    </div>
                    <div className="flex items-center text-sm text-mountain-gray/70">
                      <Users className="w-4 h-4 mr-2" />
                      {adventure.groupSize}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all py-6 text-lg font-semibold">
                    Book Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdventureListings;

