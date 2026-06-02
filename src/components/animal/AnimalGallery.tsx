"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnimalImage } from "@/types";

interface Props {
  images: AnimalImage[];
  animalName: string;
}

export function AnimalGallery({ images, animalName }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] bg-dark-700 rounded-2xl flex items-center justify-center">
        <p className="text-dark-500 text-sm">Sin imágenes</p>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        {/* Large image */}
        <div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-700 cursor-zoom-in group"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[current].url}
            alt={`${animalName} - foto ${current + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn size={32} className="text-white/0 group-hover:text-white/80 transition-all scale-75 group-hover:scale-100" />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-dark-900 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={cn(
                      "rounded-full transition-all",
                      i === current ? "w-5 h-1.5 bg-gold-500" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setCurrent(i)}
                className={cn(
                  "relative w-20 h-16 rounded-lg overflow-hidden shrink-0 transition-all",
                  i === current
                    ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-dark-900"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img.url}
                  alt={`thumb ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
            onClick={() => setLightbox(false)}
          >
            <X size={20} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={20} />
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current].url}
              alt={`${animalName} - foto ${current + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={20} />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-dark-400 text-sm">
            {current + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
