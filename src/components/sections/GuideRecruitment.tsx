"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const benefits = [
  {
    title: "Build your brand",
    description: "Create your unique identity and grow your online presence",
    emoji: "🎯",
  },
  {
    title: "Set your own schedule",
    description: "Work when you want, where you want with full flexibility",
    emoji: "📅",
  },
  {
    title: "Grow your following",
    description: "Connect with adventure seekers and build your community",
    emoji: "🌱",
  },
  {
    title: "Earn more",
    description: "Unlock multiple revenue streams through guided adventures",
    emoji: "💰",
  },
];

export function GuideRecruitment() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden py-20 w-full">
      {/* Background gradient - updated to orange */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0E9871]/10 via-[#0E9871]/5 to-transparent" />

      {/* Content container */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div className="text-center lg:text-left space-y-8">
            <motion.div className="space-y-8">
              <span className="text-[#0E9871] font-semibold tracking-wide uppercase text-sm">
                Become a Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2D3142]">
                Ready to Share Your{" "}
                <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] inline-block text-transparent bg-clip-text">
                  Expertise?
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#2D3142]/80 max-w-xl mx-auto lg:mx-0">
                Join our community of professional guides and turn your passion
                into profit.
              </p>

              {/* Benefits grid */}
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
                          <span
                            className="text-2xl"
                            role="img"
                            aria-label={benefit.title}
                          >
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

              {/* CTA section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] hover:opacity-90 text-white px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Apply to Become a Guide
                </Button>
                {/* <p className="text-sm text-[#2D3142]/60 max-w-[200px]"> */}
                {/*   Join 500+ professional guides already on our platform */}
                {/* </p> */}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Image and stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl">
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

              {/* Floating stats card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#2D3142]/70">Average Rating</p>
                    <p className="text-2xl font-bold text-[#2D3142]">4.9/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#2D3142]/70">
                      Monthly Earnings
                    </p>
                    <p className="text-2xl font-bold text-[#2D3142]">$2.5k+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GuideRecruitment;

