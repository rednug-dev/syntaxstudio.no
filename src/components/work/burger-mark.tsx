import { cn } from "@/lib/utils";

/*
 * Mark for the de-identified burger case. The client is anonymised, so the card
 * has no wordmark to show — this is our own geometry standing in for one.
 * Deliberately generic and drawn here, so there is nothing to license and no
 * icon font to load. Colour comes from currentColor; size from the caller.
 */

/** Bun, cheese, patty, base. Sesame seeds are punched out via evenodd so the
 *  mark sits on any background. */
export function BurgerMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 54" aria-hidden className={className} style={style}>
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 24C6 11.8 17.6 2 32 2s26 9.8 26 22H6Z
             M22 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z
             M32 18.4a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z
             M42.5 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z"
        />
        <rect x="7.5" y="26.5" width="49" height="5.4" rx="2.7" opacity="0.55" />
        <rect x="3" y="34" width="58" height="7.6" rx="3.8" />
        <path d="M6 44h52v2.6c0 3.5-2.9 6.4-6.4 6.4H12.4A6.4 6.4 0 0 1 6 46.6V44Z" />
      </g>
    </svg>
  );
}
