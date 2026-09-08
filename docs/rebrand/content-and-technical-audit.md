# Syntax Studio: content and technical audit

Audit date: 6 September 2026. This records the working tree before the rebrand implementation. It is a source audit, not a claim that existing copy is independently substantiated or that a live production deployment has been tested. Paths below are relative to the repository root; line references identify the source as inspected and can shift during implementation.

## 1. Strategic implications of the available evidence

The strongest available production material is an anonymised burger campaign: real photography, finished graphic assets and multiple films. The site also describes a Snatched pitch film, but that film is explicitly absent. Tokyo is currently an entirely unfilled media layout. There is no verified, media-complete digital client case in the active source tree.

The new house model is supplied by the user: Syntax connects ISO400 (Image & Design), 35mm (Film & VFX) and Nyfane (Technology). The old source does not yet encode that architecture. Apply the user’s new model to positioning, navigation and capability descriptions, while distinguishing proposed practice categorisation from historic project credits.

The user brief takes precedence over the old `docs/blueprint.md`. That old file is starter guidance about an AI proposal generator and generic marketing presentation; it is not evidence of a current business requirement. The nested `syntaxstudio.no/` folder is a separate old starter implementation, not the active Next.js source. `_archive/branded-source/` is deliberately ignored and non-public.

### Retain, rewrite, remove and reorganise

| Material | Treatment | Reason |
| --- | --- | --- |
| New Syntax identity assets and existing portraits | Retain original files; use optimised delivery assets | Real supplied identity and team evidence |
| Anonymised burger photography and films | Retain and art-direct as the strongest work | Actual media is available and already curated for publication |
| Burger anonymisation and `/work/burger` | Preserve throughout visible copy, metadata and media | Existing changes deliberately remove client identifying details |
| Snatched scope and creative concept | Retain concise factual project story; omit unsupported outcome claims | Existing source documents pitch film, 3D warehouse imagery and motion graphics |
| Snatched absent film and quote | Do not invent or fill with unrelated media | Source explicitly withholds film; quote is a placeholder |
| Tokyo | Treat as an editorial/self-produced entry with clearly limited media status; do not give it a fake hero | Every media surface in current source is a placeholder |
| Service list and full-service claims | Rewrite around three practices and collaboration | Old breadth-led offer conflicts with new brief |
| Client revenue/view counters | Remove from hero; retain only if individually supported and useful in a case | Existing copy alone does not verify the numbers; time qualifiers are stale |
| Founder portraits and names | Retain; replace generic corporate roles with confirmed specialist leadership | The user has confirmed Gunder → ISO400, Khamzat → 35mm and Rasul → Nyfane |
| Booking and direct contact | Keep functional as secondary and primary paths respectively | Existing destinations are known; no need for a new contact system |
| Existing blog and guide content | Retain routes as an archive outside main navigation unless deliberately migrated | Avoid unnecessary loss of useful URLs and their existing search value |
| Social presence widget | Remove from new studio presentation | Discord availability is not needed to explain the founders or assess their work |

## 2. People and contact facts

Primary source: `src/app/[locale]/about-us/page.tsx:33` through the `teamMembers` array. `src/messages/en.json:305` and `src/messages/no.json` contain the displayed translated roles/bios.

| Person | Existing source role | Source-supported territory | Public contact | Available portrait |
| --- | --- | --- | --- | --- |
| Gunder Rollufson | Founder & CEO | Strategy and development; source fallback lists React, Next.js, Node.js and Strategy | `gunder@syntaxstudio.no`; `+47 94 44 33 55` | `/portraits/gunder.webp` |
| Rasul Uzdijev | Partner & Chief Architect | Systems architecture, Python, AI, database | `rasul@syntaxstudio.no`; `+47 46 39 67 97` | `/portraits/rasul.webp` |
| Khamzat Dudaev | Partner & CMO | Filming, editing, marketing and content creation | `khamzat@syntaxstudio.no`; `+47 46 26 48 15` | `/portraits/khamzat-v2.webp` |

The user brief identifies three founders. The existing site labels only Gunder as founder and the others as partners. The supplied new business description can therefore support “three founders”, but do not treat the old job titles as the final organisation chart.

