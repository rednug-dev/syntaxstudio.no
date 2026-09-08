# Ecosystem audit — 7 September 2026

This audit precedes the new structural studies. The latest user brief supersedes the previous instruction to keep the Open House composition. It retains its identity, DM Sans direction, warm neutral, deep brown and pale blue. It authorizes a new structure, not a new family of brands.

## Evidence and scope

Read-only inventory of `C:/Users/rasul/isov2` and `C:/Users/rasul/nyfane2`, including both `AGENTS.md` files, source content, public/assets directories, logo implementation, typography, color tokens, layout, media behavior, motion helpers and project architecture. Both AGENTS files contain Next.js version-specific documentation guidance; neither contains a separate brand brief. No standalone ISO400 brand manual, PDF, font package or moving-image asset was found in that repository. Its operative design system lives in code. Nyfane has a current `DESIGN.md`, `.impeccable/design.json`, approved-plan and refinement documentation, plus historical A/B/D records and development hero studies. Historical variants are evidence of exploration, not current production authority.

Syntax sources include `src/lib/house-content.ts`, the current `src/app/house.css`, `docs/rebrand/asset-provenance.md`, `content-and-technical-audit.md`, `surface-brief.md`, and the public asset inventory. `DESIGN.md` records superseded Common Ground, so its cobalt/Archivo tokens are not today's surface palette.

Direct visual inspection: ISO400's street portrait 01, grillz print and Triaden facade; Syntax's existing asset contact sheet; actual Nyfane homepage in the in-app browser at `http://localhost:3000/`. The Nyfane opening was captured and cropped before service/work material to `docs/rebrand/nyfane-hero-source.png` (1666 × 734). No fictional client case is included. This is visual/source research, not a full browser certification of the specialist websites. No sibling repository was changed.

## 1. What ISO400 owns

**A photographic point of view expressed as physical image-making.** The large blackletter ISO400 mark, pale achromatic paper, near-black ink, restrained rust accent, serif editorial headings and compact monospaced photographic annotations form a recognizably tactile world. It can be rough, close and culturally expressive while still having precise composition.

- **Identity:** `src/assets/iso400logo.svg` is the logo master referenced by `src/components/logo.tsx`; the inline component preserves its paths. The Syntax supplied practice asset remains `public/brand/iso400.svg`. These files have different hashes; retain the already supplied Syntax asset rather than silently replacing it.
- **Type and palette:** Instrument Serif for display, Geist for reading, Geist Mono for specifications, loaded through `src/app/layout.tsx`; paper `#f4f4f4`, ink `#17171a`, surface `#fafafa`, rust `#a3502a`, muted `#5e5e63` in `src/app/globals.css`.
- **Composition:** the homepage places an oversized statement beside a print. The work wall uses different aspect ratios and spans, modest deterministic print tilts and captions outside the image. Architecture and street portraits explicitly disable tilt. Authored proportions matter more than a uniform gallery.
- **Image behavior:** the hero grillz print appears as photographic density developing over 900ms; prints settle on hover/focus, with reduced-motion alternatives. The grain, torn hero edge, print shadow, film rebate numbering, photographic specification strip and tactile mobile menu belong to ISO400. Syntax should not borrow this entire package.
- **Strongest observed craft:** street portrait 01 has an assured off-axis gaze, shallow architectural background, controlled grey/olive color and close facial detail. The facade image uses clear verticals, reflective planes and repeated green seating. The grillz artwork puts ISO400 lettering physically inside its subject and has abrasive high-contrast grain. These are different photographic voices that the layout allows to remain distinct.
- **Evidence limit:** `src/content/site.ts` sets `placeholders: true`; most client/year fields are null and business proof is empty. Even the grillz camera specifications, year and film-process story sit inside that placeholder-enabled content file. Do not convert them into newly asserted verified production facts.

**Keep uniquely ISO400:** blackletter dominance, Instrument Serif composition, physical print/photocopy texture, tilted print treatment and photographic metadata language. **Inherit conceptually:** attention to crop, stillness, clear subject hierarchy, image sequencing and respect for original colors.

## 2. What Nyfane owns

**Useful digital systems made understandable through an interface.** Current approved C is an open working surface, with broad plum, coral actions and pale paper tabs. It is commercially direct, organized around real user tasks and state changes. Its personality comes from a recognizable tab silhouette and its ability to show consequences, not from generic technology decoration.

