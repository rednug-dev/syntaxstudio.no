"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface ImageComparisonSliderProps {
  before: string;
  after: string;
  alt: string;
}

export function ImageComparisonSlider({ before, after, alt }: ImageComparisonSliderProps) {
  const [width, setWidth] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useMotionValue(width / 2);
  const clipPath = useTransform(x, (latest) => `inset(0 ${width - latest}px 0 0)`);

  return (
    <div ref={containerRef} className="relative w-full max-w-md aspect-video overflow-hidden">
      <div className="relative w-full h-full">
        <Image src={before} alt={`Before ${alt}`} layout="fill" objectFit="contain" />
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ clipPath }}
      >
        <Image src={after} alt={`After ${alt}`} layout="fill" objectFit="contain" />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        style={{ x: useTransform(x, val => val - width/2) }}
        drag="x"
        dragConstraints={{ left: 0, right: width }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
        onDrag={(_, info) => x.set(info.point.x)}
      >
        <div className="w-1 h-full bg-white/50 cursor-ew-resize relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
