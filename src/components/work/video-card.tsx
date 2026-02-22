"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  src: string;
  className?: string;
  videoClassName?: string;
  aspectRatio?: "vertical" | "square" | "video";
  objectPosition?: string;
  overlay?: React.ReactNode;
  alwaysPlay?: boolean;
}

export function VideoCard({
  src,
  className,
  videoClassName,
  aspectRatio = "vertical",
  objectPosition = "center",
  overlay,
  alwaysPlay = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || alwaysPlay) return;

    // Mobile: Play when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.innerWidth < 768) {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [alwaysPlay]);

  // Desktop: Play on hover
  const handleMouseEnter = () => {
    if (!alwaysPlay && window.innerWidth >= 768 && videoRef.current) {
      setIsHovering(true);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!alwaysPlay && window.innerWidth >= 768 && videoRef.current) {
      setIsHovering(false);
      videoRef.current.pause();
    }
  };

  const ratioClass = {
    vertical: "aspect-[9/16]",
    square: "aspect-square",
    video: "aspect-video",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/5 bg-black shadow-xl group",
        ratioClass,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="auto"
        autoPlay={alwaysPlay}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
          objectPosition === "top" ? "object-top" : 
          objectPosition === "bottom" ? "object-bottom" : "object-center",
          videoClassName
        )}
      />
      
      {/* Play indicator for desktop hover - only show if not always playing */}
      {!alwaysPlay && (
        <div className={cn(
          "absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
          isHovering || (typeof window !== 'undefined' && window.innerWidth < 768) ? "opacity-0" : "opacity-100"
        )}>
          <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Play className="h-5 w-5 text-white fill-white opacity-50" />
          </div>
        </div>
      )}

      {overlay && (
        <div className="absolute inset-0 pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  );
}
