"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const benefits = [
  {
    title: "Build your brand",
    description: "Create your unique identity and grow your online presence",
    emoji: "🎯"
  },
  {
    title: "Set your own schedule",
    description: "Work when you want, where you want with full flexibility",
    emoji: "📅"
  },
  {
    title: "Grow your following",
    description: "Connect with adventure seekers and build your community",
    emoji: "🌱"
  },
  {
    title: "Earn more",
    description: "Unlock multiple revenue streams through guided adventures",
    emoji: "💰"
  },
];

export default function GuideRecruitment() {
  return (
    <section className="w-full bg-gradient-to-br from-[#2A5A3B]/10 via-[#2A5A3B]/5 to-transparent py-32">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#2A5A3B] font-semibold tracking-wide uppercase text-sm">
                Become a Guide
              </span>
              <h2 className="text-5xl font-bold font-montserrat text-[#2D3142] leading-tight">
                Ready to Share Your{" "}
                <span className="text-[#2A5A3B]">Expertise?</span>
              </h2>
              <p className="text-xl text-[#2D3142]/80 max-w-xl">
                Join our community of professional guides and turn your passion into profit.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="p-8 h-full hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-start">
                        <span className="text-2xl" role="img" aria-label={benefit.title}>
                          {benefit.emoji}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl text-[#2D3142]">
                        {benefit.title}
                      </h3>
                      <p className="text-[#2D3142]/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-2">
              <Button
                size="lg"
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Apply to Become a Guide
              </Button>
              <p className="text-sm text-[#2D3142]/60 max-w-[200px]">
                Join 500+ professional guides already on our platform
              </p>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl "
          >
            <Image
              src="/adventure/happy-group.jpg"
              alt="Professional guide leading an adventure"
              width={800}
              height={700}
              className="object-cover w-full h-full rounded-3xl hover:scale-105 transition-transform duration-[3s]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-[#2D3142]/70">Average Rating</p>
                  <p className="text-2xl font-bold text-[#2D3142]">4.9/5.0</p>
                </div>
                <div>
                  <p className="text-sm text-[#2D3142]/70">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-[#2D3142]">$2.5k+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 