- **Authority:** `DESIGN.md`, `components/design/variant-c.css`, `docs/final-refinement-report.md` and the current homepage. A/B/D palette/layout records are historical; development alternatives remain at `/dev/refinement`.
- **Identity/type:** supplied lowercase wordmark and lockup in `public/brand/`; current header splits coral `ny` and paper `fane`. Archivo is the reading/display family, IBM Plex Mono is reserved for technical annotations. `components/brand/paths.ts` and `Wordmark.tsx` preserve logo contours.
- **Palette:** paper `#f2eef3`, plum `#281a32`, coral `#ff765e`, visited lavender `#9b87aa`, sheet `#e7e0ea`. These are Nyfane brand colors, not colors to adopt across Syntax. The pale blue in Syntax's current system is already independent of Nyfane's current plum/coral world.
- **Layout:** centered shell capped at 1600px; fluid gutters, reserved side rails at wide widths, asymmetric text columns, large sentence-case type, flat layered sheets and clipped tab shoulders. Navigation tabs, coral contact action, service sheets and role surfaces make the tab metaphor systemic.
- **Interaction:** the latest homepage service-booking demonstration responds to visitor decisions: customer/operations roles share one booking, a missing reference exposes validation, approval changes state, rebooking updates the same record. Mobile shows one role at a time with shared appointment context. It proves interface reasoning, even though its scenario is illustrative.
- **Technical strengths worth inheriting:** content and presentation are separated; local reducer logic has no timer dependency; native radio/select controls, stable focus, explicit error relationships, reduced-motion paths and touch targets are accounted for. Named demo-content checks distinguish development material from launch eligibility. Font loading and media dimensions are explicit. The architecture is Next 16.3.4/React 19.2.8 in this repository; do not copy package choices into Syntax merely to match it.
- **Critical evidence limit:** `data/projects.ts` adapts `data/demo-projects.ts`; all listed project records are fictional development content and `publishedProjects` filters them out. The portfolio SVG plates under `public/images/work/` do not establish client work. `data/demo-workflow.ts` and `data/demo-service-models.ts` are also fictional. The sibling user's authorization for those examples does not authorize presenting them as Syntax commissions.

**Keep uniquely Nyfane:** browser/tab navigation, clipped shoulders, plum/coral contrast, product-workspace layout, system status, visited-project behavior and detailed operational demonstrations. **Inherit as standards:** clarity before animation, meaningful response, state integrity, accessible control behavior, fast loading, truthful content status and careful engineering.

**Usable honest technology proof now:** Nyfane's own implemented website, explicitly described as a studio website study in development. Use the saved hero capture as an artifact inside a Syntax composition; do not imitate its tabs as the Syntax shell. A parent-level interaction can demonstrate computational craft through how Syntax composes its real media, without inventing a digital client.

## 3. What 35mm should own

**Time, sequence, moving image and cinematic control.** No separate 35mm repository, brand manual or final logo was present in the supplied scope. Continue the restrained plain-type name; do not describe it as a supplied finished mark.

Existing anonymized burger campaign material establishes actual moving-image production. `public/burger/hero-build.mp4`, `kitchen-film.mp4`, `fries-fryer.mp4`, `fries-loaded.mp4` and `public/webmat/burger-vertical.mp4` have matching poster assets. These support cuts, assembly, detail, movement and portrait-format film. Historical credit remains Syntax Studio; today's practice labels express discipline relevance rather than fabricated individual historical authorship.

Snatched has an existing supported description of a pitch film, modeled warehouse, boxes/pallets and animated infographics, plus `public/logos/Snatched.svg`. It has no supplied finished film or approved still in the active portfolio inventory. Do not invent a CGI image, result, investor metric or additional film credit to compensate.

**Reserve for 35mm:** film scale, temporal rhythm, directing, editing, VFX, CGI, color and atmosphere. **Inherit conceptually:** contrast between pause and movement; continuity between states; cuts that change context. A cinematic Syntax experience should not become an autoplay film reel.

## 4. What Syntax should own

**The relationship between the media, visibly composed.** ISO400 owns the authored image; 35mm owns the sequence; Nyfane owns the useful response. None of those alone owns a single composition in which crop, time and interaction affect each other. That is the available parent territory.

The existing Syntax mark and humanist typography can organize this territory with repeated relationships: a common edge, a moving crop, a controlled overlap, a displaced caption, a transition from still to screening, or an explicit visitor choice that reorganizes the same real work. Recognition should come from that grammar recurring across home, work, cases and contact.

Keep the actual Syntax ground `#e9e7e2`, ink `#31291f`, timber `#382b23`, sky `#b5cddd` and dark blue `#24485b`, with DM Sans and the supplied Syntax logo. Warm neutral supplies space; timber supplies depth and cinematic contrast; sky can signal a temporary shared state. Do not permanently bind one color to one practice.

Shared DNA is considered composition, plain language, genuine specialist responsibility, precise typography and care for the medium. Syntax can inherit this discipline without taking ISO400's print theater or Nyfane's tab interface. Syntax is the author of the relationship, not a fourth service practice or a directory of subsidiaries.

## 5. Website implications