The user subsequently confirmed the practice leadership mapping in this session: **Gunder → ISO400, Khamzat → 35mm, Rasul → Nyfane**. This confirmation supersedes ambiguity in the old source roles and supports the new public founder/practice presentation. No specialist domains were supplied or verified.

`src/lib/services-data.ts:395` describes Khamzat’s experience in Norwegian music videos. This is existing first-party copy, not independent evidence for claims such as “among the most sought-after”. Use the concrete experience only if needed; omit competitive superlatives.

Company/address/contact evidence:

- `src/components/footer.tsx:28`: Heimdalsgata 34B, 0561 Oslo.
- `src/components/footer.tsx:51`: `info@syntaxstudio.no` is the visible general enquiry address.
- `src/components/footer.tsx:54`: `+47 94 44 33 55` is the visible studio telephone.
- `src/app/[locale]/book/page.tsx:8`: booking destination is `https://cal.com/syntaxstudio`.
- `src/app/[locale]/book/page.tsx:92`: direct booking-page email is `gunder@syntaxstudio.no`.
- `src/app/[locale]/layout.tsx:48`: organisation schema uses Gunder’s contact details and names only Gunder as founder.
- `src/components/footer.tsx:59`: TikTok `https://www.tiktok.com/@syntaxstudio.no`, Instagram `https://www.instagram.com/syntaxstudio.no/`, LinkedIn `https://www.linkedin.com/company/syntax-studio-no/`.
- `src/lib/blog-data.ts:47`: the site states Syntax Studio AS was registered 15 April 2026; `:59` states the original sole proprietorship started in May 2025. These are source-authored claims, not a business-register verification. Avoid expanding into legal/company information not supplied.

No practice-specific live domain or email address is verified in the active source. Do not make up ISO400/35mm destinations. Supplied Nyfane files establish an identity asset source, not a public website URL.

## 3. Project/content inventory

### Anonymised burger campaign — ready for an image and film case

Sources: `src/lib/case-studies.ts:2`, `src/messages/en.json` → `About.WorkIntro.projects.burger`, `src/app/[locale]/work/burger/page.tsx`.

- Public title can describe a burger campaign; client remains “Anonymised burger brand”.
- Established scope: film, product photography and graphic campaign material for a Norwegian burger brand.
- Existing case says Syntax was an external production partner, with visuals used across social media, print and digital surfaces. Preserve that distinction; do not claim ownership of the client’s identity or business.
- Existing creative description: raw kitchen energy, high heat, textures, product close-ups and punchy pacing.
- Proposed practice taxonomy: ISO400 + 35mm, with Syntax as historic creator/production credit. This is a new capability classification, not proof those practice names appeared on the original job.
- The case mentions 400,000+ content views in April 2026, said to come from platform analytics. No supporting analytics export exists in the audited tree. Keep this out of the new hero and do not strengthen into causal sales/revenue claims.
- Project year and named individual credits are not separately established. April 2026 is an outcome period, not necessarily the full production date. It is safer to omit year than invent one.
- Anonymisation is a deliberate active change: `next.config.ts:52` redirects the former `/work/jonk` route to `/work/burger`, and git status shows the identifying source assets removed or archived. Do not recover them from history for publication.

Available publishable media, verified on disk:

