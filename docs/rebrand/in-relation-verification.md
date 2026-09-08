# In relation — implementation and verification

7 September 2026. This report covers the continuation brief and the new **In relation** implementation. The earlier Common Ground and Open House reports are historical baselines, not verification of this surface. The site has not been deployed.

## Outcome and selection

The supplied Syntax mark, DM Sans, warm paper, deep brown, pale blue and parent-house positioning remain. The new structure makes photography, film and a digital study share one changeable composition. A native range and four presets alter their spatial relationship; open, unequal typographic practice rows explain the specialists. Larger campaign sequences, differently paced projects and direct founder portraits carry the idea through the rest of the site.

The user explicitly asked for a strongest-structure selection followed by implementation. A was selected under that instruction; there was no separate claim of user approval. The four studies use the same identity and real media. The comparison scores are design judgement, not research measurements.

| Brief phase | Delivered evidence |
| --- | --- |
| Ecosystem audit | [ISO400, Nyfane and Syntax audit](ecosystem-audit-2026-09.md), [technical baseline](technical-baseline-2026-09.md), [media provenance](asset-provenance.md) |
| Reference study | [13 current studio references](reference-study-2026-09.md), including the eight requested studios and five additional references; source links and observation limits recorded |
| Structural exploration and selection | [Four structures and comparison](structural-exploration-2026-09.md), [code-native first-screen studies](structures.html) |
| Design system | [Current surface brief](surface-brief.md), [DESIGN.md](../../DESIGN.md) |
| Core implementation | Home, work index, medium-sensitive project stories, studio, contact, navigation, practice interaction and responsive rules in both locales |
| Creative review | Independent reviewer cleared the corrected 375px opening: dominant whole mark, recognizable photo/film/website study, honest captions and reachable controls. No further creative changes requested in the bounded review. |
| CRO / UX | Clear house and practice mapping; work appears in the opening; direct contact in navigation, projects, founders and footer; practice context survives the enquiry path; filter and language state checked |
| SEO / engineering | Production build, lint/type checking, 586 HTTP assertions, content-model and contrast review; scope below |
| Mobile art direction | Independent spatial keyframes, crop and caption treatment, two-line work title, stacked contact form and unequal founder sequence; inspected in the in-app browser |

## Material corrections made during review

- The default mobile composition has its own Together keyframe so the website study is visible above the film. Caption credits and study status remain visible on phones. The desktop ISO400 credit sits beside its project title, clear of the overlapping film.
- The range announces Together for the default state. Presets have selected state, the native range supports keyboard input, and direct changes avoid transition lag. Reduced-motion CSS removes animation, transitions and smooth scrolling.
- Work filters update only the `practice` query parameter through locale-aware navigation. Controls remain mounted for focus, navigation retains scroll, and URL changes restore selection. Historical projects now explicitly label specialist tags as **Relevant practices / Faglig relevans**, separately from actual creator credits.
- Snatched's teaser uses valid block markup. Contact form state uses the App Router's current action hook when available, with compatibility for the project's declared React 18 API; the server action and validation remain in place.
- Contact field borders and slider tracks use `#8b8173` on paper: 3.098:1 contrast. Muted text is 5.271:1, normal ink 11.579:1 and blue focus color 7.893:1 on paper. These are computed sRGB ratios for those pairs, not blanket accessibility certification.
- Named crawler groups now retain the same `/api/` exclusion as the general robots group.

## Build and HTTP evidence

Production build uses `NEXT_DIST_DIR=.next-production`, separated from the existing development build. Typecheck, ESLint and Next production build pass. The build reports 39 generated static pages and **216 KB First Load JS for home, including 178 KB shared**. No animation engine or WebGL dependency was added for this structure.

The final [HTTP report](in-relation-http.json) records **586 passed, 0 failed** against `http://localhost:3018`:

- 16 localized core routes; 39 sitemap routes; 20 historical redirect cases.
- 33 internal links and 64 referenced assets.
- Canonical, no/en/x-default alternates, Open Graph/Twitter metadata, structured data and complete generated social-image bodies.
- Actual creator and studio-study status, expected anonymous project identity, 404/noindex handling, and initial media markup without automatically mounted videos.

