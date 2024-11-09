"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { cn } from "@/lib/utils";

const impactStats = [
  {
    number: "50K+",
    label: "Trees Planted",
    icon: "🌱",
  },
  {
    number: "100+",
    label: "Local Communities Supported",
    icon: "🤝",
  },
  {
    number: "25K",
    label: "Carbon Offsets (tons)",
    icon: "🌍",
  },
  {
    number: "200+",
    label: "Conservation Projects",
    icon: "🦁",
  },
];

const initiatives = [
  {
    title: "Carbon Offset Adventures",
    description: "Every adventure automatically contributes to carbon offset projects",
    icon: "🌿",
  },
  {
    title: "Local Community Support",
    description: "Direct economic benefits to indigenous and local communities",
    icon: "👥",
  },
  {
    title: "Conservation Projects",
    description: "Active participation in wildlife and habitat preservation",
    icon: "🐘",
  },
  {
    title: "Sustainable Tourism",
    description: "Promoting responsible travel practices and environmental education",
    icon: "🎯",
  },
];

export default function CommunityImpact() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-mountain-gray"
            >
              Adventure with Purpose
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              We believe in making every adventure count. Our commitment to sustainable tourism 
              creates positive impact for both nature and communities.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <span className="text-4xl">{stat.icon}</span>
                <div className="text-3xl font-bold text-forest-green">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Initiatives Grid and Image - New Layout */}
          <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
            {/* Left Column - Initiatives */}
            <div className="space-y-4 h-full">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{initiative.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-mountain-gray mb-2">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-600">{initiative.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full rounded-2xl overflow-hidden"
            >
              <Image
                src="/adventure/adventure-group.jpg"
                alt="Community impact through sustainable tourism"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <p className="text-lg font-medium">
                    "Through Guides GO, we've been able to preserve our traditional practices while 
                    sharing our culture with respectful travelers."
                  </p>
                  <p className="mt-2 text-sm">- Maria, Indigenous Community Leader</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
} 