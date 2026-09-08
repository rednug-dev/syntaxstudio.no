# Syntax technical baseline — September 2026 continuation

Source inspection on 7 September 2026, before this continuation's implementation. This is a baseline for structural redesign, not a fresh build, browser, production or Core Web Vitals certification. Existing staged and unstaged work was preserved. No source files, dependencies or running servers were changed. No browser automation, Playwright, SMTP submission or external deployment was performed.

## Foundations to retain

- Active application: root `src/`, Next.js 15.3.8 App Router, TypeScript, React 18.3.1 declaration, next-intl, Next Image, CSS/Tailwind and existing Radix components. The nested `syntaxstudio.no/` is an older separate implementation excluded from TypeScript; do not accidentally build the redesign there.
- Norwegian default uses unprefixed URLs; English uses `/en`. `src/i18n/routing.ts` and the middleware own this. Header language links preserve the query string, including selected practice. Use `@/i18n/navigation` for internal links.
- Main templates already exist: homepage, work index, shared project story, studio and contact. The hero and practice interaction are concentrated in `src/components/house/composition.tsx`; this can be replaced without replacing routing or the contact action.
- Supplied Syntax artwork is used directly. Warm paper, brown and blue are CSS tokens in `src/app/house.css`. DM Sans is loaded through `next/font`; Inter/Space Grotesk remain available for legacy surfaces with preload disabled.
- Current pages provide a main landmark, skip destination, semantic headings, visible focus, button states and reduced-motion CSS. The contact form has accessible labels, native constraints, server validation, focused feedback and direct email fallback.
- `Film` deliberately emits only a poster/button before activation. Explicit playback introduces native controls and focus, pauses offscreen or when the tab hides, and provides an MP4 fallback on media error. Retain these loading and user-control qualities when making motion more ambitious.

## Protected URL map

These are existing search destinations, independent of whether the redesigned navigation gives them prominence.

| Routes | Current policy to preserve |
| --- | --- |
| `/`, `/work`, `/studio`, `/contact`, `/work/burger`, `/work/snatched` | Published core; English equivalent for each |
| `/services/{marketing,photo,video,web,social-media}` | Retained bilingual service detail pages |
| `/guides/hva-koster-nettside-norge` | Retained bilingual guide |
| `/blog` and ten post slugs in `src/lib/blog-data.ts` | Norwegian archive only; `/en/blog` and article variants redirect to Norwegian |
| `/work/tokyo`, `/en/work/tokyo` | Honest holding pages, HTTP 200 with noindex; excluded from sitemap and published project list |
| `/about-us` → `/studio`; `/book` and `/pricing` → `/contact`; `/services` → `/work` | Permanent redirects, including English equivalents |
| `/work/fcr` → `/work` | Removed case; English equivalent retained |
| `/work/jonk` → `/work/burger` | Anonymised case migration; English equivalent retained |
| `/blog/ostbanehallen-westerlin-bjorndalen` → `/blog/eventproduksjon-ostbanehallen` | Anonymised archive rename |
| `/blog/samarbeid-med-jonk` → `/blog` | Withdrawn article |
| `/no`, `/no/:path*` | Permanent normalization to unprefixed Norwegian |

All redirects live in `next.config.ts`. The generic English blog redirect appears before the specific withdrawn article redirect: the English withdrawn article currently takes two hops. That is a cleanup opportunity, not a reason to remove the destination. Preserve incoming query strings.

The ten retained blog slugs are `syntax-studio-as-stiftet`, `eventproduksjon-ostbanehallen`, `velkommen-til-bloggen`, `seo-grunnleggende-2026`, `naar-trenger-du-ny-nettside`, `produktfoto-som-selger`, `vipps-eller-stripe`, `tiktok-for-norske-bedrifter`, `syntax-studio-stiftet`, and `hva-koster-en-reklamefilm`.

## Content trust and portfolio limits

- `src/lib/house-content.ts` currently publishes two cases: the anonymised burger campaign and Snatched. Burger is the complete real photography/film/graphic-design case. Do not recover withdrawn identifying assets or names from history or the private archive.
- Snatched has sourced pitch-film scope and a supplied logo; its actual film/stills are absent from the active Syntax project. Its story deliberately avoids an invented screening, testimonial or investor outcome.
- Tokyo is self-produced editorial material in older copy, with no publishable media in the active Syntax tree. It must not become a fabricated client commission.
- Nyfane currently has no published digital case in the Syntax content list; the work filter gives a truthful empty state and contact path. The sibling repository audit can supply stronger evidence, but repository assets need identifiable project scope and approved publication context before becoming a Syntax client case.
- Existing project practice tags describe relevance under today's practice model, **not historical production credits**. Syntax Studio remains the documented production credit. Preserve this distinction when showing ISO400 + 35mm attribution.
- Gunder → ISO400, Khamzat → 35mm and Rasul → Nyfane are recorded as confirmed in the existing audit and implemented founder content. Portraits and direct contacts exist. Do not infer biographies or achievements from the old CEO/CMO labels.
- Practice website variables accept HTTPS or fall back to an internal practice enquiry. No public specialist domain is established by the active Syntax configuration. Do not invent destinations.

