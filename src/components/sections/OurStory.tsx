"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function StorySection() {
  return (
    <section
      id="about"
      className="relative min-h-[80vh] overflow-hidden py-20 w-full"
    >
      {/* Background gradient - updated to orange */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0E9871]/10 via-[#0E9871]/5 to-transparent" />

      {/* Content container */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div className="text-center lg:text-left space-y-8">
            <motion.div className="space-y-8">
              {/* <span className="text-[#0E9871] font-semibold tracking-wide uppercase text-sm">
                Our story
              </span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2D3142]">
                About{" "}
                <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] inline-block text-transparent bg-clip-text">
                  GuidesGo
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#2D3142]/80 max-w-xl mx-auto lg:mx-0">
                Born out of a love for Canada's wild landscapes, GuidesGo was
                created by a group of outdoor enthusiasts who wanted to make
                outdoor adventures more accessible and environmentally
                conscious.
              </p>
              <p className="text-lg md:text-xl text-[#2D3142]/80 max-w-xl mx-auto lg:mx-0">
                Our mission is simple: to connect adventurers with expert
                guides, ensure sustainable practices, and make it easier for
                guides to manage and grow their businesses. Whether you're a
                beginner looking to try something new or an experienced explorer
                seeking a unique challenge, we want every trip to be an
                unforgettable journey that also contributes to the conservation
                of our natural spaces.
              </p>
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
                src="/sturg.jpeg"
                alt="About image showing founders hiking"
                width={800}
                height={700}
                className="object-cover w-full h-full rounded-3xl hover:scale-105 transition-transform duration-[3s]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

              {/* Floating stats card */}
              {/* <motion.div
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
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
