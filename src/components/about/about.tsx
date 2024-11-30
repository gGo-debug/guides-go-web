"use client";

import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaUsers, FaTree, FaMountain } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const services = [
  {
    name: "Hunting",
    description:
      "From big game to bird hunting, including safety courses, tracking skills, and guided hunts for all levels.",
  },
  {
    name: "Fishing",
    description:
      "Enjoy river, ocean, and fly fishing, with options for deep-sea saltwater adventures, ice fishing, and catch-and-release trips.",
  },
  {
    name: "Winter Sports",
    description:
      "Skiing, snowboarding, snowshoeing, ice climbing, and avalanche safety training.",
  },
  {
    name: "Water Sports",
    description:
      "Kayaking, rafting, stand-up paddleboarding, snorkeling, and wild swimming.",
  },
  {
    name: "Camping & Survival",
    description:
      "Learn essential wilderness skills like shelter-building, foraging, and survival techniques.",
  },
  {
    name: "Hiking & Trekking",
    description:
      "Guided day hikes, peak climbing, long-distance treks, and specialized photography hikes.",
  },
  {
    name: "Extreme Sports",
    description: "Rock climbing, zip-lining, paragliding, skydiving, and more.",
  },
  {
    name: "Wildlife & Nature Tours",
    description:
      "Birdwatching, whale watching, and wildlife photography safaris.",
  },
  {
    name: "Educational Workshops",
    description:
      "Wilderness first aid, outdoor cooking, knot-tying, environmental education, and more.",
  },
  {
    name: "Outdoor Fitness & Mountain Training",
    description:
      "Outdoor fitness camps, mountain endurance training, and guided fitness hikes for all levels.",
  },
  {
    name: "Family-Friendly Adventures",
    description:
      "Nature walks, safe family camping experiences, and other child-friendly outdoor activities.",
  },
  {
    name: "Cultural and Historical Tours",
    description:
      "Indigenous heritage tours, archaeology hikes, and local history walks.",
  },
  {
    name: "Specialty Experiences",
    description: "Mushroom foraging, fall color tours, and full moon hikes.",
  },
  {
    name: "Corporate Retreats & Group Events",
    description:
      "Customized outdoor team-building activities, corporate retreats, and group events designed to foster collaboration, leadership, and connection in the great outdoors.",
  },
  {
    name: "Conservation Initiatives",
    description:
      "Participate in environmental conservation activities, including clean-up events, wildlife preservation efforts, and sustainable travel practices that protect Canada's natural habitats.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-black/60 bg-center text-white py-20 text-center"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundBlendMode: "overlay",
        }}
      >
        {/* <h1 className="text-4xl font-bold mb-4">About GuidesGo</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Connecting adventurers with expert guides for unforgettable outdoor
          experiences across Canada.
        </p> */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mt-12">
          About{" "}
          <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] inline-block text-transparent bg-clip-text">
            GuidesGo
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto my-6">
          Connecting adventurers with expert guides for unforgettable outdoor
          experiences across Canada.
        </p>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl mx-auto text-center mb-12">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="mb-4 text-base md:text-lg lg:text-xl mt-6 max-w-2xl mx-auto text-mountain-gray/80 text-left font-medium">
                Born out of a love for Canada's wild landscapes, Guides GO was
                created by a group of outdoor enthusiasts who wanted to make
                outdoor adventures more accessible and environmentally
                conscious.
              </p>
              <p className="mb-4 text-base md:text-lg lg:text-xl mt-6 max-w-2xl mx-auto text-mountain-gray/80 text-left font-medium">
                Our mission is simple: to connect adventurers with expert
                guides, ensure sustainable practices, and make it easier for
                guides to manage and grow their businesses. Whether you’re a
                beginner looking to try something new or an experienced explorer
                seeking a unique challenge, we want every trip to be an
                unforgettable journey that also contributes to the conservation
                of our natural spaces.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/canada-landscape.jpg"
                alt="Canadian landscape"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">For Guides</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="mb-4">
              Guides GO offers more than just a platform to connect with
              clients—we provide guides with tools to manage their business,
              streamline bookings, and grow their client base.
            </p>
            <p>
              Whether you're running a fishing trip or leading a wilderness
              survival course, we make it easier for you to focus on what you do
              best: sharing your outdoor expertise, creating lasting memories,
              and promoting conservation efforts.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Why Choose Guides GO?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { icon: FaMapMarkedAlt, text: "Expert Local Guides" },
              { icon: FaUsers, text: "Personalized Experiences" },
              { icon: FaTree, text: "Sustainable Practices" },
              { icon: FaMountain, text: "Diverse Adventures" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center"
              >
                <item.icon className="text-4xl text-[#39CF8D] mb-4" />
                <h3 className="text-xl font-semibold">{item.text}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Start Your Adventure Today
          </h2>
          <p className="mb-8 text-xl">
            Whether you're looking for the perfect guide or you're a guide ready
            to grow your business, we're here to help make it happen!
          </p>
          <Link
            href="/waitlist"
            className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore GuidesGo
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
