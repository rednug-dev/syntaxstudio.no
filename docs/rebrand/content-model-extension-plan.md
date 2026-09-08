# Bounded content extension after structural selection

Prepared on 7 September 2026. This is an implementation plan, not a claim that these cases or routes are already published. Wait for the main agent's structure-selection signal before editing production code.

## Two honest additions

| Entry | Source and presentation |
| --- | --- |
| ISO400 street portraits | The sibling repository's `src/content/site.ts` records “Street portraits”, maps `portrait-01.jpg` and `portrait-02.jpg`, and explicitly has no client/year. Two optimized portraits are now `/work/iso400/street-portrait-01.webp` and `street-portrait-02.webp`, each 1600 × 2400. Safe public wording: “Street portraits / ISO400 — Image study”. Do not invent a commissioned client, location, year, subject biography or individual creator credit. |
| Nyfane website study | A studio study of Nyfane's own implemented website, with actual local website capture `/work/nyfane/website-study.webp`, 1666 × 734, derived from `docs/rebrand/nyfane-hero-source.png`. The capture visibly contains Nyfane's interface, navigation, service message and interactive demo introduction. Safe public wording: “Nyfane — Website study / In development”. Do not relabel it a client product or claim a production release/result. Fictional records in Nyfane's `data/demo-projects.ts` and demo workflow are not client proof. |

Suggested stable new routes: `/work/iso400-street-portraits` and `/work/nyfane-website-study`, plus `/en` equivalents. Their titles and summaries must clearly distinguish portfolio selection/studio study from the existing burger/Snatched commissions.

## Minimal model changes

Extend `src/lib/house-content.ts` rather than introducing a CMS service:

- Add `kind: 'commission' | 'portfolio-selection' | 'studio-study'` and `creatorPractice: ProjectPracticeId`. Existing burger/Snatched use `commission` + `syntax`; ISO400 selection uses `portfolio-selection` + `iso400`; Nyfane study uses `studio-study` + `nyfane` if confirmed by the ecosystem audit.
- Make `client` optional. Add a shared display-name helper using the client when present, otherwise the project title. Studies must never generate a “Client: Nyfane” claim merely because the site carries that name.
- Preserve `practices` as discovery/discipline relevance and `credits` as actual authorship. Render `creatorPractice` as the production/author label; do not infer historic collaborator credits from relevance tags.
- Add a small `provenance` field with localized public source wording and an optional public source URL. Detailed original paths belong in `docs/rebrand/asset-provenance.md`; do not serialize absolute user filesystem paths into the client bundle.
- Split media into an image/logo variant, a film variant with required poster, and `capture` for actual website/interface imagery. The capture variant shares dimensions/alt with images and can hold a localized caption and optional verified public destination. No localhost URL or fictitious live link is published.
- Add a `getMediaPreview()` helper. It returns the poster for films and source for image/logo/capture so new hero media cannot accidentally pass `.mp4` into Next Image.
- Keep year, location, results and quotes absent for the two new entries. Actual creator credit is enough; no inferred project outcomes.

## Rendering and routing

- Project story: show a localized project-type label near the title. Show client only when present. For commissions use the current brief/context voice; for studies/portfolio selections use intent/source wording. Existing burger anonymisation note and historical Syntax production credit remain intact.
- Work index and related links: use the shared display name and media preview; add a discreet project-type label so the new Nyfane thumbnail cannot be mistaken for a commissioned client outcome.
- `capture` should preserve the whole interface at its real aspect ratio, with sufficient readable scale and an honest caption. Do not force it into a portrait crop or fabricated device shell. Image pairs can preserve ISO400's two vertical photographs.
- Add `src/app/[locale]/work/[slug]/page.tsx` for registry-based additions, reusing metadata and project-story rendering. Keep the existing dedicated burger, Snatched and Tokyo routes. Generate static params only for new registry slugs, excluding the existing dedicated slugs, to avoid duplicate prerender targets. Unknown registry slugs must return 404.
- Derive published case entries in the sitemap from the registry so future additions do not require duplicate route lists. Keep the Tokyo holding page out of the published registry and sitemap. Keep existing redirect behavior unchanged.
- Extend project metadata and CreativeWork schema from actual title, creator and imagery. Use canonical/no/en/x-default for each new route. Omit `datePublished`, year, review, client and result claims when unverified. Existing `work-jsonld.ts` has a fabricated default date and is not used by the new shared story; do not reuse that default.

## Boundaries and final checks

Coordinate edits to the shared project renderer/work index with the main agent's chosen visual structure. Content/routing implementation should not independently design another UI direction. Add the new URLs to the existing HTTP verification core set, check accurate localized labels and expected CreativeWork creator, verify captured/image assets, and retain the old redirects. Run the normal build/type/lint sequence only when the main agent is ready; use the in-app browser for rendering and interaction QA. Never send a real enquiry during these checks.
