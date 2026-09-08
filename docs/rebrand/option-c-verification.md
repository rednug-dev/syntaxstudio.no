# Option C — From frame to frame

Additional exploration requested 7 September 2026, after In relation. C is a complete bilingual homepage alternative; A remains available. This is a local preview, not a live deployment or a replacement of the selected homepage.

## What changes

Real work owns the first screen. Clipped regions of the same campaign photograph register into one image, with the original still visible beneath and the whole Syntax mark intact. The desktop scroll sequence moves between a photographic assembly, explicit-play film and finished campaign artwork. The portrait episode leads into a format composition study and Nyfane's separately attributed website capture. A native specialist selector changes its supporting image through an exposure wipe. Actual founders and direct contact finish the page.

Palette, DM Sans, artwork, actual credits and existing cases remain. The composition study uses existing campaign assets and is labeled as a Syntax study; it is not claimed as a historic Nyfane deliverable. Media provenance is unchanged. See [the surface brief](option-c-surface-brief.md) and [initial motion direction](option-c-motion-direction.md).

## Review findings and corrections

The first combined desktop/mobile review confirmed that the photographic registration runs and resolves, native scroll drives the shared scene, and the portrait crop, practice selector and motion control respond. Independent creative review retained the direction and requested earlier portrait imagery plus a meaningful layout change in the technology interaction. The final batch:

- Constrains the film to its own frame instead of inheriting an aspect ratio that calculated an overflowing width from its height.
- Keeps C's logo, Work and Practices links in the exploration; the normal Header defaults remain unchanged for A and other pages.
- Brings the portrait images higher by reducing top spacing and title height.
- Replaces simple screenshot sizing with Portrait/Square/Wide composition states that change real media proportions, crop and typography, keeping Nyfane's own site capture separate.
- Extends Motion off to smooth scrolling and pseudo-element transitions. System reduced motion wins over the local control, and the control explains that state.

## Verification scope

The production artifact uses `.next-option-c` on port 3020, separate from A's `.next-production` preview on 3018. The native HTTP verification script is [verify-option-c.mjs](../../scripts/verify-option-c.mjs); it checks localized routes, noindex, canonical homes, no initially mounted videos, static fallback, truthful study/creator labels, local navigation, image availability, sitemap exclusion and A's retained default markup. Results are recorded in [option-c-http.json](option-c-http.json).

In-app browser QA uses native screenshots plus a local iframe harness for exact CSS widths. Early desktop and phone captures are [opening desktop](qa/option-c-desktop-opening.png), [opening phone](qa/option-c-mobile-opening.png) and [registration in motion](qa/option-c-registration-in-motion.png). The first reflow report intentionally retains the film overflow finding; it is not final passing evidence. Full-page stitched captures are not used to certify layout.

The implementation uses a shared event-gated animation frame, cached scene geometry, passive native scrolling, cleaned-up listeners/observers and fine-pointer-only offsets. It adds no motion library or WebGL dependency. Finite entrance animation stops at rest. Films remain click-to-load with native controls and contain framing. Static HTML and reduced-motion layouts retain the work and controls.

## Final confirmation

- Production build passes with 41 generated pages, including both C locales. C reports 6.01 kB route code and 219 kB first-load JavaScript; A reports 216 kB. These are build output sizes, not runtime performance measurements.
- ESLint, TypeScript and the 45 native HTTP checks pass. The verifier normalizes root canonical URLs before comparing them.
- [Final reflow measurements](qa/option-c-final-reflow.json) cover both languages at 375, 390, 430, 768, 1024, 1440 and 2560 CSS pixels, plus 844 × 390 landscape. No document horizontal overflow, sampled heading/control escape, or composition text overflow was found. Film width matches its container throughout. Native scrollbars reduce the content width within these viewport sizes.
- Norwegian measurements use the native language selector before reading the rendered locale, because the browser preview retains its language preference. Switching language preserves the C route.
- Explicit desktop play loads the actual local campaign video, advances playback and exposes native controls with `object-fit: contain`. Leaving the scene pauses it. The phone playback frame and controls stay inside their composition. See [desktop film](qa/option-c-final-film-desktop.png) and [phone film](qa/option-c-final-film-mobile-frame.png).
- Native Portrait, Square and Wide buttons change the composition and pressed state on desktop and phone. The artwork retains contain framing; portrait typography fits its available width. See [wide desktop](qa/option-c-final-format-wide-desktop.png), [square desktop](qa/option-c-final-format-square-desktop.png) and [wide phone](qa/option-c-final-format-wide-mobile-frame.png).
- Motion off reports `data-motion=off`, hides the entrance slices and changes the document's smooth scrolling to `auto`. System reduced-motion precedence is implemented and source-reviewed; an operating-system preference override was not exercised in this browser session.
- The independent final creative confirmation retained C with no material blockers. [Earlier portrait entry](qa/option-c-final-portrait-entry.png) and the meaningful format recomposition resolve the two creative findings. No further polish round was opened.

Local visual review and source/HTTP checks do not establish physical-device frame rate, cross-browser certification, real assistive-technology use or field Core Web Vitals. Film caption needs, SMTP delivery and public specialist domains retain the earlier documented limits. No real messages were sent.
