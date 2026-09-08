# Rebrand technical verification

The final local production artifact passed **454/454 HTTP checks, with zero failures**, at 21:55 UTC on 6 September 2026 (23:55 in Oslo). The website has not been deployed by this work. These results describe the checked local production artifact and reported interface checks; they are not a field performance or real-device certification.

## Build and static checks

The main implementation agent reported successful lint, TypeScript and final production build checks, including all 35 generated pages. `git diff --check` also passed after the trailing blank-line cleanup. The final checked artifact includes the language-link contrast change, native structured-data script tags, complete studio/contact social image metadata and removal of the broken legacy Google Ads/Iubenda scripts.

## Repeatable HTTP verification

`scripts/verify-rebrand.mjs` uses Node native fetch against a running production server. It performs read-only requests and needs no browser automation or additional dependencies. Full results are saved in `docs/rebrand/http-verification.json`.

```powershell
node scripts/verify-rebrand.mjs --base-url http://localhost:3016 --report docs/rebrand/http-verification.json
```

| Area | Final result |
| --- | --- |
| Core Norwegian and English pages | 12/12 returned HTTP 200, one H1 and one main landmark with the skip-link target. |
| Canonical, languages and social metadata | Self canonicals, no/en/x-default alternates, language attributes, titles, descriptions, social titles/descriptions/URLs/images and large Twitter cards passed. |
| Structured data | Shared Organization and ProfessionalService objects appeared and parsed in the initial HTML. Project CreativeWork and BreadcrumbList objects also parsed successfully. |
| Initial media markup | All 12 pages had no video/source elements or video preloads before a play action. Initial image tags had alt attributes. |
| Assets | 60/60 unique checked resources returned HTTP 200 with a non-HTML content type, including images, emitted optimized image URLs, scripts/styles, generated Open Graph images and both burger MP4 files. |
| Core internal links | 27/27 distinct local destinations resolved to HTTP 200. |
| Sitemap | HTTP 200 XML; all 35 listed URLs returned HTTP 200. Core routes included; Tokyo, obsolete top-level pages and English blog routes excluded. |
| Robots | HTTP 200; production sitemap declared; general crawler rule excludes `/api/`. |
| Legacy routes | 20/20 scenarios returned permanent redirects to the expected destinations, and all final destinations returned HTTP 200. |
| Missing and held content | Unknown Norwegian and English routes returned HTTP 404. Tokyo in both languages returned its holding page with noindex metadata. |
| Removed integrations | The old Google Ads/Iubenda script references were absent from all 12 core initial responses. |

The redirect scenarios cover `about-us → studio`, `book/pricing → contact`, `services → work`, FCR removal, anonymized burger URLs, English blog redirects, renamed/removed articles, explicit `/no` prefixes and query-string preservation. Both locale variants are included where applicable.

The first run identified shared structured data deferred through `next/script` and missing studio/contact Open Graph images. Those issues were corrected, the production artifact was rebuilt, and the same checks passed. The script requires actual initial script elements and parses JSON-LD as JSON; serialized hydration props alone do not satisfy that check.

The HTTP script cannot establish hydrated behavior, screen-reader experience, visual layout, video playback quality, real mail delivery or Core Web Vitals. Asset responses are availability checks, not a transfer-size budget. It does not request third-party sites.

## Interface checks reported by the main implementation agent

Following the user's instruction to avoid Playwright, the main agent used in-app browser accessibility snapshots and screenshots for visual and interaction review. This HTTP verification agent used no browser or Playwright tools.

- Reviewed the homepage, work index, studio, contact and both case-study templates at desktop and mobile sizes.
- Checked the homepage at widths 375, 430, 768, 1024 and 2560 pixels, plus an 844 × 390 landscape viewport.
- Verified language switching, mobile navigation, Escape dismissal and focus return.
- Verified practice selection and composition changes, work filters and the honest empty state for Nyfane.
- Verified the contact practice selection supplied by the query string and native required-field validation without sending a message.
- Verified deliberate film playback, focus moving to native video controls and pausing with Space.

The main agent reported no further visual fixes after that pass. These were desktop browser viewport checks, not physical iOS/Android device testing. The independent finish review in `docs/rebrand/finish-review.md` reported no material design or UX blockers.

The final production homepage and contact page produced no new application error entries during the main agent's console review. Vercel Analytics and Speed Insights reported that their `/_vercel/` scripts could not load on the plain local Next server. Those platform-specific integrations require an enabled Vercel deployment; their local warnings are retained as a runtime limitation. The earlier Iubenda runtime error and development `useFormState` deprecation were not observed in this final production check. This is not a claim that every route and interaction has an empty console under all conditions.

## Contact form

The contact implementation agent previously reported successful tests with a mocked SMTP transport. No real email was sent. The production HTTP script deliberately never submits the form. Real Zoho credentials, mailbox acceptance and receipt at the intended recipient require a separately authorized delivery check.

The source validates localized form data, rejects a populated honeypot, escapes user content in email HTML, keeps the authenticated mailbox as sender, uses the visitor as Reply-To and returns visible success or failure states. The optional practice affects the inquiry label; it does not silently change the recipient. Mail variables and defaults are documented in the repository README and `.env.example`.

## Operations and remaining inputs

- Confirm HTTPS domains for ISO400, 35mm and Nyfane before setting their public URL variables. Until then, links resolve to the internal contact page with the corresponding practice selected.
- Supply the approved final 35mm logo, Snatched film or stills, and Tokyo media/story before replacing the current factual fallbacks. Historical project credits remain Syntax Studio; discipline tags are not new production credits.
- Vercel Analytics and Speed Insights remain in the layout. Field measurements are not available from this local verification.
- Legacy Google Ads/Iubenda scripts were removed after a runtime error was observed. A verified account and consent setup is needed before reintroduction.
- The typed content model can later feed or receive data from a shared CMS. No shared CMS service or editing UI has been implemented.
- No dependency versions were changed as part of this verification. React/Next compatibility was observed through the current build and the reported interaction checks; broader dependency migration was outside this change.
- No deployment, real email delivery test, physical-device check, throttled network benchmark or field Core Web Vitals claim is included in these results.