| Public path | Bytes | Use |
| --- | ---: | --- |
| `/burger/hero-build.mp4` | 6,798,241 | Hero/build sequence, ideally loaded only after user intent or when in view |
| `/burger/hero-build-poster.webp` | 27,124 | Lightweight film poster |
| `/burger/kitchen-film.mp4` | 5,960,529 | Kitchen film |
| `/burger/kitchen-film-poster.webp` | 24,682 | Kitchen film poster |
| `/burger/fries-loaded.mp4` | 1,246,847 | Detail clip |
| `/burger/fries-loaded-poster.webp` | 56,222 | Detail poster |
| `/burger/fries-fryer.mp4` | 1,781,154 | Fryer detail clip |
| `/burger/fries-fryer-poster.webp` | 9,532 | Fryer poster |
| `/webmat/burger-vertical.mp4` | 1,578,626 | Vertical campaign film |
| `/webmat/burger-vertical-poster.webp` | 23,300 | Vertical poster |
| `/webmat/burgercrop.webp` | 236,436 | Existing campaign thumbnail/product crop |
| `/burger/p1_5.webp` | 553,746 | Finished graphic/photo asset |
| `/burger/p3_1.webp` | 563,838 | Finished graphic/photo asset |
| `/burger/chicken-fries.webp` | 595,328 | Finished graphic/photo asset |
| `/burger/prophoto_vertical.webp` | 153,836 | Portrait product photo |
| `/burger/kitchen-still.webp` | 66,286 | Kitchen still |
| `/webmat/p1_5.webp` | 181,412 | Smaller existing crop |
| `/webmat/p3_1.webp` | 188,908 | Smaller existing crop |
| `/webmat/prophoto_sq.webp` | 108,242 | Square product crop |
| `/webmat/kitchen_sq.webp` | 39,134 | Square kitchen crop |
| `/webmat/kitchen2_sq.webp` | 44,838 | Alternative square kitchen crop |

The filenames alone should not be used as image alt text. Visually inspect each asset during art direction and write concise descriptions of the actual visible content. Do not crop baked typography blindly, and do not substitute one client’s media into another case.

### Snatched — real scope, incomplete visual case

Sources: `src/lib/case-studies.ts:10`, `src/messages/en.json` → `About.WorkIntro.projects.snatched`, `src/app/[locale]/work/snatched/page.tsx:189`.

- Client name is explicitly Snatched; available brand asset is `/logos/Snatched.svg`.
- Existing scope: investor pitch video; concept and scripting; 3D warehouse, pallets and packages; animated infographics/motion graphics; colour grading and sound design.
- Concrete creative idea: make sales volume visible through warehouse imagery rather than abstract numbers.
- Proposed practice taxonomy: 35mm; Syntax remains historical creator. Do not infer ISO400 work from the fact a client logo is present.
- The source comment explicitly says the real pitch video is not supplied and the video section is removed until it is. No Snatched film/image file or remote media URL appears in active `src` or `public`.
- The quote field is `[Quote from Snatched coming]`; the component correctly suppresses bracket-prefixed placeholder quotes. Do not publish it.
- Existing sales/revenue/follower/Trustpilot numbers are client statistics, not results created by Syntax. They are unverified here and time-sensitive. Omit unless separately evidenced.
- No investment outcome is established. Current copy says the investment round is ongoing and that results are awaited; do not claim funds raised or conversion uplift.
- `/showcase/bigpic.webp` is referenced as structured-data image but deleted from the working tree. Use the actual Snatched logo or omit unsupported imagery until media is supplied.

### Syntax × Tokyo — self-produced editorial project, missing all media

Sources: `src/messages/en.json` → `About.WorkIntro.projects.tokyo`, `src/app/[locale]/work/tokyo/page.tsx:17` and every `<MediaWell>` invocation.

- Source describes a self-produced Tokyo film/photo trip and “Chapter 01”. No named commercial client is established.
- “International assignment” wording is ambiguous beside “self-produced”; prefer “Tokyo / self-initiated” or equivalent to avoid implying a commissioned client job.
- All hero, reel, film and still media blocks are placeholders. There is no `public/tokyo` media directory in the current tree.
- Existing structured-data image `/showcase/bigpic.webp` is deleted and unrelated.
- Proposed future taxonomy: ISO400 + 35mm. Do not present nonexistent stills or stock Tokyo footage as delivered Syntax work.
- The source quote about already booking the next ticket is copy, not verified travel evidence; omit if it adds no necessary meaning.

### Other real files and historic content

