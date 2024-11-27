"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface FormData {
  email: string;
  name: string;
  userType: "guide" | "adventurer";
  interests?: string;
  location?: string;
}

export default function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    userType: "adventurer",
    interests: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Show success message
      alert("Thanks for joining! We'll keep you updated on our launch.");

      // Reset form
      setFormData({
        email: "",
        name: "",
        userType: "adventurer",
        interests: "",
        location: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden py-20 w-full">
      {/* Background setup similar to Hero */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium">
                  Coming Soon
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Join the{" "}
                  <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] inline-block text-transparent bg-clip-text">
                    Adventure
                  </span>
                </h1>
                <p className="text-lg text-white/80 max-w-xl">
                  Be among the first to experience the future of adventure. Sign up now for 
                  early access and exclusive updates about our launch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/50 focus:outline-none focus:ring-2 
                        focus:ring-[#39CF8D] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/50 focus:outline-none focus:ring-2 
                        focus:ring-[#39CF8D] focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      I am a...
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="guide"
                          checked={formData.userType === "guide"}
                          onChange={(e) => setFormData({ ...formData, userType: "guide" })}
                          className="w-4 h-4 text-[#39CF8D] focus:ring-[#39CF8D] border-white/20 bg-white/10"
                        />
                        <span className="text-white">Guide</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="adventurer"
                          checked={formData.userType === "adventurer"}
                          onChange={(e) => setFormData({ ...formData, userType: "adventurer" })}
                          className="w-4 h-4 text-[#39CF8D] focus:ring-[#39CF8D] border-white/20 bg-white/10"
                        />
                        <span className="text-white">Adventurer</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-white text-sm font-medium mb-2">
                      Location (Optional)
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/50 focus:outline-none focus:ring-2 
                        focus:ring-[#39CF8D] focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-white text-sm font-medium mb-2">
                      Interests (Optional)
                    </label>
                    <input
                      id="interests"
                      type="text"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/50 focus:outline-none focus:ring-2 
                        focus:ring-[#39CF8D] focus:border-transparent"
                      placeholder="E.g., Hiking, Rock Climbing, Kayaking"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white 
                    rounded-lg py-4 px-8 text-lg font-semibold hover:opacity-90 transition-all 
                    shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Joining..." : "Join Waitlist"}
                </button>

                <p className="text-sm text-white/60 text-center">
                  By joining, you agree to receive updates about Guides GO.
                  <br />
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right column - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block "
          >
            <div className="relative flex justify-center">
              <Image
                src="/mock.png"
                alt="Guides GO App Interface"
                width={400}
                height={450}
                className="rounded-2xl"
                priority
              />

              {/* Floating testimonials */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -left-4 top-1/4 p-4 bg-white rounded-xl shadow-lg max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    EA
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah K.</p>
                    <p className="text-xs text-gray-500">Early Adopter</p>
                    <div className="flex text-yellow-400 mt-1">★★★★★</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  "Can't wait for the launch! This is exactly what the adventure community needs."
                </p>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -right-4 bottom-1/4 p-4 bg-white rounded-xl shadow-lg max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    PG
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex M.</p>
                    <p className="text-xs text-gray-500">Professional Guide</p>
                    <div className="flex text-yellow-400 mt-1">★★★★★</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  "Finally, a platform that understands what guides and adventurers really need!"
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}