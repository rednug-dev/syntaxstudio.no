"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreloader } from "@/components/ui/asset-preloader";

interface VideoCardProps {
  src: string | string[];
  poster?: string;
  className?: string;
  videoClassName?: string;
  aspectRatio?: "vertical" | "square" | "video";
  objectPosition?: string;
  overlay?: React.ReactNode;
  alwaysPlay?: boolean;
}

export function VideoCard({
  src,
  poster,
  className,
  videoClassName,
  aspectRatio = "vertical",
  objectPosition = "center",
  overlay,
  alwaysPlay = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasIntersected, setHasIntersected] = useState(false);
  const { registerAsset, markAssetLoaded } = usePreloader();

  useEffect(() => {
    const assetId = Array.isArray(src) ? src[0] : src;
    registerAsset(assetId);
  }, [src, registerAsset]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const assetId = Array.isArray(src) ? src[0] : src;

    // If video is already loaded (e.g., from cache), remove loading state immediately
    if (video.readyState >= 2) {
      setIsLoading(false);
      markAssetLoaded(assetId);
    }

    // Observer for lazy loading the video source
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "600px" } // Load when within 600px of viewport
    );

    loadObserver.observe(video);

    const handleCanPlay = () => {
      setIsLoading(false);
      markAssetLoaded(assetId);
    };

    video.addEventListener("canplay", handleCanPlay);

    // Mobile: Play when in view
    const playObserver = new IntersectionObserver(
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

    playObserver.observe(video);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, [alwaysPlay, src, markAssetLoaded]);

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

  const sources = Array.isArray(src) ? src : [src];

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
      {/* Skeleton Shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
           <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }} />
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        loop
        muted
        playsInline
        preload={alwaysPlay ? "auto" : "metadata"}
        autoPlay={alwaysPlay}
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
          isLoading ? "opacity-0" : "opacity-100",
          objectPosition === "top" ? "object-top" : 
          objectPosition === "bottom" ? "object-bottom" : "object-center",
          videoClassName
        )}
      >
        {(alwaysPlay || hasIntersected) && sources.map((source) => (
          <source 
            key={source} 
            src={source} 
            type={source.endsWith('.webm') ? 'video/webm' : 'video/mp4'} 
          />
        ))}
      </video>
      
      {/* Play indicator for desktop hover - only show if not always playing */}
      {!alwaysPlay && (
        <div className={cn(
          "absolute inset-0 bg-black/20 hidden md:flex items-center justify-center transition-opacity duration-300 pointer-events-none",
          isHovering ? "opacity-0" : "opacity-100"
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
