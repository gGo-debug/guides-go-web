"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Interactive Maps",
    description: "Visualize and track your journey",
    icon: "🗺️",
    image: "/adventures/map-feature.webp",
    alt: "3D interactive map showing hiking trails with user location and points of interest"
  },
  {
    title: "Quest System",
    description: "Turn every trip into an achievement",
    icon: "🎯",
    image: "/adventures/quest-feature.webp",
    alt: "Quest completion interface showing progress, rewards, and badges"
  },
  {
    title: "Social Groups",
    description: "Connect with fellow adventurers",
    icon: "👥",
    image: "/adventures/social-feature.webp",
    alt: "Adventure group chat and meetup planning interface"
  },
  {
    title: "Live Streaming",
    description: "Share experiences in real-time",
    icon: "📱",
    image: "/adventures/stream-feature.webp",
    alt: "Guide livestreaming a mountain climb with viewer interactions"
  },
  {
    title: "Reward System",
    description: "Earn points and unlock perks",
    icon: "🌟",
    image: "/adventures/rewards-feature.webp",
    alt: "Rewards dashboard showing points, achievements, and available perks"
  },
  {
    title: "Guide Profiles",
    description: "Find the perfect guide for your adventure",
    icon: "🧗‍♂️",
    image: "/adventures/guides-feature.webp",
    alt: "Professional guide profile with ratings, reviews, and upcoming adventures"
  }
];

export default function AppShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-montserrat font-bold text-mountain-gray mb-6"
          >
            Everything You Need for Your Next Adventure
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative mb-6 overflow-hidden rounded-lg aspect-video">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="font-montserrat font-semibold text-xl text-mountain-gray">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base text-gray-600 font-inter">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#download"
            className="inline-flex items-center px-8 py-4 bg-sunset-orange text-white rounded-lg font-semibold hover:bg-sunset-orange/90 transition-colors"
          >
            Start Exploring Now
          </a>
        </motion.div>
      </Container>
    </section>
  );
} 