- `public/riseup/` contains `riseupbefore.png`, `riseup-logo.jpg`, `riseup-logo-sq.jpg`; `public/logos/riseuplogo.svg` exists. `src/lib/case-studies.ts:53` contains a RiseUp testimonial attributed to Rahma Mohamed, “Styreleder, RiseUp AS”. There is no active detailed project case tying these files to a current deliverable. Do not fabricate a digital case around isolated assets.
- `src/lib/case-studies.ts:47` contains a Bites testimonial attributed to Abdulrahman Al Tamimi, “Daglig Leder, Bites”, concerning web development. Approval and exact quotation provenance are not stored in the repository. Existing publication is not independent proof; editorial prominence should wait for evidence.
- `public/logos/` includes FCR, Hammerblad, Renoveras and other logos. Presence of a file does not establish a publishable client relationship, scope, results or permission. FCR’s active case has deliberately been removed.
- `src/lib/blog-data.ts:90` contains an anonymised Østbanehallen event-production entry with `/blogg/Øhallen.webp`. Source describes 11–18 April 2026, but publication/updated timestamps are 10 April 2026 while the text is retrospective. Reconcile dates before using as a case or recent news.
- `public/wb1.png` exists without an active source usage establishing project/client attribution. Inspect as an asset, not as a factual case claim.

## 4. Active technical stack and content architecture

Source: `package.json`, `next.config.ts`, `src/i18n/*`, `src/app`.

- Next.js 15.3.8 App Router with TypeScript; React/React DOM declared as `^18.3.1`.
- Tailwind CSS 3.4, Radix primitives and shadcn-style UI components; Framer Motion 12 is already present.
- `next-intl` 4.3.4 provides Norwegian/English. `src/i18n/routing.ts` sets `no` default and `localePrefix: 'as-needed'`: canonical Norwegian URLs omit `/no`; English uses `/en`.
- Content is source-controlled TypeScript and JSON, not an active CMS. Work metadata is repeated across `case-studies.ts`, `project-showcase-2.tsx`, translations and case pages.
- Service and editorial content is structured in `services-data.ts`, `guides-data.ts` and `blog-data.ts`. This existing pattern supports a shared typed project record without introducing a CMS migration.
- No active Firebase SDK calls or Genkit proposal flow were found in root `src`. Packages and old scripts remain from the starter. The nested old project contains a Genkit proposal flow, but it is not the current root implementation.
- `apphosting.yaml` is a Firebase App Hosting descriptor with `maxInstances: 1`; Vercel analytics components and a Vercel Blob remote image allow-list also exist. These files alone do not prove which host serves production. Preserve the Next server deployment model; form actions need a server runtime.
- Remote image allow-list permits `iz6e2iomhf0u9x5o.public.blob.vercel-storage.com`. No actual project media URL using that host was found in active source, the nested starter source, or `_archive` text files.
- All static media paths get one-year immutable caching in `next.config.ts`. New versions should use new filenames, or asset changes may remain stale at clients/CDNs.

Recommended shared work model: `id`, `slug`, bilingual `title/summary/body`, `client`, optional known `year/location`, `practices[]`, `disciplines[]`, media records with `src/poster/width/height/alt`, flexible media/text blocks, explicit `credits`, optional evidenced `results`, related project ids, SEO overrides and publication status. Separate `client-work` from `self-initiated`; separate `published` from `awaiting-media`. Preserve original Syntax authorship when using new practice categories.

## 5. Contact form and operational dependencies

Sources: `src/actions.tsx`, `src/lib/schemas.ts`, `src/components/proposal-section.tsx`.

The contact form is a real server action, `handleContactInquiry`, using Nodemailer at `smtp.zoho.eu:465` with TLS. Required configuration is `ZOHO_EMAIL` and `ZOHO_APP_PASSWORD`; `SALES_INBOX` overrides recipient and `MAIL_FROM_NAME` overrides sender display name. No secrets were read or printed during this audit.

Current fields are `name`, `email`, `message` plus hidden `locale`. Server validation requires 2-character name, valid email and 3-character message. Errors and success responses exist in both languages. The form uses a real send action; preserve delivery behavior instead of replacing it with a fake success screen.

Identified implementation risks:

1. `src/actions.tsx` interpolates unescaped user name/email/message into HTML. Escape HTML before composing email; a plain-text alternative also improves reliability.
2. The validation schema has no maximum lengths and there is no honeypot or other abuse constraint visible. Bound input and include a low-friction server-side trap; do not invent success states when sending fails.
3. Frontend form validation errors use Norwegian schema messages for both locales. A new form should preserve server feedback and use clear field-linked errors in the active language.
4. The UI imports `useActionState` from React while the package declares React 18. Audit the actually installed/runtime versions and ensure the form pattern is supported before release.
5. Success should only be shown after actual delivery; server error states should also display a direct email fallback. End-to-end delivery is not verified by this audit and must not be claimed without a real authorised submission.

