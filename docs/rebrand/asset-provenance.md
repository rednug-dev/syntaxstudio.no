# Asset provenance and publication notes

Recorded 6 September 2026; updated 7 September 2026 for the In relation implementation, including the ISO400 image selection and Nyfane website study. This is a factual origin inventory. The repository does not contain photographer contracts, model releases or a complete named contributor list; those are not inferred from filenames. No stock photography, generated project imagery or invented client media was introduced for this rebrand.

## Supplied identity assets

| Shipping file | Supplied origin and verification | Use |
| --- | --- | --- |
| `public/brand/iso400.svg` | User-supplied `C:/Users/rasul/Downloads/svgviewer-output.svg`. SHA-256 comparison confirms an exact copy. | ISO400 practice mark in opening and practice compositions |
| `public/brand/nyfane-wordmark.svg` | User-supplied `C:/Users/rasul/nyfane2/public/brand/nyfane-wordmark.svg`. SHA-256 comparison confirms an exact copy. | Nyfane practice wordmark in opening and practice compositions |
| `public/brand/nyfane-lockup.svg` | User-supplied `C:/Users/rasul/nyfane2/public/brand/nyfane-lockup.svg`. The copied asset escapes the ampersand in its `aria-label` as `&amp;` for valid XML. All 24 path geometries match the original exactly. | Retained supplied lockup; the primary composition currently uses the wordmark |
| `public/logos/syntaxnylogoutenundertekst.svg` | Existing new Syntax identity asset in the user’s working tree before rebrand implementation. No external source or individual designer credit is recorded. | Header, architectural homepage identity and footer; supplied artwork is not redrawn |
| `public/logos/syntaxnylogo.svg` | Existing new Syntax identity asset in the user’s working tree. | Retained full logo variant |
| `public/logos/syntaxnyikon.svg` | Existing new Syntax symbol in the user’s working tree. | Brand symbol; also the source of the inline path in the social-image generator |
| `public/logos/Snatched.svg` | Existing Snatched logo in the active portfolio source before this task. Client attribution is established by the existing Snatched case. | Snatched work entry and case hero; not represented as a Syntax-designed identity |

The 35mm lettering in the new composition is a text treatment in the site’s typeface. A dedicated 35mm logo was not supplied, and the text treatment must not be described as an existing delivered logo asset.

## Photography, campaign artwork and film used in the rebuilt pages

All burger campaign assets below existed in the user’s curated, anonymised public working tree before this rebrand. The original case copy explicitly attributes the production to Syntax Studio. The rebrand reuses those actual assets and preserves their anonymised client treatment. Individual photography, direction, editing and design credits are not invented. Practice categories indicate the relevance of the disciplines under today’s model; the historical production credit remains Syntax Studio.

| Shipping path | Factual content/origin | Presentation / retained context |
| --- | --- | --- |
| `public/webmat/prophoto_sq.webp` | Existing square crop of the burger product photograph | Retained campaign crop; the new opening's primary photograph is the ISO400 street portrait |
| `public/webmat/burgercrop.webp` | Existing wide crop of a burger campaign photograph | Work entry, Burger case hero, work social metadata |
| `public/burger/kitchen-still.webp` | Existing square kitchen/product photograph | Retained campaign photograph |
| `public/burger/prophoto_vertical.webp` | Existing vertical photograph of a burger being assembled with spatulas and a gloved hand | Burger case, paired with campaign film |
| `public/burger/p1_5.webp` | Existing finished green lunch-offer artwork with burger, fries and drink | Home and Burger case; existing baked lettering remains part of the artwork |
| `public/burger/p3_1.webp` | Existing finished turquoise chicken-wings campaign artwork | Burger case |
| `public/burger/chicken-fries.webp` | Existing finished pale-yellow loaded-fries campaign artwork | Burger case |
| `public/burger/hero-build.mp4` | Existing final burger-build campaign film, 6,798,241 bytes at initial audit | Opening film and Burger case; loaded on user playback intent |
| `public/burger/hero-build-poster.webp` | Existing poster accompanying that film | Initial static frame before playback |
| `public/burger/kitchen-film.mp4` | Existing final kitchen film, 5,960,529 bytes at initial audit | 35mm practice view and Burger case; loaded on user playback intent |
| `public/burger/kitchen-film-poster.webp` | Existing poster accompanying that film | Initial static frame before playback |

