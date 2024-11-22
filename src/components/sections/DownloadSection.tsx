"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, MapPin, MessageCircle, Calendar, Menu } from "lucide-react";

export function DownloadSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background setup similar to Hero */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: 'url("/app-bg.jpg")',
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container className="relative py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content - Updated styling */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium">
                Global Community
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Connect Worldwide with{" "}
                <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] inline-block text-transparent bg-clip-text">
                  Local Guides
                </span>
              </h2>
              <p className="text-lg text-white/80 max-w-xl">
                Join our growing community of adventurers and guides across the
                globe. Experience local expertise wherever you go.
              </p>
            </div>

            {/* Add Download Buttons */}
            <div className="space-y-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
              >
                <Download className="w-6 h-6" />
                Download App
              </Button>

              {/* App store badges */}
              <div className="flex items-center gap-4 mt-4">
                <Image
                  src="/badges/appstore.svg"
                  alt="Download on App Store"
                  width={140}
                  height={40}
                  className="h-[40px] w-auto"
                />
                <Image
                  src="/badges/googleplay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={40}
                  className="h-[40px] w-auto"
                />
              </div>
            </div>

            {/* Stats - Updated for dark background */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold text-[#0E9871]">50+</p>
                  <p className="text-sm text-white/70">Experiences</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0E9871]">1K+</p>
                  <p className="text-sm text-white/70">Local Guides</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0E9871]">10K+</p>
                  <p className="text-sm text-white/70">Adventures</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Mock iPhone & App Interface */}
          <motion.div
            className="relative h-[600px] w-full flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/mock.png"
              alt="Guides Go App Interface"
              width={280}
              height={580}
              className="object-contain drop-shadow-2xl hover:translate-y-[-8px] transition-all duration-300"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default DownloadSection;

