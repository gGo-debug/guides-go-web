"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  image: string;
  content: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Martinez",
    role: "Mountain Guide",
    rating: 4.9,
    image: "/testimonials/alex.jpg",
    content: "Since joining Guides GO, I've built a following of 2,000+ adventure enthusiasts. The livestreaming feature lets me share my passion for mountain climbing with people worldwide.",
    location: "Colorado, USA"
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Community Member",
    rating: 4.8,
    image: "/testimonials/sarah.jpg",
    content: "The quest system makes every hike feel like an achievement. I've completed 23 quests and made amazing friends along the way!",
    location: "Vancouver, Canada"
  },
  {
    id: 3,
    name: "Marco Silva",
    role: "Adventure Guide",
    rating: 5.0,
    image: "/testimonials/marco.jpg",
    content: "As a professional guide, Guides GO has transformed how I connect with adventure seekers. The platform's tools make it easy to manage bookings and grow my business.",
    location: "Lisbon, Portugal"
  }
];

// Update the movingTestimonials to include the ratings
const movingTestimonials = testimonials.map(t => ({
  quote: t.content,
  name: t.name,
  title: `${t.role} • ${t.location}`,
  image: t.image,
  rating: t.rating
}));

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-semibold text-lg text-mountain-gray">{testimonial.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-mountain-gray/80">{testimonial.role}</span>
              <span className="text-sm text-mountain-gray/60">•</span>
              <span className="text-sm text-mountain-gray/80">{testimonial.location}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarFilledIcon
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(testimonial.rating)
                  ? "text-[#FFD700]"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-mountain-gray">
            {testimonial.rating}
          </span>
        </div>

        <p className="mt-4 text-mountain-gray/90 leading-relaxed">
          {testimonial.content}
        </p>
      </Card>
    </motion.div>
  );
}

export default function SocialProof() {
  return (
    <section className="w-full bg-[#2A5A3B] py-24 rounded-[50px]">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Real Stories from the{" "}
            <span className="text-[#FFD702]">
              Guides GO Community
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Join thousands of adventurers and guides who are already transforming their outdoor experiences
          </p>
        </motion.div>

        {/* Add the infinite moving cards before the grid */}
        <div className="mb-16">
          <InfiniteMovingCards
            items={movingTestimonials}
            direction="right"
            speed="slow"
            className="py-4"
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-semibold text-white">
              Join 10,000+ adventure seekers
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <span className="font-medium">Platform Rating</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarFilledIcon key={i} className="h-4 w-4 text-[#FFD700]" />
                ))}
              </div>
              <span className="font-medium">4.9/5</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 