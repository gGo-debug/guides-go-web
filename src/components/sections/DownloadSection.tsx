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

            {/* Add Download Buttons */}
            <div className="space-y-6">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] hover:opacity-90 text-white gap-2 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
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

          {/* Right Content - Mock iPhone & App Interface */}
          <motion.div 
            className="relative h-[600px] w-full flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* iPhone Mock */}
            <div className="relative w-[280px] h-[580px] bg-[#1F1F1F] rounded-[45px] shadow-2xl border-[8px] border-[#2D2D2D] overflow-hidden
              before:absolute before:inset-0 before:z-10 before:rounded-[35px] before:bg-gradient-to-tr before:from-black/5 before:to-transparent
              after:absolute after:inset-0 after:z-10 after:rounded-[35px] after:bg-gradient-to-bl after:from-white/5 after:to-transparent"
            >
              {/* Power Button */}
              <div className="absolute right-[-8px] top-24 w-[2px] h-12 bg-[#2D2D2D] rounded-r-lg shadow-inner" />
              
              {/* Volume Buttons */}
              <div className="absolute left-[-8px] top-20 w-[2px] h-8 bg-[#2D2D2D] rounded-l-lg shadow-inner" />
              <div className="absolute left-[-8px] top-32 w-[2px] h-8 bg-[#2D2D2D] rounded-l-lg shadow-inner" />

              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[120px] bg-black rounded-b-[20px] z-20">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-[4px] bg-[#1F1F1F] rounded-full" />
                <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-[#1F1F1F]" />
              </div>

              {/* Screen Content */}
              <div className="absolute inset-2 bg-white rounded-[35px] overflow-hidden">
                {/* Status Bar */}
                <div className="h-12 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] flex items-center justify-between px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-xs font-medium">9:41</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-[2px]">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-[3px] h-[10px] bg-white rounded-sm" />
                      ))}
                    </div>
                    <div className="w-4 h-[10px] bg-white rounded-sm" /> {/* WiFi */}
                    <div className="w-6 h-[12px] bg-white rounded-[2px] relative">
                      <div className="absolute right-[2px] top-[2px] w-[2px] h-[8px] bg-[#FF6B35] rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="p-4 space-y-4">
                  {/* Welcome Text */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Good morning, Alex</h3>
                    <p className="text-sm text-gray-500">Find your next adventure</p>
                  </div>

                  {/* Search Bar */}
                  <div className="bg-gray-100 rounded-full p-3 flex items-center gap-2 shadow-sm">
                    <MapPin className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-sm text-gray-500">Search destinations...</span>
                  </div>

                  {/* Categories */}
                  <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
                    {['Hiking', 'City Tours', 'Photography', 'Food'].map((category) => (
                      <div 
                        key={category}
                        className="px-4 py-2 bg-orange-50 rounded-full text-sm text-[#FF6B35] whitespace-nowrap"
                      >
                        {category}
                      </div>
                    ))}
                  </div>

                  {/* Featured Guides */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Top Local Guides</h3>
                      <span className="text-sm text-[#FF6B35]">See all</span>
                    </div>
                    {[
                      { name: 'Sarah Chen', specialty: 'Mountain Guide', rating: '4.9' },
                      { name: 'Marco Silva', specialty: 'Urban Explorer', rating: '4.8' }
                    ].map((guide) => (
                      <div key={guide.name} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-[#FF6B35] font-medium">
                          {guide.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{guide.name}</p>
                              <p className="text-sm text-gray-500">{guide.specialty}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">⭐️ {guide.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t flex justify-around items-center px-6 pb-4">
                    <Menu className="w-6 h-6 text-gray-400" />
                    <MapPin className="w-6 h-6 text-[#FF6B35]" />
                    <MessageCircle className="w-6 h-6 text-gray-400" />
                    <Calendar className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default DownloadSection; 