The original client-identifying assets are retained outside `public` in `_archive/branded-source/`, which is ignored by git. They are not a source for republishing the client identity. Historical route aliases may retain their original slug solely to redirect existing links to `/work/burger`.

No audio transcript or caption file was supplied for the campaign films. Native playback controls and accessible playback labels are implemented; caption completeness is not claimed. Check any intelligible speech before publishing a film that requires dialogue captions.

## ISO400 street portraits — a portfolio selection

These are existing photographs from the supplied ISO400 repository, not new images generated for the Syntax layout. `C:/Users/rasul/isov2/src/content/site.ts` groups the two files under the title **Street portraits**, with client and year both `null`. The first image is the cover; the second is the companion portrait. The source files remain unchanged in the sibling repository.

| Shipping path | Exact source | Optimized asset |
| --- | --- | --- |
| `public/work/iso400/street-portrait-01.webp` | `C:/Users/rasul/isov2/src/assets/work/portraits/street-portraits/portrait-01.jpg` | 1600 × 2400, 356,024 bytes |
| `public/work/iso400/street-portrait-02.webp` | `C:/Users/rasul/isov2/src/assets/work/portraits/street-portraits/portrait-02.jpg` | 1600 × 2400, 156,204 bytes |

The first portrait shows an off-axis gaze against softly blurred architecture; the second offers a direct gaze. The source images were resized and encoded as WebP for delivery. Their colors and subjects remain the photographic material, while the website controls the presentation crop. The original JPGs are approximately 30.9 MB and 13.1 MB and are not shipped as page assets.

The implemented record at `/work/iso400-street-portraits` is `kind: "portfolio-selection"`, credited to ISO400 for photography and visibly labeled as an image study. No commercial client, project year, subject identity, project location, individual photographer, outcome or commission is inferred. The source repository's global `placeholders: true` and absent metadata are reasons to leave those facts absent, not to fill them from the image. This selection supplies actual ISO400 image craft without claiming a newly documented client engagement.

The branded facade photographs and campaign poster in the ISO400 repository are audit context only. They are not used to restore the deliberately anonymized burger client on Syntax.

## Nyfane's own website — a studio study in development

The image documents Nyfane's actual implemented homepage in `C:/Users/rasul/nyfane2`, with its approved C identity. It was captured on 7 September 2026 from the running `http://localhost:3000/` page through the Codex in-app browser. The captured hero is based on `components/sections/HomeC.tsx`, its CSS module and the shared header/brand implementation. It includes Nyfane's own wordmark, positioning, contact action and layered tab artwork, cropped before the service and project sections.

| File | Origin / transformation | Asset |
| --- | --- | --- |
| `docs/rebrand/nyfane-hero-source.png` | Actual local in-app browser capture, cropped to the visible homepage hero; retained audit source | 1666 × 734, 381,228 bytes |
| `public/work/nyfane/website-study.webp` | WebP derivative of that retained capture | 1666 × 734, 57,616 bytes |

The implemented `/work/nyfane-website-study` record is `kind: "studio-study"`, `status: "in-development"`, with Nyfane as the design/development practice. The visible content identifies the site as a self-initiated studio project in development. It establishes that this interface exists and shows its design; it does not establish an external customer commission, a production launch, a public specialist domain, commercial results or a finished client product.

