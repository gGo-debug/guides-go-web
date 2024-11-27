"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, Star } from "lucide-react";

interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  difficulty: string;
  group_size: string;
  image_url: string;
  average_rating: number;
  review_count: number;
  guide: {
    name: string;
    profile_image: string;
    experience_years: number;
  };
}

export default function AdventureGrid({ adventures }: { adventures: Adventure[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {adventures.map((adventure, index) => (
        <motion.div
          key={adventure.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link 
            href={`/adventures/${adventure.id}`}
            className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 rounded-t-xl overflow-hidden">
              <Image
                src={adventure.image_url}
                alt={adventure.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#0E9871]">
                ${adventure.price}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#0E9871] transition-colors">
                {adventure.title}
              </h3>

              {/* Guide info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={adventure.guide.profile_image}
                    alt={adventure.guide.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{adventure.guide.name}</p>
                  <p className="text-sm text-gray-500">{adventure.guide.experience_years}+ years experience</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {adventure.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {adventure.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {adventure.group_size}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {adventure.average_rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({adventure.review_count} reviews)
                </span>
              </div>

              {/* Difficulty badge */}
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium
                  bg-[#0E9871]/10 text-[#0E9871]">
                {adventure.difficulty}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}