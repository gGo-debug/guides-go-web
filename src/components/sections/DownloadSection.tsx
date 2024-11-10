"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Image from "next/image";

export function DownloadSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background setup similar to Hero */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat overflow-hidden rounded-3xl"
        style={{
          backgroundImage: 'url("/app-bg.jpg")',
          backgroundBlendMode: 'overlay',
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
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] inline-block text-transparent bg-clip-text">
                  Local Guides
                </span>
              </h2>
              <p className="text-lg text-white/80 max-w-xl">
                Join our growing community of adventurers and guides across the globe.
                Experience local expertise wherever you go.
              </p>
            </div>

            {/* Stats - Updated for dark background */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold text-[#FF6B35]">50+</p>
                  <p className="text-sm text-white/70">Countries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF6B35]">1K+</p>
                  <p className="text-sm text-white/70">Local Guides</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF6B35]">10K+</p>
                  <p className="text-sm text-white/70">Adventures</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - App Interface */}
          <motion.div 
            className="relative h-[600px] w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/iphone.png"
              alt="Guides Go App Interface"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default DownloadSection; 