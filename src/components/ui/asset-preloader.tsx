"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDoneAnimating, setIsDoneAnimating] = useState(false);
  const t = useTranslations("Preloader");

  const registerAsset = useCallback((id: string) => {
    setAssets((prev) => ({ ...prev, [id]: false }));
    setIsLoading(true);
  }, []);

  const markAssetLoaded = useCallback((id: string) => {
    setAssets((prev) => ({ ...prev, [id]: true }));
  }, []);

  const totalAssets = Object.keys(assets).length;
  const loadedAssets = Object.values(assets).filter(Boolean).length;
  const progress = totalAssets === 0 ? 0 : (loadedAssets / totalAssets) * 100;

  useEffect(() => {
    if (totalAssets > 0 && loadedAssets === totalAssets) {
      // Small delay to show 100% before disappearing
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadedAssets, totalAssets]);

  // If no assets are registered within 2 seconds, assume ready
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(assets).length === 0) {
        setIsLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [assets]);

  return (
    <PreloaderContext.Provider value={{ registerAsset, markAssetLoaded, isLoading, progress }}>
      <AnimatePresence onExitComplete={() => setIsDoneAnimating(true)}>
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
                  <span>{Math.round(progress)}%</span>
                </div>
                
                <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
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
