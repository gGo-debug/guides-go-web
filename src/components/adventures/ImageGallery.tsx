"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image
          src={images[mainImageIndex].url}
          alt={images[mainImageIndex].alt}
          fill
          className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            setLightboxIndex(mainImageIndex);
            setShowLightbox(true);
          }}
          priority
        />
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg cursor-pointer group",
              index === mainImageIndex && "ring-2 ring-primary"
            )}
            onClick={() => setMainImageIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {index === 3 && images.length > 4 && (
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(0);
                  setShowLightbox(true);
                }}
              >
                <span className="text-lg font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-transparent border-none">
          <div className="relative h-full flex items-center justify-center">
            <button
              onClick={previousImage}
              className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
            />
            
            <button
              onClick={nextImage}
              className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}