"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface PreloaderContextType {
  registerAsset: (id: string) => void;
  markAssetLoaded: (id: string) => void;
  isLoading: boolean;
  progress: number;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    return {
      registerAsset: () => {},
      markAssetLoaded: () => {},
      isLoading: false,
      progress: 100
    };
  }
  return context;
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const registrationStarted = useRef(false);
  const forceFinish = useRef(false);

  // Safely get translations
  let t;
  try {
    t = useTranslations("Preloader");
  } catch (e) {
    t = (key: string) => key === "title" ? "Loading..." : "";
  }

  const registerAsset = useCallback((id: string) => {
    registrationStarted.current = true;
    setAssets((prev) => {
      if (prev[id] !== undefined) return prev;
      return { ...prev, [id]: false };
    });
  }, []);

  const markAssetLoaded = useCallback((id: string) => {
    setAssets((prev) => {
      if (prev[id] === true) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  const totalAssets = Object.keys(assets).length;
  const loadedAssets = Object.values(assets).filter(Boolean).length;
  
  // Real progress: weighted slightly so it doesn't jump too much
  const realProgress = totalAssets === 0 ? (registrationStarted.current ? 0 : 100) : (loadedAssets / totalAssets) * 100;

  // Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        // If we are forcing a finish (timeout or success)
        if (forceFinish.current || (registrationStarted.current && totalAssets > 0 && loadedAssets === totalAssets)) {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 400);
            return 100;
          }
          return Math.min(100, prev + 2);
        }

        let increment = 0;
        if (prev < realProgress) {
          // If we're behind reality, move faster but still smooth
          increment = (realProgress - prev) * 0.05 + 0.1;
        } else {
          // Constant creep: gets slower as it goes higher
          // This keeps the bar moving even if assets are slow
          const remaining = 100 - prev;
          increment = Math.max(0.01, remaining * 0.005);
        }
        
        const next = prev + increment;
        return next >= 99.9 ? 99.9 : next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [realProgress, totalAssets, loadedAssets]);

  // Emergency timeout: 30 seconds for 4K content
  useEffect(() => {
    const timer = setTimeout(() => {
      forceFinish.current = true;
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ registerAsset, markAssetLoaded, isLoading, progress: displayedProgress }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-full max-w-md space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-3 mb-12">
                   <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center">
                      <img src="/logos/syntax-i.webp" alt="Syntax Studio" className="h-full w-auto" />
                   </div>
                   <h2 className="text-xl font-bold tracking-tighter uppercase italic">Syntax Studio</h2>
                </div>
                
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">
                  <span>{t("title")}</span>
                  <span>{Math.round(displayedProgress)}%</span>
                </div>
                
                <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                  <motion.div
                    animate={{ width: `${displayedProgress}%` }}
                    transition={{ type: "tween", ease: "linear", duration: 0.03 }}
                    className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={cn("transition-opacity duration-1000", isLoading ? "opacity-0 overflow-hidden h-screen" : "opacity-100")}>
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}