Nyfane's `data/demo-projects.ts`, `data/demo-workflow.ts` and `data/demo-service-models.ts` contain fictional development records. No fictional client, testimonial, metric or case artwork was imported as Syntax client proof. The workflow referred to in the study text remains an illustrative feature of Nyfane's own site; it is not described as a delivered customer system. The captured opening contains no fictional client case UI.

## Project attribution in the shared content model

`src/lib/house-content.ts` distinguishes a commission, a portfolio selection and a studio study. The existing burger and Snatched commissions retain the original **Syntax Studio** production credit. Their practice values describe discipline relevance under the current ecosystem, not newly asserted historical individual authorship. The ISO400 image study and Nyfane website study have their own relevant practice credits and publication context. Adding them does not turn the burger campaign into an all-practice commission or claim that Nyfane historically built a digital campaign deliverable.

## Founder portraits

| Shipping path | Verified identity source | Origin limits |
| --- | --- | --- |
| `public/portraits/gunder.webp` | Existing `src/app/[locale]/about-us/page.tsx` identified the portrait as Gunder Rollufson | Existing optimised portrait; individual photographer is not recorded |
| `public/portraits/khamzat-v2.webp` | Existing team data identified the portrait as Khamzat Dudaev | Existing optimised portrait; individual photographer is not recorded |
| `public/portraits/rasul.webp` | Existing team data identified the portrait as Rasul Uzdijev | Existing optimised portrait; individual photographer is not recorded |

The user confirmed Gunder leads ISO400, Khamzat leads 35mm, and Rasul leads Nyfane during this session. These assignments come from that confirmation, not from portrait filenames or the old corporate job titles.

## Browser, schema and social identity assets

`public/favicon.ico`, `public/logos/syntax-icon-32.png`, `public/logos/syntax-icon-180.png`, `public/logos/syntax-icon-512.png` and `public/logos/syntax-studio-logo.png` were all present in the user’s working tree before the rebrand implementation. The existing icon files serve browser/application icons and organisation schema. The studio logo PNG is the Snatched social-image fallback while an approved film still is unavailable; it is studio identification, not a frame from the Snatched film.

`src/app/[locale]/opengraph-image.tsx` generates a social preview from code and the existing Syntax symbol path. It is a brand communication artifact, not a client-project image. `next/font` loads DM Sans for the current house identity; retained font setup for legacy content does not change the primary typography direction. These fonts are software font assets handled through the existing Next font pipeline, not photography or logo replacements.

## Retained public media outside the rebuilt primary portfolio

These files remain in `public` from the existing working tree. Being publicly addressable or present in a repository does not establish a new case study, scope, award or client credit. They are listed here so the delivered public inventory has no unexplained provenance gap.

