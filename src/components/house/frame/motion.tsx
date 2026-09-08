"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type FrameMotionValue = {
  motionEnabled: boolean;
  reducedMotion: boolean;
  toggleMotion: () => void;
};

const FrameMotionContext = createContext<FrameMotionValue | null>(null);
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const finePointerQuery = "(hover: hover) and (pointer: fine)";

function subscribeToMedia(query: string, listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

const subscribeToReducedMotion = (listener: () => void) => subscribeToMedia(reducedMotionQuery, listener);
const subscribeToFinePointer = (listener: () => void) => subscribeToMedia(finePointerQuery, listener);
const reducedMotionSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const finePointerSnapshot = () => window.matchMedia(finePointerQuery).matches;
const reducedMotionOnServer = () => true;
const finePointerOnServer = () => false;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useFrameMotion(): FrameMotionValue {
  const context = useContext(FrameMotionContext);
  if (!context) throw new Error("useFrameMotion must be used inside FrameMotion.");
  return context;
}

export function FrameMotion({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, reducedMotionSnapshot, reducedMotionOnServer);
  const finePointer = useSyncExternalStore(subscribeToFinePointer, finePointerSnapshot, finePointerOnServer);
  const [paused, setPaused] = useState(false);
  const motionEnabled = !reducedMotion && !paused;
  const toggleMotion = useCallback(() => {
    if (!reducedMotion) setPaused((value) => !value);
  }, [reducedMotion]);
  const context = useMemo(() => ({ motionEnabled, reducedMotion, toggleMotion }), [motionEnabled, reducedMotion, toggleMotion]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const scenes = [...wrapper.querySelectorAll<HTMLElement>("[data-frame-scene]")];
    const stickies = [...wrapper.querySelectorAll<HTMLElement>("[data-frame-sticky]")];
    const pointers = [...wrapper.querySelectorAll<HTMLElement>("[data-frame-pointer]")];
    const reveals = [...wrapper.querySelectorAll<HTMLElement>("[data-frame-reveal]")];
    const resetVariables = () => {
      scenes.forEach((element) => element.style.removeProperty("--scene"));
      stickies.forEach((element) => element.style.removeProperty("--travel"));
      pointers.forEach((element) => {
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      });
    };

    if (!motionEnabled) {
      resetVariables();
      return;
    }

    let disposed = false;
    let raf = 0;
    let geometryDirty = true;
    let scrollDirty = true;
    const geometry = new Map<HTMLElement, { top: number; height: number }>();
    const writtenValues = new Map<HTMLElement, Map<string, string>>();
    const pointerPositions = new Map<HTMLElement, { x: number; y: number } | null>();
    const pointerCleanups: (() => void)[] = [];

    function write(element: HTMLElement, property: string, value: number) {
      const text = value.toFixed(5);
      let previous = writtenValues.get(element);
      if (!previous) {
        previous = new Map();
        writtenValues.set(element, previous);
      }
      if (previous.get(property) === text) return;
      previous.set(property, text);
      element.style.setProperty(property, text);
    }

    function flush() {
      raf = 0;
      if (disposed) return;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const writes: [HTMLElement, string, number][] = [];

      // Read geometry before applying styles. Stable scene wrappers need no
      // layout reads during ordinary scroll; resize/content changes invalidate.
      if (geometryDirty) {
        scenes.forEach((element) => {
          const rect = element.getBoundingClientRect();
          geometry.set(element, { top: rect.top + scrollY, height: rect.height });
        });
      }
      if (scrollDirty || geometryDirty) {
        scenes.forEach((element) => {
          const bounds = geometry.get(element);
          if (!bounds) return;
          const top = bounds.top - scrollY;
          writes.push([element, "--scene", clamp((viewportHeight - top) / Math.max(1, viewportHeight + bounds.height))]);
        });
        // Read sticky coordinates live: a marker may itself be position:sticky.
        stickies.forEach((element) => {
          const rect = element.getBoundingClientRect();
          writes.push([element, "--travel", clamp(-rect.top / Math.max(1, rect.height - viewportHeight))]);
        });
      }
      pointerPositions.forEach((point, element) => {
        if (!point) {
          writes.push([element, "--pointer-x", 0], [element, "--pointer-y", 0]);
          return;
        }
        const rect = element.getBoundingClientRect();
        writes.push(
          [element, "--pointer-x", clamp(((point.x - rect.left) / Math.max(1, rect.width)) * 2 - 1, -1, 1)],
          [element, "--pointer-y", clamp(((point.y - rect.top) / Math.max(1, rect.height)) * 2 - 1, -1, 1)],
        );
      });

      geometryDirty = false;
      scrollDirty = false;
      pointerPositions.clear();
      writes.forEach(([element, property, value]) => write(element, property, value));
    }

    function schedule() {
      if (!disposed && !raf) raf = window.requestAnimationFrame(flush);
    }
    function onScroll() {
      scrollDirty = true;
      schedule();
    }
    function onResize() {
      geometryDirty = true;
      scrollDirty = true;
      schedule();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
    resizeObserver?.observe(wrapper);
    scenes.forEach((element) => resizeObserver?.observe(element));
    stickies.forEach((element) => resizeObserver?.observe(element));

    const revealObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.visible = "true";
        revealObserver?.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((element) => {
      if (element.dataset.visible === "true") return;
      if (revealObserver) revealObserver.observe(element);
      else element.dataset.visible = "true";
    });

    if (finePointer) {
      pointers.forEach((element) => {
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          pointerPositions.set(element, { x: event.clientX, y: event.clientY });
          schedule();
        };
        const leave = () => {
          pointerPositions.set(element, null);
          schedule();
        };
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", leave, { passive: true });
        element.addEventListener("pointercancel", leave, { passive: true });
        pointerCleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          element.removeEventListener("pointercancel", leave);
        });
      });
    }

    // Fonts may settle after the initial measurement without a window resize.
    void document.fonts?.ready.then(() => { if (!disposed) onResize(); });
    schedule();

    return () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      revealObserver?.disconnect();
      pointerCleanups.forEach((cleanup) => cleanup());
      pointerPositions.clear();
      resetVariables();
    };
  }, [motionEnabled, finePointer]);

  return <FrameMotionContext.Provider value={context}>
    <div className="frame-motion" ref={wrapperRef} data-motion={motionEnabled ? "on" : "off"}>
      {children}
    </div>
  </FrameMotionContext.Provider>;
}