## 6. SEO, routes and migration

Existing route families:

| Route | Existing availability | Recommended action |
| --- | --- | --- |
| `/`, `/en` | Home | Rebuild at existing URLs |
| `/about-us`, `/en/about-us` | Studio/team | Permanent redirect to `/studio`, `/en/studio` after those exist |
| `/book`, `/en/book` | Contact/booking | Permanent redirect to `/contact`, `/en/contact`; preserve external booking link there |
| `/services`, `/en/services` | Services + work carousel | Redirect to useful practice overview if fully replacing; ensure old work discovery can reach `/work` |
| `/services/photo` and English counterpart | Photo service | Retain and rewrite or redirect to new ISO400 anchor/page |
| `/services/video` and English counterpart | Film service | Retain and rewrite or redirect to new 35mm anchor/page |
| `/services/web` and English counterpart | Web service | Retain and rewrite or redirect to new Nyfane anchor/page |
| `/services/marketing`, `/services/social-media` and English counterparts | Marketing services | Retire positioning carefully; relevant destination is collaboration/practices, not an invented equivalent specialist offer |
| `/work/burger`, `/work/snatched`, `/work/tokyo` and English counterparts | Existing case URLs | Keep stable while content/design changes; media-incomplete projects should be represented honestly |
| `/blog` and 10 `/blog/[slug]` routes | Norwegian only | Keep as archive outside primary nav where useful |
| `/guides/hva-koster-nettside-norge` and English counterpart | Website cost guide | Retain route and update only relevant internal links/brand context |

Existing blog slugs, verified in `src/lib/blog-data.ts`: `syntax-studio-as-stiftet`, `eventproduksjon-ostbanehallen`, `velkommen-til-bloggen`, `seo-grunnleggende-2026`, `naar-trenger-du-ny-nettside`, `produktfoto-som-selger`, `vipps-eller-stripe`, `tiktok-for-norske-bedrifter`, `syntax-studio-stiftet`, `hva-koster-en-reklamefilm`.

Existing permanent redirects in `next.config.ts`:

- `/pricing` → `/services`; English counterpart also exists.
- `/blog/ostbanehallen-westerlin-bjorndalen` → `/blog/eventproduksjon-ostbanehallen`.
- `/work/fcr` → `/services`; English counterpart exists.
- `/work/jonk` → `/work/burger`; English counterpart exists.
- `/blog/samarbeid-med-jonk` → `/blog`; English counterpart currently goes to `/en/blog`, which returns 404 because the blog is Norwegian-only.
- `/no` → `/`; `/no/:path*` → `/:path*`.

Migration rules:

1. Add redirects only after targets exist. Point old URLs directly at the final destination to avoid `/pricing` → `/services` → `/practices` chains.
2. Preserve all historical anonymisation redirects, especially the former burger route. Do not restore identifying source material in page metadata, filenames, Open Graph images or alt text.
3. Redirect `/en/blog/samarbeid-med-jonk` to an existing destination; never retain a redirect that terminates at the intentionally unsupported `/en/blog`.
4. Keep default-locale behaviour and locale switching consistent on every new route. Only emit alternate-language URLs for pages that truly exist.
5. Build sitemap routes from shared data, include new `/work`, `/studio`, `/contact` and any practice index, and exclude redirects and unpublished records.
6. Existing sitemap assigns `new Date()` to every URL each generation. Prefer actual modified dates where known; omit unknown dates rather than suggesting every archived article changed now.
7. `buildWorkJsonLd` sets the default publication date to `2025-01-01` for every project. This is an arbitrary fallback, not project evidence. Omit unknown dates and use accurate metadata only.
8. Breadcrumb schema currently puts work under `/services`; update the parent to `/work` when the work index exists.
9. Update visible copy, locale metadata, organisation descriptions, social image generation and `public/llms.txt` together. Current SEO still says marketing agency / one partner / the whole job, which conflicts with the brief.
10. Inspect the final HTML for one meaningful H1, canonical and language alternatives, valid schema, reachable images, and a useful 404. Retain semantic native links so expressive transitions are progressive enhancements.