These checks use native HTTP requests. They are distinct from browser interaction and visual checks, and never submit the contact form.

## Browser evidence

All Syntax visual QA used the in-app browser. No external Playwright session was used for this site. The browser's viewport override did not change the observed tab dimensions, so a local, noindex iframe harness supplied exact CSS viewports. The harness is bound to localhost and points to the production server. Every reflow measurement waits for the actual page heading and records the loaded URL and viewport; locale-cookie redirects are visible in the records rather than silently counted as Norwegian tests.

- [Production reflow measurements](qa/production-reflow.json): English home at 375, 390, 430, 768, 1024, 1440 and 2560px; 844 × 390 landscape; desktop work, studio, contact and four project stories; Norwegian studio, work and technology study at 375px. No document horizontal overflow or sampled heading/form-control overflow was observed. The native scrollbar accounts for the 20px difference between iframe viewport and content width.
- [Core phone measurements](qa/core-mobile-reflow.json) and [contact sheet](qa/mobile-core-contact-sheet.png) cover the opening and every project medium, studio and contact. Two entries initially followed the English locale cookie; separate Norwegian measurements and an explicit language-switch test cover those locales.
- [375px corrected opening](qa/home-375-final.png) verifies all three media and their visible caption labels. [Native desktop opening](qa/home-desktop-final.png) records the desktop composition. [Contact validation](qa/contact-validation-final-frame.png) shows the localized form and focused first invalid field.
- Preset selection changes the composition and selected state. Keyboard range input changes its value and accessible description. A native film is absent initially; explicit play loads it, gives it focus, plays successfully with controls, and Space pauses it. Playback uses `object-fit: contain`.
- Mobile menu opens with expanded state; Escape closes it and restores focus to its toggle. Practice selection collapses the previous detail and exposes the selected specialist, founder and contact path.
- Selecting Technology changes the work URL to `?practice=nyfane`, preserves focus on its button, keeps the observed scroll position at zero and returns one study. Switching to Norwegian preserves both the query and selected practice. Direct query loading restores the filter. Back/forward synchronization was reviewed in source; the browser shortcut did not navigate the embedded frame, so this is not claimed as a completed interactive history test.
- The Norwegian contact page retains `practice=35mm`. Clicking Send with required fields empty focuses Name through native validation; no email is sent. Input sizing, labels, focus outline and visible form layout were inspected. SMTP success and failure delivery paths were not exercised.

The early `home-desktop.png` full-page screenshot has stitching/repetition artifacts and is not used as layout evidence. The native viewport captures are authoritative. Numeric reflow checks are not substitutes for the visual review and are not physical-device tests.

## Performance and publication limits

Responsive WebP derivatives, reserved media geometry, Next Image and locally served DM Sans are used. The opening's composition is small React state plus CSS, with three media elements and no continuous render loop. Films load only after play. Existing Vercel Analytics/Speed Insights integrations remain; their platform scripts do not load on a plain local Next server.

This is a local implementation review, not measured field Core Web Vitals. No field LCP/INP/CLS, throttled Lighthouse score, physical-device session, cross-browser certification, real screen-reader session or sustained frame-rate benchmark is asserted. Reduced-motion behavior is established by source rules; OS preference emulation was unavailable in the in-app browser's exposed capabilities.

The project registry supports medium-specific stories, actual creators, practice relevance, public provenance, sourced results/quotes and related work. It is not a deployed CMS or cross-site synchronization service. ISO400 portraits are image studies without invented client/year; Nyfane is its own website study in development. Historic burger and Snatched work stays credited to Syntax Studio. Snatched's actual film and approved stills, caption/transcript files, final 35mm artwork and verified specialist domains remain absent. Caption needs must be checked against actual audio before publication; no caption compliance claim is made here.

Local preview: `http://localhost:3018/en` (English); use the visible language switch for Norwegian. Structural studies: `http://localhost:3017`. See [README](../../README.md) for repeatable run and verification commands. Existing unrelated staged/unstaged work and the nested older application were preserved; no commit, reset or deployment was made.
