import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CardData {
  id: number;
  title: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Hunting",
    description:
      "From big game to bird hunting, including safety courses, tracking skills, and guided hunts for all levels.",
  },
  {
    id: 2,
    title: "Fishing",
    description:
      "Enjoy river, ocean, and fly fishing, with options for deep-sea saltwater adventures, ice fishing, and catch-and-release trips.",
  },
  {
    id: 3,
    title: "Winter Sports",
    description:
      "Skiing, snowboarding, snowshoeing, ice climbing, and avalanche safety training.",
  },
  {
    id: 4,
    title: "Water Sports",
    description:
      "Kayaking, rafting, stand-up paddleboarding, snorkeling, and wild swimming.",
  },
  {
    id: 5,
    title: "Camping & Survival",
    description:
      "Learn essential wilderness skills like shelter-building, foraging, and survival techniques.",
  },
  {
    id: 6,
    title: "Hiking & Trekking",
    description:
      "Guided day hikes, peak climbing, long-distance treks, and specialized photography hikes.",
  },
  {
    id: 7,
    title: "Extreme Sports",
    description: "Rock climbing, zip-lining, paragliding, skydiving, and more.",
  },
  {
    id: 8,
    title: "Wildlife & Nature Tours",
    description:
      "Birdwatching, whale watching, and wildlife photography safaris.",
  },
  {
    id: 9,
    title: "Educational Workshops",
    description:
      "Wilderness first aid, outdoor cooking, knot-tying, environmental education, and more.",
  },
  {
    id: 10,
    title: "Outdoor Fitness & Mountain Training",
    description:
      "Outdoor fitness camps, mountain endurance training, and guided fitness hikes for all levels.",
  },
  {
    id: 11,
    title: "Family-Friendly Adventures",
    description:
      "Nature walks, safe family camping experiences, and other child-friendly outdoor activities.",
  },
  {
    id: 12,
    title: "Cultural and Historical Tours",
    description:
      "Indigenous heritage tours, archaeology hikes, and local history walks.",
  },
  {
    id: 13,
    title: "Specialty Experiences",
    description: "Mushroom foraging, fall color tours, and full moon hikes.",
  },
  {
    id: 14,
    title: "Corporate Retreats & Group Events",
    description:
      "Customized outdoor team-building activities, corporate retreats, and group events designed to foster collaboration, leadership, and connection in the great outdoors.",
  },
  {
    id: 15,
    title: "Conservation Initiatives",
    description:
      "Participate in environmental conservation activities, including clean-up events, wildlife preservation efforts, and sustainable travel practices that protect Canada's natural habitats.",
  },
];

export default function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleCards = [
    cardData[currentIndex % cardData.length],
    cardData[(currentIndex + 1) % cardData.length],
    cardData[(currentIndex + 2) % cardData.length],
  ];

  const moveCarousel = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + cardData.length) % cardData.length,
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pt-12 mb-10 -translate-x-2">
      <div className="overflow-hidden h-[180px]">
        {" "}
        {/* Fixed height container */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (direction: number) => ({
                x: direction > 0 ? -1000 : 1000,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex space-x-2 absolute px-6 w-full"
          >
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                className="w-full sm:w-full md:w-1/3 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden min-h-[160px]"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="md:text-2xl lg:text-2xl font-semibold mb-8 bg-gradient-to-r from-[#0E9871] to-[#39CF8D] bg-clip-text text-transparent">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 lg:text-lg md:text-lg dark:text-gray-300 flex-grow font-medium">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Button
        className="absolute left-0 top-1 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => moveCarousel(-1)}
        aria-label="Previous card"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </Button>
      <Button
        className="absolute right-0 top-1 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => moveCarousel(1)}
        aria-label="Next card"
      >
        <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </Button>
    </div>
  );
}