## 7. Performance, accessibility and tracking findings

These findings come from code inspection and file sizes; no field Core Web Vitals measurements are claimed.

- The old homepage autoplays and fully preloads the 6.8 MB hero MP4, immediately below which multiple other videos may load. Use a lightweight responsive poster as initial LCP, then defer motion until appropriate. Constrain simultaneous playing surfaces, pause offscreen media and respect reduced motion/data-saving intent.
- `VideoCard` supports mobile viewport play and desktop hover play but has no keyboard play/pause control, no meaningful video label, and no reduced-motion handling. Hover must not be the only way to use case media. Narrative films should expose controls; decorative loops need an accessible pause path and a static fallback.
- `VideoCard` does not visibly handle media-error termination of its skeleton. Provide a poster fallback when a source fails.
- The unused/legacy `PreloaderProvider` can gate content for up to 30 seconds with synthetic progress. Do not reintroduce it into the new experience; it conflicts with the brief’s immediate work and usability requirements.
- Existing portrait JPG source files range from about 5.8 MB to 15.9 MB; delivered WebP portraits range from 157 KB to 266 KB. Use the optimised versions or responsive derivatives, not the originals as page assets.
- `src/components/team-presence-grid.tsx` polls `/api/presence-proxy` every 30 seconds. The API requires `PRESENCE_API_ORIGIN` and `PRESENCE_API_KEY`; absent configuration returns 500. It can be removed from the new studio experience without replacing the site’s actual contact methods.
- Layout loads Google Ads script id `AW-17330083087`, Iubenda autoblocking id `4151649`, and Vercel Analytics/Speed Insights. The inline Google/Iubenda configuration bodies are literally placeholder comments. Preserve verified hooks deliberately, but do not claim analytics/consent is operational from package presence alone.
- Global Google fonts currently use `next/font` with display swap; changing fonts should keep explicit loading strategy, limited weights and robust fallbacks.
- Lint tooling needs attention: `package.json` runs `next lint` with Next 15.3.8 while `eslint-config-next` is 16.1.6 and ESLint is 9. Run the actual lint path before claiming checks passed; align supported config instead of ignoring failures.
- A tracked artifact under `public/burger/.next/trace` is visible in git status. Generated runtime traces do not belong in publicly served media directories. The dirty baseline must be preserved; assess and remove generated publishing artifacts only as a deliberate implementation change.

## 8. Publication readiness boundaries

**Update, 7 September 2026:** the subsequent ecosystem audit and In relation implementation added an ISO400 portfolio selection (`/work/iso400-street-portraits`) with two real photographs, and an explicitly self-initiated Nyfane website study in development (`/work/nyfane-website-study`) with a real local browser capture. Their source paths, optimized derivatives and attribution limits are recorded in `asset-provenance.md`. Neither is presented as a newly evidenced commercial client commission. The earlier inventory below remains the initial audit baseline; the absence of any Nyfane work in that inventory no longer describes the current study list. An externally commissioned Nyfane case, actual Snatched film/still/captions, and the other unsupported facts listed below remain publication gaps.

Ready without inventing facts: a coherent three-practice brand story; real founders and user-confirmed leadership (Gunder/ISO400, Khamzat/35mm, Rasul/Nyfane); verified studio contact paths; anonymised burger campaign with real photo/film; honest Snatched text and logo; typed multi-practice case model; bilingual core navigation and pages.

Still requires supplied evidence for a richer launch: publishable Snatched film/posters, Tokyo photography/films, a complete Nyfane digital case, project years and named contributor credits, approved testimonials, any claimed awards, independently supported commercial outcomes, and verified live specialist domains.

These gaps do not prevent a working and visually coherent redesign. They do limit claims of a fully evidenced portfolio across all three practices. Keep absent material isolated in content data and documentation; never fill it with invented projects, unrelated client footage or unlabelled stock imagery.