| Area | Consequence of the audit |
| --- | --- |
| Hero | Give the supplied Syntax identity a decisive scale and let actual work interrupt or frame it immediately. Establish the parent before rendering three practice marks. The street portrait can provide a quiet field; burger film/poster brings a separate moving layer; Nyfane's own site is explicitly a study. |
| Typography | Make DM Sans architectural through scale, line break and alignment. Use small useful credits against large Syntax type. Do not import ISO400 serif hierarchy or Nyfane's whole interface voice. |
| Work | Use actual aspect ratios, useful captions and authored order. Photography, film and interface captures need different scales and page blocks. Allow multi-practice metadata without rewriting original credits. |
| Practices | Reveal disciplines through their behavior, then name the practice and responsible founder. Use unequal proportions and sequential focus; keep all information available without interaction. |
| Motion | Change crop, overlap and composition with a reason. Begin with usable poster/type; defer film until play intent, pause offscreen, and use static final arrangements under reduced motion. Do not add generic word reveals or slow page-wide entrances. |
| Interaction | A visitor choice should change how real media relate. The altered arrangement must remain understandable through labels and selected state, with keyboard and touch equivalents. This is stronger parent proof than a decorative code diagram. |
| Structure | Syntax → early work → why media connect → specialist system → shared production → wider work → people → contact. Alternate close detail with broad breathing space. Avoid treating each item as a rectangular section. |
| Mobile | Begin with a deliberate close crop and visible Syntax identity. Overlap can become a controlled sequence; one active interactive view can retain the shared context. Keep labels, film controls, work links and founder relationships legible. Never require drag or hover. |
| Transitions | Reuse shared edges, media crops and caption positions to create continuity between page states. A change in tone can be a parent-level beat, rather than a permanent practice color code. |
| Navigation | Preserve direct Work, Practices, Studio and Contact access and bilingual paths. A quiet ecosystem line can identify the family; only link external practice sites when a verified URL exists. The localhost Nyfane instance is not evidence of a public domain launch. |

## Useful asset map and factual limits

Paths below are source locations; any shipped derivative needs a new optimized public filename and responsive dimensions. The first portrait source is about 30.9 MB and the second about 13.1 MB: never ship the original JPG payloads as hero assets.

| Source path | Useful treatment / truth |
| --- | --- |
| `C:/Users/rasul/isov2/src/assets/work/portraits/street-portraits/portrait-01.jpg` | 4672 × 7008; visually inspected olive/grey portrait, sunglasses, off-axis gaze. Source title is Street portraits; client/year unspecified. Caption as an ISO400 image study, with no invented subject identity or commission. |
| `C:/Users/rasul/isov2/src/assets/work/portraits/street-portraits/portrait-02.jpg` | Companion front-facing image in the source content; supports a two-image sequence. Client/year unspecified. |
| `C:/Users/rasul/isov2/src/assets/teeth2-print.png` | Visually inspected grain-heavy ISO400 grillz artwork, 1938 × 1461. Strongly practice-branded; use only if explicitly attributed within an ISO400 moment. Do not assert analog process/camera facts from placeholder content. |
| `C:/Users/rasul/isov2/src/assets/work/spaces/jonk-facades/` | Three actual facade photographs, but visible client branding would undo Syntax's deliberate burger anonymity. Audit context only; not recommended for this Syntax publication. |
| `C:/Users/rasul/isov2/src/assets/work/campaigns/wagyuyoussefiso.png` | Existing campaign artwork; source alt identifies WAGYOUSEF lettering. Also unsuitable for the anonymized Syntax campaign without a changed content instruction. |
| `docs/rebrand/nyfane-hero-source.png` | Actual in-app Nyfane opening capture. Label “Nyfane — website study / In development.” No fictional client UI, third-party project name or outcome appears. |
| `public/webmat/burgercrop.webp` | Actual wide burger photograph; current hero dimensions 2528 × 1271. Anonymous Norwegian burger brand; production Syntax Studio. |
| `public/burger/prophoto_vertical.webp` | Actual 1080 × 1620 assembly still; visually complements the build film. |
| `public/burger/hero-build.mp4` + `hero-build-poster.webp` | Actual portrait campaign film and poster; current model 720 × 1280. Source MP4 approximately 6.8 MB; load on intent. |
| `public/burger/kitchen-film.mp4` + `kitchen-film-poster.webp` | Actual portrait kitchen film and poster; current model 720 × 1280. Source MP4 approximately 6.0 MB; load on intent. |
| `public/burger/p1_5.webp`, `p3_1.webp`, `chicken-fries.webp` | Anonymized real campaign artwork; source model 4128 × 6192. Preserve baked artwork, optimize delivery. |
| `public/portraits/gunder.webp`, `khamzat-v2.webp`, `rasul.webp` | Existing verified founder identity mapping; blue backdrop is in the photographs, not a required house color assignment. |
| `public/logos/syntaxnylogoutenundertekst.svg`, `syntaxnylogo.svg`, `syntaxnyikon.svg` | Supplied new Syntax wordmark/full lockup/symbol. Keep contours and aspect ratios intact. |
| `public/logos/Snatched.svg` | Actual client identification only. Does not prove Syntax designed the logo. No film still is available. |

Trustworthy founder mapping, recorded in `house-content.ts` and the prior user-confirmation provenance: **Gunder Rollufson — ISO400 / Image & Design; Khamzat Dudaev — 35mm / Film & VFX; Rasul Uzdijev — Nyfane / Technology.** Use Co-founder and practice lead rather than old corporate titles. Individual photographer credits, founder credentials, project years, exact client results and launch dates remain absent unless independently established by the existing source.

The strongest currently evidenced multidisciplinary story is the anonymized burger production: still photography, film and finished campaign graphics sharing one idea. A Nyfane website study adds honest technology craft, but does not make that burger commission an all-practice project. The site itself can demonstrate all three behaviors without rewriting the history of the client work.
