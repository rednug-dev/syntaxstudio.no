## Disposition

**Ship within the reviewed primary-site design and UX scope.** Reviewed 6 September 2026. No rebuild or further aesthetic pass is required. The three concrete source findings below were fixed, and the invalid full-page evidence was replaced with clean viewport captures. No material visual blocker remains in the inspected states.

This is an authored, credible independent-studio identity with a clear commission journey. This verdict is a finish review, not an award claim, a full accessibility certification or a runtime-performance certification. Final build and deployment verification belong to the technical handoff.

## Direction fidelity and distinctive craft

Common Ground survives implementation. The opening makes image, film and technology simultaneous, unequal participants on one cobalt surface. Real work occupies substantial space in the first viewport; selecting a medium changes its share without removing the others. The three practices are visible together on mobile as well. That relationship gives the name and business model a concrete visual expression.

Archivo, cool paper, sharp media frames and generous separation form one consistent system across home, work, studio, contact and cases. The asymmetric campaign pair and the quieter Snatched entry establish a deliberate work rhythm. The three real portraits make the specialist model human. The large closing mark and direct invitation provide a confident ending. Mobile uses stacked reading and case media, compact practice controls and a direct contact route rather than simply reducing the desktop layout.

The supplied ISO400 and Nyfane marks retain their distinct character within the shared frame. The 35mm lettering is appropriately treated as typography because a dedicated logo was not supplied. The changing composition is a restrained demonstration of Nyfane's medium, not an invented client case. The available portfolio remains the main limit on depth: one visually rich campaign and one factual logo/text case cannot demonstrate every discipline equally. Adding fabricated media would weaken the result.

## UX/accessibility material findings

The independent manual source assessment found two accessibility defects and one explicit craft-contract violation. All three are resolved in the current source.

| Finding and evidence | Location | Resolution |
| --- | --- | --- |
| The full-surface film trigger's positive-offset focus outline was clipped by its `overflow:hidden` frame. Keyboard users could reach Play without seeing focus. | `src/components/house/film.tsx:19`; `src/app/house.css:71`, `:74`, `:143` | A specific 3px inset white focus outline and blue inner play indicator now remain inside the frame. Video activation also transfers focus to the native controls. Source confirmed. |
| Inactive language text used white at `.72` opacity on cobalt, approximately 4.423:1 at 10–11px. | `src/app/house.css:24` | Opacity is now `.8`, approximately 5.097:1, exceeding the craft floor's 4.5:1 requirement. Some first-view captures predate this small source correction. |
| The contact notice used a 3px colored left edge, contrary to the craft floor's explicit alert-edge rule. | `src/components/house/studio-contact.css:62` | Replaced with a regular 1px border. Source confirmed. |

The inspected captures show legible headings, loaded campaign imagery, loaded founder portraits, visible project metadata and coherent desktop/mobile contact fields. The case film/still pair is side by side on desktop and stacked on mobile; native playback controls remain visible. No content overlap or horizontal clipping was observed in these captures.

Source supplies semantic navigation, a skip link, button pressed states, filter-count announcements, meaningful image alternatives, field labels, associated errors, invalid-field/status focus handling and reduced-motion overrides. Film mounts only after deliberate activation. Main source color pairs calculate to approximately 7.08:1 for white/cobalt, 14.12:1 for ink/paper and 4.77:1 for cobalt/light-blue. These checks do not substitute for testing every rendered state.

The implementation owner separately reports successful in-app-browser checks of practice switching, composition changes, the technology empty state, practice enquiry preselection, empty-form focus, Escape menu closure, language routing and actual film playback/focus. Those are reported execution evidence; the finish reviewer did not operate the browser.

## Scope/limitations

- **Inspected evidence:** all twelve first-view desktop/mobile files for home, work, studio, contact, Burger and Snatched in `.impeccable/review/`; selected-work desktop; practices, people, form, footer and Burger media desktop/mobile; the 768px home and landscape home captures. The principal pairs were captured at nominal 1440×1000 and 390×844 viewports. Home/work/studio/contact evidence is English, cases are Norwegian, and supplementary founder/home evidence includes Norwegian.
- **Capture validity:** the initial full-page images had duplicated bands, incomplete loading and blank margins. They were rejected as evidence. All twelve were replaced with unstitched viewport images. The initially mistargeted mobile-founder image was also replaced and checked. Natural viewport crops are not missing-page defects.
- **Method:** independent creative/finish review plus a separate source-accessibility reviewer. No browser tools or Playwright were used by these reviewers. The implementation owner supplied in-app-browser evidence. The native Impeccable launcher had failed with “The system cannot execute the specified program.” Its deterministic scan was unavailable; source and craft review were the explicit fallback.
- **Limits:** no measured Core Web Vitals, throttled-device performance, animation frame rate, memory behavior, screen-reader matrix, all-locale/all-route state matrix or delivered-email verification is certified here. Legacy editorial/search destinations were outside this visual pass. The contact captures retain an old development error badge; the implementation owner traced it to broken third-party script placeholders and removed that block, which is confirmed in source. Final console and build checks remain technical evidence, not conclusions from a screenshot.
- **Content truth:** Burger uses actual supplied media and the existing Syntax production credit. Snatched uses its real logo and sourced narrative; Tokyo is excluded from selected work. Missing practice domains, a complete Nyfane client case, Snatched film assets, contributor/date evidence and video caption/transcript evidence are documented in `docs/rebrand/asset-provenance.md`. This review does not assert speech-caption or audio-description completeness.

## Required fix list

**No outstanding design or source-accessibility fixes from this bounded review. No further recapture is required for its stated scope.** Preserve the three resolved corrections above. Complete and record the final technical release checks separately, and keep the documented asset gaps explicit until real, approved material is available.
