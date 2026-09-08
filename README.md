# Syntax Studio

The bilingual website for Syntax, an independent creative house in Oslo: ISO400 for image and design, 35mm for film and VFX, and Nyfane for technology. Built with Next.js App Router, TypeScript and next-intl. Norwegian uses root URLs; English uses `/en`.

The current site implements **In relation**: the supplied Syntax identity at architectural scale, followed immediately by real photography, film and a website study in one changing composition. A labeled range and preset buttons change the relationship between those media. The warm paper, deep brown, pale blue, DM Sans and three-practice architecture continue the existing identity; the former literal Open House layout has been replaced.

This structure was selected from four studies under the user's request to audit the ecosystem, research references and choose the strongest structure within the same brand world. It is not a separate new brand or a claim of additional user approval. See the [structural comparison](docs/rebrand/structural-exploration-2026-09.md) and [current surface brief](docs/rebrand/surface-brief.md).

## Run locally

Use Node.js 20 or later and the checked-in npm lockfile.

```powershell
npm ci
if (-not (Test-Path -LiteralPath .env.local)) {
  Copy-Item -LiteralPath .env.example -Destination .env.local
}
npm run dev -- --port 3015
```

The environment example is copied only when creating a new local environment. The site renders without mail credentials; configure them when actual email delivery is needed. The development example serves [localhost:3015](http://localhost:3015).

For a separate production preview, use another terminal. Set the distribution directory before both the build and server start so development and production do not share generated files:

```powershell
npm run lint
npm run typecheck
$env:NEXT_DIST_DIR = '.next-production'
npm run build
npm run start -- --port 3018
```

With the production server running in another terminal:

```powershell
node scripts/verify-rebrand.mjs --base-url http://localhost:3018 --report docs/rebrand/in-relation-http.json
```

The verification script uses native HTTP requests. It checks core pages, metadata, initial JSON-LD, media loading markup, assets, internal links, redirects, sitemap routes and fallback behavior. Generated social images are downloaded and checked for a complete PNG with the expected dimensions. It never submits the contact form. The current production preview is [localhost:3018](http://localhost:3018); pass the URL explicitly because the script's retained default is port 3016. `VERIFY_BASE_URL` is also supported.

To inspect the four structural prototypes, keep the development build available and run this in another terminal:

```powershell
node scripts/preview-structures.mjs
```

Open [localhost:3017](http://localhost:3017). The helper serves `docs/rebrand/structures.html`, the comparison rationale, real public assets and DM Sans from the development build. It also provides a local responsive-review frame targeting the production preview on port 3018, or C on port 3020 with `preview=c`. These are local design studies, not public application routes.

## Additional option C exploration

The requested **From frame to frame** alternative is available at `/en/explore/frame-to-frame` and `/explore/frame-to-frame`. It has a photographic registration entrance, a native-scroll campaign sequence and an interactive format composition study. The In relation homepage remains the primary surface. C is noindex and excluded from the public sitemap.

To keep both production previews available, build and start C in its own terminal:

```powershell
$env:NEXT_DIST_DIR = '.next-option-c'
npm run build
npm run start -- --port 3020
```

Run `node scripts/verify-option-c.mjs` against that server. The structural comparison on port 3017 links to the working C page. Its local responsive harness accepts `preview=c` to inspect C on port 3020 while the default harness keeps pointing to A on port 3018. See [C's surface brief](docs/rebrand/option-c-surface-brief.md) and [verification](docs/rebrand/option-c-verification.md).

## Environment

| Variable | Purpose |
| --- | --- |
| `ZOHO_EMAIL` | Server-only authenticated sender for the existing Zoho EU SMTP transport. Required for form delivery. |
| `ZOHO_APP_PASSWORD` | Server-only SMTP app password. Required for form delivery. |
| `MAIL_FROM_NAME` | Optional sender display name; defaults to `Syntax`. |
| `SALES_INBOX` | Optional recipient; defaults to `info@syntaxstudio.no`. |
| `NEXT_PUBLIC_ISO400_URL` | Optional confirmed HTTPS website for ISO400. |
| `NEXT_PUBLIC_35MM_URL` | Optional confirmed HTTPS website for 35mm. |
| `NEXT_PUBLIC_NYFANE_URL` | Optional confirmed HTTPS website for Nyfane. |

Practice domains have not been confirmed. Leave their values blank until supplied. Missing, malformed or non-HTTPS URLs fall back to the internal contact page with the relevant practice selected. Public variables are included at build time, so rebuild after changing them. Keep real credentials in local or hosting environment settings; `.env.example` contains no secrets.

The form action in `src/actions.tsx` validates localized input, checks a honeypot, escapes user content in the HTML email and sends through `smtp.zoho.eu:465` using TLS. The sender remains the authenticated mailbox, and the visitor is set as Reply-To. A practice changes the inquiry label, while `SALES_INBOX` controls the actual recipient. Missing credentials or transport failure produce a visible error and a direct email alternative. No real email was sent during rebrand verification.

## Update content

The shared typed model is in `src/lib/house-content.ts`. It is source-controlled content, with a structure that can later be supplied by a shared CMS. No CMS service, editor or synchronization has been implemented.

| Content | Edit location |
| --- | --- |
| Practice names, founders, disciplines, capabilities and destination links | `practices` in `src/lib/house-content.ts` |
| Project copy, kind, creator, status, provenance, discipline relevance, media, credits, related work and SEO | `projects` in `src/lib/house-content.ts` |
| Shared project route generation and editorial rendering | `src/app/[locale]/work/[slug]/page.tsx` and `src/components/house/project-story.tsx` |
| Founder portraits and visible founder presentation | `src/components/house/founders.tsx` |
| Homepage, studio and contact copy | Corresponding pages in `src/app/[locale]` |
| Header, language navigation and footer | `src/components/header.tsx` and `src/components/footer.tsx` |
| Site-wide metadata, contact structured data and social accounts | `src/app/[locale]/layout.tsx` |
| Social preview artwork | `src/app/[locale]/opengraph-image.tsx` |
| Shared house styling and interactive media | `src/app/house.css` and `src/components/house` |
| Retained service, guide and blog articles | `src/lib/services-data.ts`, `src/lib/guides-data.ts`, `src/lib/blog-data.ts` |
| Search discovery and historical URLs | `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts` |

Every `LocalizedText` needs `no` and `en` values. A project has a stable slug, title, `kind`, credited `creatorPractice`, public `provenance`, practice and discipline associations, summary, description, hero, media blocks, credits, related slugs and localized SEO. Client, year, location and development status are optional. Supported kinds are `commission`, `portfolio-selection` and `studio-study`; `status: "in-development"` identifies a visible development study.

Media supports images, logos, films and interface captures with translated alt text and real dimensions. Films require a real poster and playable source. Editorial blocks support text, media, image pairs and sourced quotes. Results and quotes require source information. The registry is public content: a development label does not hide a record or remove it from the sitemap.

To add a project:

1. Add approved assets under `public/`, and record their provenance in `docs/rebrand/asset-provenance.md`. Use a new filename when replacing an asset because public media is served with a long immutable cache lifetime.
2. Add its complete bilingual `HouseProject` record. Leave unknown dates, results and facts absent. Results require a source.
3. New case routes are generated from the registry by `src/app/[locale]/work/[slug]/page.tsx`, using shared `ProjectStory` / `projectMetadata`. Do not add a dedicated wrapper unless the case needs distinct routing. Existing burger/Snatched wrappers and the Tokyo holding route are retained separately.
4. The sitemap includes registered project routes automatically. Update related slugs and check both language versions, provenance labels, creator attribution and social preview. Keep material that is not ready to be publicly presented out of the registry.
5. Run lint, typecheck, a production build and the HTTP checks. Review the page at mobile and desktop sizes and test its keyboard interactions.

The registry currently contains four projects:

| Project | Record type and factual boundary |
| --- | --- |
| Burger campaign (`burger`) | Existing anonymized commission, historically produced by Syntax Studio. ISO400/35mm tags describe relevant disciplines. |
| Snatched (`snatched`) | Existing Syntax Studio commission with sourced text and a real client logo. The actual film, approved still/poster and caption files remain missing. |
| Street portraits (`iso400-street-portraits`) | Two actual ISO400 portfolio photographs, presented as an image study. Client and year are unestablished and omitted. |
| Nyfane website study (`nyfane-website-study`) | Nyfane's own implemented website, explicitly a self-initiated studio project in development. The real local capture supplies digital design evidence, without claiming a public launch or external commission. |

Practice relevance and credited creator are separate. New study records do not rewrite historical Syntax production credits or turn the burger campaign into an all-practice commission. Nyfane's fictional development clients, testimonials and performance claims were not imported. Tokyo remains a noindex holding page outside the registry and sitemap until its media and story are available. A final 35mm logo, verified practice domains and an externally commissioned Nyfane case remain outstanding.

## Routes and operations

The primary routes are `/`, `/work`, `/studio`, `/contact` and the four registered `/work/<slug>` cases, with English equivalents under `/en`. Existing service detail, guide and Norwegian blog URLs remain accessible. Historical overview and removed project URLs redirect through `next.config.ts`; do not remove those mappings casually. English blog URLs redirect to the available Norwegian articles.

Vercel Analytics and Speed Insights remain mounted in the shared layout. Their `/_vercel/` scripts require the corresponding enabled deployment platform and do not load on the plain local Next server. The broken legacy Google Ads/Iubenda setup was removed during the rebrand after a runtime error was observed. Reintroduce those integrations only with verified account identifiers and a working consent configuration. This work did not deploy the site or change external service accounts.

Before a production release, configure the host environment, run the production checks, confirm the intended mail recipient and arrange an authorized delivery test. Actual mailbox delivery, complete dialogue captions/transcripts, field Core Web Vitals, throttled performance and real-device behavior have not been established by the local checks. The [current verification report](docs/rebrand/in-relation-verification.md) records what was actually checked and its remaining limits; earlier reports do not certify the current structure.

## Project documentation

- [PRODUCT.md](PRODUCT.md) — audience, positioning and factual constraints.
- [DESIGN.md](DESIGN.md) — current In relation identity, composition and motion contract.
- [Current surface brief](docs/rebrand/surface-brief.md) — homepage behavior, responsive intent and evidence boundaries.
- [Ecosystem audit](docs/rebrand/ecosystem-audit-2026-09.md) — ISO400, 35mm, Nyfane and the distinct parent territory.
- [Current reference study](docs/rebrand/reference-study-2026-09.md) — contemporary studio references, useful principles and the opportunity for Syntax.
- [Structural comparison](docs/rebrand/structural-exploration-2026-09.md) and [four visual studies](docs/rebrand/structures.html) — the alternatives and selection rationale; serve the studies through port 3017.
- [Asset provenance](docs/rebrand/asset-provenance.md) — source files, derived media, attribution and publishing gaps.
- [Original content audit](docs/rebrand/content-and-technical-audit.md) and [September technical baseline](docs/rebrand/technical-baseline-2026-09.md) — historical evidence with dated updates where appropriate.
- [In relation verification](docs/rebrand/in-relation-verification.md) and [HTTP results](docs/rebrand/in-relation-http.json) — current implementation checks and limits.
- [Earlier strategy](docs/rebrand/strategy-and-directions.md), [Open House verification](docs/rebrand/open-house-verification.md) and [earlier technical verification](docs/rebrand/technical-verification.md) — historical records, retained for context rather than current design authority.
