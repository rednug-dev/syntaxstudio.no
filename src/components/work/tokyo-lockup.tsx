import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Syntax × Tokyo mark — a torii gate silhouetted against a hinomaru sun.
 * Pure geometry + the repo's own logo, so there is nothing to license and
 * no extra web font to load.
 */

/** Vermilion 朱 — the one splash of colour on an otherwise monochrome site. */
export const AKA = "#e0483d";
export const AKA_HOVER = "#c73a2c";

/**
 * System mincho stack. The site loads no serif, so kanji set as display type
 * fall back to whatever brush-serif the reader's OS ships.
 */
export const MINCHO =
  '"Yu Mincho","YuMincho","Hiragino Mincho ProN","Noto Serif JP","Songti SC","SimSun",serif';

/** The torii itself. Sized by the caller; inherits colour via currentColor. */
export function Torii({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden className={className} style={style}>
      <g fill="currentColor">
        <path d="M8 26 Q60 16 112 26 L112 34 Q60 25 8 34 Z" />
        <rect x="16" y="35" width="88" height="6" />
        <rect x="30" y="34" width="10" height="58" />
        <rect x="80" y="34" width="10" height="58" />
        <rect x="24" y="53" width="72" height="8" />
        <rect x="56" y="41" width="8" height="12" />
      </g>
    </svg>
  );
}

/**
 * Torii over a breathing hinomaru. `scale` is a multiplier on the design's
 * 78×56 mark so the same lockup can serve a 340px card and a 56px hero tile.
 */
export function ToriiSun({
  scale = 1,
  breathe = true,
  className,
}: {
  scale?: number;
  breathe?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: 78 * scale, height: 56 * scale }}
    >
      <div
        aria-hidden
        className={cn(
          "absolute left-1/2 -translate-x-1/2 rounded-full",
          breathe && "animate-sunbreath"
        )}
        style={{
          top: 2 * scale,
          width: 44 * scale,
          height: 44 * scale,
          background: `radial-gradient(circle at 50% 42%, #ef5d4f, ${AKA} 72%)`,
          boxShadow: `0 0 ${24 * scale}px ${-5 * scale}px rgba(224,72,61,.8)`,
        }}
      />
      <Torii
        className="relative text-white"
        style={{
          width: 74 * scale,
          height: 62 * scale,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,.5))",
        }}
      />
    </div>
  );
}

/** Full lockup: the mark above a `logo × 東京` wordmark row. */
export function TokyoLockup({
  scale = 1,
  breathe = true,
  className,
}: {
  scale?: number;
  breathe?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-[9px]", className)}>
      <ToriiSun scale={scale} breathe={breathe} />
      <div className="flex items-center gap-2.5">
        <Image
          src="/logos/syntaxnylogoutenundertekst.svg"
          alt="Syntax Studio"
          width={663}
          height={138}
          className="w-auto brightness-0 invert"
          style={{ height: 15 * scale }}
        />
        <span
          className="font-headline text-white/[0.34]"
          style={{ fontSize: 11 * scale }}
        >
          ×
        </span>
        <span
          className="font-bold leading-none text-white"
          style={{ fontSize: 17 * scale, fontFamily: MINCHO }}
        >
          東京
        </span>
      </div>
    </div>
  );
}