## Technical gaps relevant to this redesign

| Finding | Consequence and bounded action |
| --- | --- |
| The current homepage directly presents three practice rooms, literal door interaction and several repeated burger images. | This is the structure the new brief rejects. Keep the useful media, controls and semantic foundations; replace the composition and sequence after the ecosystem/reference phases. |
| Project model accepts `syntax` in `practices`, but `getPractice('syntax')` returns nothing and project contact links silently omit it. | Give parent-house attribution an explicit label/path instead of treating Syntax as a fourth specialist practice. |
| Project model has optional `location` and `results`, but shared story renders neither; it shows only the first valid related case. | Implement only the editorial blocks actually needed; make supported fields visible deliberately rather than promising a flexible CMS that silently ignores data. |
| `ProjectMedia` has one optional-poster shape for image/film/logo. A film with no poster can fall through to a blank Next Image source; a film hero without poster can be passed as an image in work/next-project previews. | Use a discriminated union with a required poster/thumbnail for film and a shared preview helper. This is a real correctness gap before importing new films. |
| No caption-track, transcript, audio description or aspect/crop variant fields exist. | Add optional accessibility and responsive crop fields where actual media needs them. Inspect audio before claiming any film needs or lacks spoken captions. |
| Hero/film `sizes` values are hardcoded across different contexts. | Recalculate for the selected composition; the present Film defaults to `70vw` on desktop even inside smaller bays. Keep intrinsic dimensions and avoid loading multiple first-viewport hero candidates eagerly. |
| Images/fonts/videos receive one-year immutable caching even for stable filenames. | Version replacement assets or revise cache policy, so a replaced mark/poster cannot remain stale under the same public URL. |
| The large work/translation registries are imported by client components; the layout sends all locale messages to the provider. | Narrow client boundaries as composition grows. Keep large content and static narrative on the server and send the interaction only its needed data. Measure emitted chunks before adding heavier motion libraries. |
| Canonicals and social metadata are implemented on core pages; archive titles sometimes already include `Syntax Studio` under a layout title template. | Check the final rendered titles for duplicate brand suffixes when doing the SEO pass; preserve canonicals and no/en/x-default alternates. |
| Organization and ProfessionalService schema are separate objects; only the latter has an `@id`. | Stable IDs and linked references would make future shared-brand schema clearer. Do not invent legal subsidiary relationships, awards, reviews or founding dates. |
| `robots.ts` excludes `/api/` for `*`, but named crawler groups explicitly allow everything. | If the API exclusion is intended for every crawler, repeat it in named groups or use one shared rule. Robots is discovery guidance, not access control. |
| Legacy service/archive copy remains indexable and contains old role labels, competitive claims and time-sensitive commercial promises. | Preserve routes while auditing copy. Example: video service still calls Khamzat marketing director and “among the most sought-after”; Østbanehallen post is dated 10 April while describing 11–18 April retrospectively. Do not promote those claims into the new homepage. |
| Contact delivery is real Zoho SMTP with honeypot, length limits, escaped HTML and timeouts; it has no explicit application rate limiter. | Preserve the existing validated action. Only add rate limits if needed by observed deployment requirements; visual QA must not submit real mail. Delivery remains unverified without an authorized receipt check. |

## Flexible shared content without a platform rewrite

The source-controlled TypeScript registry is sufficient for this iteration. Separate reusable content facts from brand presentation so a future CMS can populate the same types:

1. Keep stable project IDs/slugs, localized title/summary/context, client, optional verified year/location, relevant practices, distinct actual production credits, related IDs and SEO fields.
2. Use `image`, `film`, and `interactive-capture` media variants. Images need width/height/alt and optional focal/crop variants. Films need a poster, dimensions, playable source and optional tracks/transcript. Interactive captures need an honest title/scope, poster or capture, and optional verified public URL; an internal experiment must say it is an experiment.
3. Use editorial block variants for statement/context, single full-width media, asymmetric media pairs, vertical sequences, browser/device capture, credits, sourced result and approved quote. Let photography, film and web projects choose different block sequences.
4. Store source/provenance and publication status with claims/assets; leave unavailable facts absent. Keep unpublished media outside `public/`, and publish no internal repository configuration, client data or credentials.
5. Let Syntax curate combinations while each practice selects its own sequence/crops/theme. Shared content does not require shared page layouts.

## Verification handoff

The earlier Open House report records 459/459 local HTTP checks and 35 sitemap routes. Those results belong to that earlier artifact and must not be presented as certification of the new work. `scripts/verify-rebrand.mjs` is a useful reusable read-only baseline: localized metadata, initial JSON-LD, legacy redirects, sitemap, link/asset availability, no initial video fetch markup, 404/noindex handling and complete generated social-image bodies. Extend its route/media expectations only when the new implementation changes them intentionally.

After implementation, run the project's lint, typecheck and production build; then one bounded HTTP pass against that artifact. Use the in-app browser for desktop/mobile layout, keyboard, focus, reduced motion, deliberate playback, filters, language/query preservation and contact validation without mail delivery. Add measured transfer/CWV evidence if claiming performance. Do not confuse HTTP availability with visual quality, hydrated interaction, caption adequacy, real-device testing or field performance.
