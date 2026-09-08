# Open House implementation verification

The selected Open House implementation passed **459/459 checks, zero failures**, against `http://localhost:3016` on 7 September 2026 at 01:18 Oslo time (6 September, 23:18 UTC), after the final project-link accessibility correction. This verifies the new implementation separately from the earlier direction. Full results: `docs/rebrand/open-house-http.json`.

The main implementation agent reported the final production build, lint and type validation passing, with 35 generated routes, and a clean `git diff --check`.

| HTTP coverage | Result |
| --- | --- |
| Bilingual core pages | 12 pages: HTTP 200, one H1, main landmark and skip target. |
| SEO | Localized canonicals, language alternates, social metadata and valid initial JSON-LD passed. |
| Discovery and navigation | All 35 sitemap routes, 29 internal destinations and 20 permanent redirect scenarios passed; robots and unknown-route 404 checks passed. |
| Assets and playback markup | 55 assets available; original ISO400/Nyfane marks included. No initial video/source elements or video preload before a play action. |
| Generated social images | Four emitted image URLs downloaded successfully as PNGs at 1200 × 630: eight signature/dimension assertions passed. |
| Held content | Tokyo remains noindex and outside the sitemap. |

An initial full-image GET exposed a Satori error that HEAD requests missed: `alignItems: 'end'`. The implementation now uses `flex-end`. The existing verifier was strengthened to download generated images and inspect their PNG signature and dimensions. The final rerun passed. The actual Norwegian preview is saved at `.impeccable/review/open-house/opengraph-no.png` (38,942 bytes) for the main agent's visual inspection.

Source inspection confirmed semantic door, accordion, menu and playback controls; explicit hidden-state rules; reduced-motion transitions disabled; direct practice contact independent of the door; supplied practice artwork; and retained localized routing and structured data. Interactive and visual review belongs to the main agent's in-app browser pass. This verification used no browser or Playwright tools.

The main agent's in-app browser review confirmed contact and work query preservation when changing language, mobile menu Escape dismissal with focus return, empty-form validation without submission, door and accordion states, and named project links. The final accessibility correction links each work-list link to its project heading with `aria-labelledby`; the accessibility snapshot then exposed both project names. These checks do not establish physical-device or screen-reader testing.

No deployment or real email was sent. SMTP delivery, physical devices, throttled performance, field Core Web Vitals and Vercel-hosted analytics operation remain outside these local checks. Existing factual limits remain: practice domains and final 35mm artwork await confirmation; unavailable case media is not invented.