| Group | Existing files | Known source/use |
| --- | --- | --- |
| Additional anonymised burger film | `burger/fries-fryer.mp4`, `burger/fries-fryer-poster.webp`, `burger/fries-loaded.mp4`, `burger/fries-loaded-poster.webp`, `webmat/burger-vertical.mp4`, `webmat/burger-vertical-poster.webp` | Same existing anonymised Syntax production library; not newly produced for the rebrand |
| Additional burger crops | `webmat/kitchen_sq.webp`, `webmat/kitchen2_sq.webp`, `webmat/p1_5.webp`, `webmat/p3_1.webp` | Existing crops of campaign photographs/artwork; retained as optional media |
| Event photography | `blogg/Øhallen.JPG`, `blogg/Øhallen.webp` | Existing Østbanehallen event post in `src/lib/blog-data.ts` attributes photo/video production to Syntax as part of an external client assignment; the WebP is used by that archive post |
| Original portrait files | `portraits/Gunder.jpg`, `portraits/Khamzat-f.jpg`, `portraits/Khamzat2.jpg`, `portraits/Khamzat3.jpg`, `portraits/Khamzat4.jpg`, `portraits/Rasul-2.jpg`, `portraits/Rasul-3.jpg`, `portraits/Rasul-4.jpg` | Existing source portraits; the new pages use the optimised WebP selections |
| RiseUp files | `riseup/riseupbefore.png`, `riseup/riseup-logo.jpg`, `riseup/riseup-logo-sq.jpg`, `logos/riseuplogo.svg` | Existing repository files and an old RiseUp testimonial; a complete current project scope is not established |
| Other stored marks | `logos/FCR.svg`, `logos/Hammerblad.svg`, `logos/renoveras.svg` | Existing repository assets. No new case or client logo wall is inferred. The FCR case was already deliberately removed |
| Technology marks | `logos/nextauthjslogo.webp`, `logos/nextjs.webp`, `logos/nodejslogo.webp`, `logos/postgresql.webp`, `logos/prismalogo.webp`, `logos/reactlogo.webp`, `logos/stripelogo.webp`, `logos/tailwindlogo.webp`, `logos/vercellogo.png` | Existing third-party technology logo files referenced by legacy source; original download URLs are not stored. These are not Syntax client logos |
| Unassigned raster files | `wb1.png`, `logos/image.png`, `logos/logo1.png` | Existing user workspace assets. Client, creator and intended current use are not established. Not used to manufacture a portfolio case |
| Starter SVG assets | `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `avatars/placeholder.svg` | Existing Next/starter and placeholder assets. Not presented as commissioned Syntax work |

The implementation/reference screenshots under `docs/rebrand/` document this task’s audit and design work. They are not client portfolio media. The specific exception is the documented `nyfane-hero-source.png` capture above, whose optimized derivative appears as Nyfane's own studio website study. External reference studios were researched for principles; their project images were not copied into this site.

## Publishing gaps

- **Snatched:** the actual approved pitch film, an approved still/poster and caption files are still missing. Supply them before adding a screening. Current work content uses the verified logo and a concise sourced narrative. No placeholder quote, invented investor result or unsupported client statistic is published in the new case.
- **Tokyo:** supply the real film, reels and stills. The new shared published-project list excludes it. A legacy route can retain an honest holding entry while its media is unavailable; do not replace missing images with unrelated photography or claim an unnamed commercial commission.
- **ISO400:** the two street portraits now provide an attributable practice portfolio selection. Client, year, subject identity, individual credits and commission context remain unestablished and are omitted. The image study must retain this status unless additional source evidence is supplied.
- **Nyfane:** the technology filter now includes the actual self-initiated website study in development. A complete externally commissioned digital case still requires verified client/project facts, scope, approved media and a working public URL where applicable. The new study is not a substitute for those facts and carries no customer-performance claim.
- **Credits and dates:** project year and named individual contributor credits remain optional until evidenced. Historical burger/Snatched production credit remains Syntax Studio; the new studies identify ISO400 and Nyfane as their respective practice creators. The capture date records the documentation event, not a claimed project-completion date.
- **Proof:** verified awards, approved exact testimonials and evidence for quantitative outcomes have not been supplied. They are not filled with invented values.
- **Domains:** no live specialist website URL was supplied or verified. Practice-specific enquiry paths remain functional on the Syntax site.

## Optional practice website configuration

The shared content module `src/lib/house-content.ts` reads these optional build-time public environment variables:

```dotenv
NEXT_PUBLIC_ISO400_URL=
NEXT_PUBLIC_35MM_URL=
NEXT_PUBLIC_NYFANE_URL=
```

Leave them unset until the actual destination is verified. The implementation accepts valid HTTPS URLs and treats missing, invalid or non-HTTPS values as `null`. These public values are not secrets. Rebuild/redeploy after changing them so Next.js includes the new values in the client bundle.

When a practice website is absent, its public action uses the existing locale-aware enquiry route:

- ISO400: `/contact?practice=iso400`
- 35mm: `/contact?practice=35mm`
- Nyfane: `/contact?practice=nyfane`

These links express a selected practice within the Syntax contact journey. They do not imply that a separate specialist website already exists.
